import { getProducts, getRegions } from "../services/bnesim.service.js";
import { filterPlans } from "../utils/filters.js";

export async function getProductsController(req, res) {
    try {
        const { country } = req.query;

        if (!country) {
            return res.status(400).json({ error: "country is required" });
        }

        const data = await getProducts(country);

        res.json(filterPlans(data.products));
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

export async function getRegionsController(req, res) {
    try {
        const data = await getRegions();
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

export async function getSimCardDetailController(req, res) {
    try {
        const { iccid } = req.body;

        if (!iccid) {
            return res.status(400).json({ error: "iccid is required" });
        }

        const data = await getSimCardDetail(iccid);
        res.json(data);
    } catch (err) {
        console.error({
            statusText: response.statusText,
            body: await response.text()
        });
        res.status(500).json({ error: err.message });
    }
};