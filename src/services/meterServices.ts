import { decodeMeter } from "../utils/decodeMeter.js";
import { fetchEnergyConsumption, fetchMeterInfo, fetchMeters, meterLocation } from "../utils/portalApi.js"

export const getAllMetersServices = async (search: string, pageNumber: number)=>{
    const  meters = await fetchMeters(search, pageNumber);

    // if(meters.data.length <= 0){
    //     throw new Error("No meter found with the meter number")
    // }
    
    return meters;
}

export const getMeterDetailsServices = async(meterId: string) =>{
    
    const result = await fetchMeterInfo(meterId);

    return decodeMeter(result);
}

export const energyConsumptionServices = async(meterId: string)=>{
    const energyConsumption = await fetchEnergyConsumption(meterId);

    return energyConsumption;
}

export const getMeterLocationServices = async(meterId: string) => {
    const locationDetails = await meterLocation(meterId);

    return locationDetails;
}