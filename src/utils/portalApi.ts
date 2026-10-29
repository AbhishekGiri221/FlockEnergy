
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

    console.log(formData);

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

export const fetchMeters = async()=>{
    const sessionCookie = await loginToPortal();

    if(!sessionCookie){
        throw new Error("Unauthorized");
    }

    const result = await portalApi.get("/portal/meters/search?q=&page=1",{
        headers:{
            cookie: sessionCookie
        }
    })

    console.log(result.data);
}