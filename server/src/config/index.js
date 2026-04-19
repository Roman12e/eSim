import dotenv from "dotenv";
dotenv.config();

export const config = {
    port: process.env.PORT,
    stripeKey: process.env.STRIPE_SECRET_KEY,
    bearer: process.env.BEARER_TOKEN,
    license: process.env.LICENSE_CLI,
    supabaseKey: process.env.SUPABASE_KEY,
};