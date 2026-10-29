import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import app from "../app.js";

import {
    getAllMetersServices,
    getMeterDetailsServices,
} from "../services/meterServices.js";

// Replace real service functions with mock functions.
vi.mock("../services/meterServices.js", () => ({
    getAllMetersServices: vi.fn(),
    getMeterDetailsServices: vi.fn(),
    energyConsumptionServices: vi.fn(),
    getMeterLocationServices: vi.fn(),
}));

// Mock transformer services so the test never calls the portal.
vi.mock("../services/transformerServices.js", () => ({
    getTransformerServices: vi.fn(),
    getTransformerDetailsServices: vi.fn(),
}));

describe("Meter API", () => {

    it("should return meters successfully", async () => {
        const mockData = {
            data: [
                { meterId: "J100000", make: "HPL" }
            ],
            total: 1,
            page: 1,
            pageSize: 20
        };

        vi.mocked(getAllMetersServices).mockResolvedValue(mockData);

        const response = await request(app)
            .get("/app/meters/export?page=1");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockData);
    });

    it("should return an empty list when no meters match", async () => {
        const mockData = {
            data: [],
            total: 0,
            page: 1,
            pageSize: 20
        };

        vi.mocked(getAllMetersServices).mockResolvedValue(mockData);

        const response = await request(app)
            .get("/app/meters/export?search=NOTFOUND");

        expect(response.status).toBe(200);
        expect(response.body.data).toEqual([]);
    });

    it("should pass search and page parameters to the service", async () => {
        vi.mocked(getAllMetersServices).mockResolvedValue({
            data: [],
            total: 0,
            page: 2,
            pageSize: 20
        });

        await request(app)
            .get("/app/meters/export?search=J100000&page=2");

        expect(getAllMetersServices)
            .toHaveBeenCalledWith("J100000", 2);
    });

    it("should return meter details successfully", async () => {
        const mockMeter = {
            meterId: "J100000",
            details: {
                "Make": "HPL"
            },
            hierarchy: {}
        };

        vi.mocked(getMeterDetailsServices)
            .mockResolvedValue(mockMeter);

        const response = await request(app)
            .get("/app/meters/J100000");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockMeter);
    });

});