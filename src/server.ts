import express from "express";
import "dotenv/config"
import meterRoutes from "./router/meterRoutes.js"
import { fetchMeterInfo } from "./utils/portalApi.js";

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(meterRoutes);



app.listen(PORT,async()=>{
    console.log("Listening to server")
// try {
//         await fetchMeterInfo("J100020");
//     } catch (error) {
//        console.log(error); 
//     }

})



