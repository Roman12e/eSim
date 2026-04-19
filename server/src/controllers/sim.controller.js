import FormData from "form-data";
import fetch from "node-fetch";
import { stripe } from "../services/stripe.service.js";
import { supabase } from "../supabase.js";

export async function confirmPayment(req, res) {
    const { paymentIntentId, userId } = req.body;

    if (!paymentIntentId || !userId) {
        return res.status(400).json({ error: "Missing params" });
    }

    let refundNeeded = false;

    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (!paymentIntent || paymentIntent.status !== "succeeded") {
            return res.status(400).json({ error: "Payment not completed" });
        }

        const { data: user, error: userError } = await supabase
            .from("users")
            .select("sims, purchase_history")
            .eq("id", userId)
            .maybeSingle();

        if (userError || !user) {
            refundNeeded = true;
            throw new Error("User not found");
        }

        const sims = Array.isArray(user.sims) ? user.sims : [];
        const paymentsArray = Array.isArray(user.purchase_history?.payments)
            ? user.purchase_history.payments
            : [];

        const existingSim = sims.find(
            s => s.payment_intent_id === paymentIntentId
        );

        if (existingSim) {
            return res.json({
                success: true,
                status: existingSim.status,
                esim: existingSim,
            });
        }

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
                    ...formDataAdd.getHeaders(),
                },
                body: formDataAdd,
            }
        );

        const esimResult = await esimResponse.json();
        console.log(esimResult);

        if (!esimResult.success || !esimResult.activationTransaction) {
            refundNeeded = true;
            throw new Error("BNESIM creation failed");
        }

        const activationTransaction = esimResult.activationTransaction;

        refundNeeded = false;

        let iccid = null;

        for (let i = 0; i < 5; i++) {
            await new Promise(r => setTimeout(r, 3000));

            const formActivate = new FormData();
            formActivate.append("activationTransaction", activationTransaction);

            const response = await fetch(
                "https://api.bnesim.com/v2.0/enterprise/activation-transaction/get-status",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
                        ...formActivate.getHeaders(),
                    },
                    body: formActivate,
                }
            );

            const status = await response.json();

            if (status?.success && status.iccid) {
                iccid = status.iccid;
                break;
            }
        }

        const newSim = {
            activation_transaction: activationTransaction,
            iccid: iccid || null,
            status: iccid ? "active" : "processing",
            isInstall: false,
            product: {
                product_id: Number(meta.product_id),
                name: meta.product_name,
                volume_mb: Number(meta.volume_mb),
                duration_days: Number(meta.duration_days),
                country: meta.country,
            },
            payment_intent_id: paymentIntentId,
            created_at: new Date().toISOString(),
        };

        const { error: updateError } = await supabase
            .from("users")
            .update({
                sims: [...sims, newSim],
                purchase_history: {
                    payments: [
                        ...paymentsArray,
                        {
                            countryTitle: meta.country,
                            payment_intent_id: paymentIntentId,
                            amount: paymentIntent.amount,
                            currency: paymentIntent.currency,
                            status: "paid",
                            created_at: new Date().toISOString(),
                        },
                    ],
                },
            })
            .eq("id", userId);

        if (updateError) {
            throw new Error("Database update failed");
        }

        return res.json({
            success: true,
            status: newSim.status,
            message: iccid
                ? "eSIM activated successfully."
                : "Your eSIM is being activated. It will appear shortly.",
            esim: newSim,
        });

    } catch (err) {
        console.error(err);

        if (refundNeeded) {
            try {
                await stripe.refunds.create({
                    payment_intent: paymentIntentId,
                });
                console.log("Refund completed");
            } catch (refundError) {
                console.error("Refund failed:", refundError);
            }
        }

        return res.status(500).json({
            error: "Activation failed. Payment refunded.",
        });
    }
}