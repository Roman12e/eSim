import { stripe } from "../../stripe-server";


export async function POST(req) {
    const { amount } = await req.json();
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: "2023-10-16" }
    );

    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.floor(amount * 100),
        currency: "usd",
        customer: customer.id,
        automatic_payment_methods: {
            enabled: true,
        }
    });

    return Response.json({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
        publishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLICHABLE_KEY
    });
}