import { BASE_URL } from "./data";

export async function handler(event) {
    if(event.httpMethod !== "GET") {
        const result = {
            statusCode: 405,
            body: JSON.stringify({ error: "Method Not Allowed" }),
        };

        return result;
    }

    try {
        const res = await fetch(`${BASE_URL}/menu`);

        const result = {
            statusCode: 200,
            body: JSON.stringify(cities),
        };

        return result;
    }
    catch(err) {
        const result = {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };

        return result;
    }
};