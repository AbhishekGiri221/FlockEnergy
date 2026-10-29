import { fetchTransformers } from "../utils/portalApi.js"

export const getTransformerServices = async(pageNumber: string)=>{
    const transformers = await fetchTransformers(pageNumber);

    return transformers;
}

export const getTransformerDetailsServices = async(dtCode: string, page: string)=>{
    const transformers = await getTransformerServices(page);

    const dtDetails = transformers.data.find((t: any) => t.code === dtCode);
    
    return (dtDetails);
}