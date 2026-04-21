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
        console.error({
            status: response.status,
            statusText: response.statusText,
            body: await response.text()
        });
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
        console.error({
            status: res.status,
            statusText: res.statusText,
            body: await res.text()
        });
        throw new Error(await res.text());
    }
    return res.json();
}

export async function getSimCardDetail(iccid) {
    const form = new FormData();
    form.append("iccid", iccid);
    form.append("with_products", "0");

    const response = await fetch(
        "https://api.bnesim.com/v2.0/enterprise/simcard/get-detail",
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${config.bearer}`,
                ...form.getHeaders(),
            },
            body: form,
        }
    );

    if (!response.ok) {
        console.error({
            status: response.status,
            statusText: response.statusText,
            body: await response.text()
        });
        throw new Error(await response.text());
    }

    return response.json();
}
