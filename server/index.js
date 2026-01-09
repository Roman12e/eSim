import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import FormData from "form-data";
import fetch from "node-fetch";
import Stripe from "stripe";

import { supabase } from "./supabase.js";


dotenv.config();
console.log("Stripe key:", process.env.STRIPE_SECRET_KEY ? "OK" : "MISSING");

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
});

app.use(cors());
app.use(express.json());

app.post("/payment-sheet", async (req, res) => {
    try {
        const { countryData, currency, userId, planId } = req.body;

        const countryAmount = Math.round(countryData.price * 100);
        const amount = countryAmount + Math.round(countryAmount * 0.5);

        if (!countryData || !currency || !userId || !planId) {
            return res.status(400).json({ error: "Missing params" });
        }

        const customer = await stripe.customers.create();

        const ephemeralKey = await stripe.ephemeralKeys.create(
            { customer: customer.id },
            { apiVersion: "2023-10-16" }
        );

        console.log("Creating PaymentIntent with:", { amount, currency, userId, planId });
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency,
            customer: customer.id,
            automatic_payment_methods: { enabled: true },
            metadata: {
                user_id: userId,
                product_id: planId,
                product_name: countryData.name,
                volume_mb: countryData.volume,
                duration_days: countryData.duration,
                country: countryData.product_coverage.country_name
            },
        });

        await supabase.from("payments").insert({
            user_id: userId,
            payment_intent_id: paymentIntent.id,
            amount: amount,
            currency,
            status: "pending",
        });

        res.json({
            paymentIntentClientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
            customer: customer.id,
            ephemeralKey: ephemeralKey.secret,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


app.post("/confirm-payment", async (req, res) => {
    try {
        const { paymentIntentId, userId, planId } = req.body;

        if (!paymentIntentId || !userId) {
            return res.status(400).json({ error: "Missing params" });
        }

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status !== "succeeded") {
            throw new Error("Payment not completed");
        }


        // Получаем пользователя
        const { data: user, error } = await supabase
            .from("users")
            .select("sims, purchase_history")
            .eq("id", userId)
            .single();

        if (error || !user) {
            return res.status(404).json({ error: "User not found" });
        }

        const sims = Array.isArray(user.sims) ? user.sims : [];

        const purchase = Array.isArray(user.purchase_history?.payments)
            ? user.purchase_history.payments
            : [];

        // Защита от повторного вызова
        const existingSim = sims.find(
            s => s.payment_intent_id === paymentIntentId
        );

        if (existingSim) {
            return res.json({ success: true, esim: existingSim });
        }

        // Создаём eSIM в BNESIM
        const meta = paymentIntent.metadata;

        const formDataAdd = new FormData();
        formDataAdd.append("license_cli", process.env.LICENSE_CLI);
        formDataAdd.append("product_id", meta.product_id);

        const esimResponse = await fetch(
            "https://api.bnesim.com/v2.0/enterprise/simcard/add-esim",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
                    ...formDataAdd.getHeaders()
                },
                body: formDataAdd,
            }
        );

        const text = await esimResponse.text();

        console.log("BNESIM RAW RESPONSE:", text);

        let esimResult;
        try {
            esimResult = JSON.parse(text);
        } catch {
            throw new Error("BNESIM returned non-JSON response");
        }

        if (!esimResult.success) {
            throw new Error("BNESIM eSIM activation failed");
        } else if (!esimResult.activationTransaction) {
            throw new Error("BNESIM not found activation transaction")
        }

        let iccid = null;

        for (let i = 0; i < 10; i++) {
            await new Promise(r => setTimeout(r, 3000));

            const formActivate = new FormData();
            formActivate.append("activationTransaction", esimResult.activationTransaction);

            const response = await fetch(
                "https://api.bnesim.com/v2.0/enterprise/activation-transaction/get-status",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
                        ...formActivate.getHeaders(),
                    },
                    body: formActivate,
                }
            );

            const status = await response.json();
            console.log(status);

            if (status?.success && status.iccid) {
                iccid = status.iccid;
                break;
            }
        }

        if (!iccid) {
            throw new Error("eSIM activation timeout");
        }

        // Обновляем пользователя
        const newSim = {
            activation_transaction: esimResult.activationTransaction,
            license_cli: process.env.LICENSE_CLI,
            iccid,
            isInstall: false,
            product: {
                product_id: Number(meta.product_id),
                name: meta.product_name,
                volume_mb: Number(meta.volume_mb),
                duration_days: Number(meta.duration_days),
                country: meta.country
            },
            payment_intent_id: paymentIntentId,
            created_at: new Date().toISOString()
        };

        const updatedSims = [...sims, newSim];

        const updatedPayments = [
            ...purchase,
            {
                countryTitle: meta.country,
                payment_intent_id: paymentIntent.id,
                amount: paymentIntent.amount,
                currency: paymentIntent.currency,
                status: "paid",
                created_at: new Date().toISOString(),
            },
        ];

        if (!iccid || !esimResult.success) {
            console.log("Error", data);
        }

        await supabase
            .from("users")
            .update({
                sims: updatedSims,
                purchase_history: {
                    payments: updatedPayments,
                },
            })
            .eq("id", userId);

        // Ответ клиенту
        res.json({
            success: true,
            esim: newSim,
            iccid,
            license_cli: process.env.LICENSE_CLI,
            paymentIntent
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


app.get("/get-products", async (req, res) => {
    try {
        const country = req.query.country;

        if (!country) {
            return res.status(400).json({ error: "country is required" });
        }

        const form = new FormData();
        form.append("area", country);

        const response = await fetch(
            "https://api.bnesim.com/v2.0/enterprise/products/get-products",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
                    ...form.getHeaders(),
                },
                body: form
            }
        );

        if (!response.ok) {
            const text = await response.text();
            return res.status(response.status).send(text);
        }

        const data = await response.json();
        res.json(data);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


app.get("/get-regions", async (req, res) => {
    try {
        const response = await fetch(
            "https://api.bnesim.com/v2.0/enterprise/products/get-regions-countries",
            {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${process.env.BEARER_TOKEN}`
                }
            }
        );

        if (!response.ok) {
            const text = await response.text();
            return res.status(response.status).send(text);
        }

        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.post("/get-simcard-detail", async (req, res) => {
    try {
        const { iccid } = req.body;

        const form = new FormData();
        form.append("iccid", iccid);
        form.append("with_products", "0");

        const response = await fetch(
            "https://api.bnesim.com/v2.0/enterprise/simcard/get-detail",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
                    ...form.getHeaders(),
                },
                body: form,
            }
        );

        const data = await response.json();

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Stripe server running on http://localhost:${PORT}`);
});
