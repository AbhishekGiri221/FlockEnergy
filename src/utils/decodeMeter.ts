import { response } from "express";

export const decodeMeter = (response: any) =>{

    const values = response.nodes[2].data;

    const meterId = values[1];
    // console.log("---->",meterId)
    const details: Record< string,unknown> = {}

    const dataObject = values[values[0].detail].data
    const detailsIndex = values[dataObject];

    for(let i of detailsIndex){

        console.log("i is : ",i)
        const pramaterObject = values[i];
        console.log("prameter objec t is ", pramaterObject);

        const name = values[pramaterObject.parameterName];
        const value = values[pramaterObject.parameterValue];

        console.log("name os : ",name,"value is ",value);

        details[name] = value;
    }

    const hierarchy: Record<string, unknown> = {};

    const hierarchyObject = values[values[0].hierarchy];

    for(const [key, index] of Object.entries(hierarchyObject)){
        hierarchy[key] = values[Number(index)];
    }
    
    return {meterId, details, hierarchy};
}