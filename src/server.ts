import express from "express";
import "dotenv/config"
import { fetchMeters, loginToPortal } from "./utils/portalApi.js";

const app = express()

app.use(express.json())
// app.use(authRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    await fetchMeters();

  } catch (error) {

    if(error instanceof Error){
        console.log(error.message);
    }
  }

});