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
        const payload = await fetch(`${BASE_URL}/menu`);
        const menuData = await payload.json();

        if(menuData.status !== "success") {
            throw new Error("Failed to fetch");
        }

        const result = {
            statusCode: 200,
            body: JSON.stringify(menuData),
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