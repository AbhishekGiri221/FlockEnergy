import { describe, it, expect } from "vitest";
import { decodeMeter } from "../utils/decodeMeter.js";

describe("Meter Decoder", () => {
    it("should decode SvelteKit meter data correctly", () => {
        // Arrange: Prepare sample portal response
        const mockResponse = {
            nodes: [
                { type: "skip" },
                { type: "skip" },
                {
                    type: "data",
                    data: [
                        { meterId: 1, detail: 2, hierarchy: 9 },
                        "J100000",
                        { data: 3 },
                        [4, 6],
                        { parameterName: 5, parameterValue: 1 },
                        "Meter ID",
                        { parameterName: 7, parameterValue: 8 },
                        "Serial No",
                        "SE33962",
                        { "Meter ID": 1 }
                    ]
                }
            ]
        };

        // Act: Execute the function
        const result = decodeMeter(mockResponse);

        // Assert: Verify the result
        expect(result.meterId).toBe("J100000");
        expect(result.details["Meter ID"]).toBe("J100000");
        expect(result.details["Serial No"]).toBe("SE33962");
        expect(result.hierarchy["Meter ID"]).toBe("J100000");
    });
});