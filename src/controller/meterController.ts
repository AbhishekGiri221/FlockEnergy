import type { Request, Response } from "express";
import { energyConsumptionServices, getAllMetersServices, getMeterDetailsServices, getMeterLocationServices } from "../services/meterServices.js";
import { inflateRawSync } from "node:zlib";

export const getAllMeters = async (req: Request, res: Response) => {
    try {

        const page = Number(req.query.page ?? 1);
        const search = String(req.query.search ?? "").trim();

        const result = await getAllMetersServices(search, page);

        res.status(200).json(result);

    } catch (error) {
        if(error instanceof Error){
            res.status(400).json(error.message);
            return;
        }
        res.status(400).json({ "message": "failed to get the meter details" });
    }
}

export const getMeterDetails = async(req: Request, res: Response) =>{
    try {
        const { meterId } = req.params;
        console.log(meterId)
        if (!meterId || typeof(meterId) !== 'string' || !meterId.trim()) {
            throw new Error("Meter ID is required");
        }

        const meterData = await getMeterDetailsServices(meterId)

        res.status(200).json(meterData);

    } catch (error) {
        res.status(400).json(error);
    }
}

export const getEnergyConsumption = async(req: Request, res: Response) =>{
    try {
        const { meterId } = req.params;
        console.log(meterId)
        if (!meterId || typeof meterId !== 'string' || !meterId.trim()) {
            throw new Error("Meter ID is required");
        }

        const energyConsumption = await energyConsumptionServices(meterId);

        res.status(200).json(energyConsumption);

    } catch (error) {
        res.status(400).json(error);

    }
}
export const getMeterLocation = async(req: Request, res: Response) =>{
    try {
        const { meterId } = req.params;
        console.log(meterId)
        if (!meterId || typeof meterId !== 'string' || !meterId.trim()) {
            throw new Error("Meter ID is required");
        }

        const energyConsumption = await getMeterLocationServices(meterId);

        res.status(200).json(energyConsumption);

    } catch (error) {
        res.status(400).json(error);

    }
}

