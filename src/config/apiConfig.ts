import axios from "axios";

const baseURL = process.env.PORTAL_BASE_URL;

if (!baseURL) {
    throw new Error("PORTAL_BASE_URL is missing in");
}

export const portalApi = axios.create({
    baseURL: baseURL,
    timeout: 10000,
});
