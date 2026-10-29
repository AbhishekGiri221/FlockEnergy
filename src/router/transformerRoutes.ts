import { Router } from "express";
import { getTransformers, getTransformersDetails } from "../controller/transformerController.js";


const router = Router()

router.get("/app/transformers", getTransformers);
router.get("/app/transformers/:dtCode", getTransformersDetails)

export default router