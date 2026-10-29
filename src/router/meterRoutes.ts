import {Router} from "express";
import { getAllMeters, getMeterDetails,getEnergyConsumption } from "../controller/meterController.js";

const router = Router();

router.get("/app/meters/export",getAllMeters);
router.get("/app/meters/:meterId",getMeterDetails);
router.get("/app/meters/:meterId/energy",getEnergyConsumption);
export default router


