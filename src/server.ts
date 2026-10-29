import express from "express";
import "dotenv/config"

const app = express()

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Flock Meter API is running",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.listen(PORT,()=>{
    console.log("listening to the port");
})
