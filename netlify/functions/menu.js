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
        const response = await fetch(`${BASE_URL}/menu`);
        const menuData = await response.json();

        if(menuData.status !== "success") {
            const result = {
                statusCode: 404,
                body: JSON.stringify({ error: "404 Not Found" }),
            };

            return result;
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