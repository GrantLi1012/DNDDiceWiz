import { config } from "../config/config";
export const rollDiceRequest = (min: number, max: number, n?: number) => {
    if (n === undefined) {
        n = 1;
    }
    return {
        "jsonrpc": "2.0",
        "method": "generateIntegers",
        "params": {
            "apiKey": config.randomOrgKey,
            "n": n,
            "min": min,
            "max": max,
        },
        "id": 42
    };
};