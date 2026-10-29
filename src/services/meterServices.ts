import { decodeMeter } from "../utils/decodeMeter.js";
import { fetchEnergyConsumption, fetchMeterInfo, fetchMeters } from "../utils/portalApi.js"

export const getAllMetersServices = async (pageNumber: number)=>{
    const  meters = await fetchMeters(pageNumber);

    return meters;
}

export const getMeterDetailsServices = async(meterId: string) =>{
    
    const result = await fetchMeterInfo(meterId);

    return decodeMeter(result);
}

export const energyConsumptionServices = async(meterId: string)=>{
    const result = await fetchEnergyConsumption(meterId);

    return result
}