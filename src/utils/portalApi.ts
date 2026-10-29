
import { portalApi } from "../config/apiConfig.js";

let sessionCookie: string | null = null;


export const loginToPortal = async () => {
    const formData = new URLSearchParams();
    const email = process.env.PORTAL_EMAIL;
    const password = process.env.PORTAL_PASSWORD;

    if (!email || !password) {
        throw new Error("Portal credentials are missing");
    }

    formData.append("email", email)
    formData.append("password", password)



    const result = await portalApi.post("/login", formData, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-sveltekit-action": "true",
            "Origin": "https://urja-ops.flockenergy.tech",
            // "Referer": "https://urja-ops.flockenergy.tech/login",
            // "Accept": "application/json"
        },
    })

    const cookies = result.headers["set-cookie"]
    const session = cookies?.find((cookie) => cookie.startsWith("__Secure-better-auth.session_token"))


    if (!session) {
        throw new Error("Session cookie not received");
    }

    sessionCookie = session.split(";")[0]!;

    if(!sessionCookie){
        throw new Error("failed to get session cookie");
    }
    // console.log(sessionCookie);

    return sessionCookie;
}

export const fetchMeters = async(search: string, pageNumber: number) =>{
    const sessionCookie = await loginToPortal();

    if(!sessionCookie){
        throw new Error("Unauthorized");
    }

    const result = await portalApi.get(`/portal/meters/search?q=${search}&page=${pageNumber}`,{
        headers:{
            cookie: sessionCookie
        }
    })

    return result.data;
}

export const fetchMeterInfo = async(meterId: string) =>{
    const sessionCookie = await loginToPortal();

    if(!sessionCookie){
        throw new Error("Unauthorized");
    }

    const result = await portalApi.get(`/meters/${meterId}/__data.json?x-sveltekit-invalidated=001`,{
        headers:{
            cookie: sessionCookie
        }}
    )

    return result.data;
}

export const fetchEnergyConsumption = async(meterId: string) =>{
    const sessionCookie = await loginToPortal();

    if(!sessionCookie){
        throw new Error("Unauthorized");
    }
    const result = await portalApi.get(`/portal/meters/${meterId}/energy`,{
        headers:{
            cookie: sessionCookie
        }
    })

    return result.data;
}


export const meterLocation = async(meterId: string) =>{
    const sessionCookie = await loginToPortal();

    if(!sessionCookie){
        throw new Error("Unauthorized");
    }
    
    const result = await portalApi.get(`/portal/meters/${meterId}/geo`,{
        headers:{
            cookie: sessionCookie
        }
    })

    return (result.data);

} 

export const fetchTransformers = async(pageNumber: string) =>{
    const sessionCookie = await loginToPortal();

    if(!sessionCookie){
        throw new Error("Unauthorized");
    }

    const result = await portalApi.get(`/portal/dts?page=${pageNumber}`,{
        headers:{
            cookie: sessionCookie
        }
    });

    return result.data;
}

