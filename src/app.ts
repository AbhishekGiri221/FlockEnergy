import express from "express";
import meterRoutes from "./router/meterRoutes.js";
import transformerRoutes from "./router/transformerRoutes.js";

const app = express();

app.use(express.json());

app.use(meterRoutes);
app.use(transformerRoutes);

export default app;