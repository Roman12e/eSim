import FormData from "form-data";
import fetch from "node-fetch";
import { config } from "../config/index.js";

export async function getProducts(country) {
    const form = new FormData();
    form.append("area", country);

    const response = await fetch(
        "https://api.bnesim.com/v2.0/enterprise/products/get-products",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${config.bearer}`,
                ...form.getHeaders(),
            },
            body: form
        }
    );

    if (!response.ok) {
        console.log(response);
        throw new Error(await response.text());
    }

    return response.json();
}

export async function getRegions() {
    const res = await fetch(
        "https://api.bnesim.com/v2.0/enterprise/products/get-regions-countries",
        {
            headers: {
                Authorization: `Bearer ${config.bearer}`,
            },
        }
    );

    if (!res.ok) {
        console.log(res);
        throw new Error(await res.text());
    }
    return res.json();
}