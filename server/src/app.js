import cors from "cors";
import express from "express";

import paymentRoutes from "./routes/payment.routes.js";
import productsRoutes from "./routes/products.routes.js";
import simRoutes from "./routes/sim.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", paymentRoutes);
app.use("/", productsRoutes);
app.use("/", simRoutes);
app.use("/", userRoutes);

export default app;