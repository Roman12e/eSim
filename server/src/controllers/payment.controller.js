import { stripe } from "../services/stripe.service.js";
import { supabase } from "../supabase.js";

export async function createPaymentSheet(req, res) {
    try {
        const { countryData, currency, userId, planId } = req.body;

        if (!countryData || !currency || !userId || !planId) {
            return res.status(400).json({ error: "Missing params" });
        }

        const customer = await stripe.customers.create();

        const ephemeralKey = await stripe.ephemeralKeys.create(
            { customer: customer.id },
            { apiVersion: "2023-10-16" }
        );

        const price = Math.round(countryData.price * 100);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: price,
            currency,
            customer: customer.id,
            automatic_payment_methods: { enabled: true },
            metadata: {
                user_id: userId,
                product_id: planId,
                product_name: countryData.name,
                volume_mb: countryData.volume,
                duration_days: countryData.duration,
                country: countryData.product_coverage?.country_name
            },
        });

        await supabase.from("payments").insert({
            user_id: userId,
            payment_intent_id: paymentIntent.id,
            amount: price,
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
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}