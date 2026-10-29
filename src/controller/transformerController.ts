import type { Request, Response } from "express"
import { getTransformerDetailsServices, getTransformerServices } from "../services/transformerServices.js";

export const getTransformers = async(req: Request, res: Response) =>{
    try {
        const { page } = req.query
        if(!page || typeof(page) !== 'string' || !page.trim()){
            throw new Error(" Check the url ");
        }

        const result = await getTransformerServices(page);

        res.status(200).json(result);

    } catch (error) {
        
        res.status(400).json(error);
    }
}

export const getTransformersDetails = async(req: Request, res: Response) =>{
    try {
        const { dtCode } = req.params;
        const { page } = req.query;
        if(!dtCode || typeof(dtCode) !== 'string' || !dtCode.trim()){
            throw new Error(" Check the url ");
        }
        if(typeof page !== "string" || !Number.isSafeInteger(Number(page)) || Number(page) < 1 || !page.trim()){
            throw new Error(" Check the url ");
        }

        console.log("page is and dt i s", dtCode, "*",page,"*");
        const result = await getTransformerDetailsServices(dtCode, page);
        
        if (!result) {
                return res.status(404).json({
                message: "Transformer not found on the specified page"
            });
        }
        res.status(200).json(result);

    } catch (error) {
        if(error instanceof Error){
            res.status(400).json(error.message);
            return;
        }
        res.status(400).json(error);
    }
}