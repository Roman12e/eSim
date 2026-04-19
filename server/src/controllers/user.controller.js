import fetch from "node-fetch";

export async function deleteAccount(req, res) {
    try {
        const { email, phone } = req.body;

        const response = await fetch(
            "https://mvjgxrbkpehxbktbwgjd.supabase.co/functions/v1/handler",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.SUPABASE_KEY}`,
                },
                body: JSON.stringify({ email, phone }),
            }
        );

        const data = await response.json();

        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}