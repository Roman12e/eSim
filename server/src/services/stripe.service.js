import Stripe from "stripe";
import { config } from "../config/index.js";

export const stripe = new Stripe(config.stripeKey, {
    apiVersion: "2023-10-16",
});