import { BASE_URL } from "./data";

export async function handler(event) {
    const method = event.httpMethod;
    const segments = event.path.split("/").filter(Boolean);

    try {
        let orderData = {};

        if(method === "POST") {
            const response = await fetch(`${BASE_URL}/order`, {
                method: "POST",
                body: event.body,
                headers: {
                    "Content-Type": "application/json",
                }
            });

            orderData = await response.json();
        }
        else if((method === "GET") || (method === "PATCH")) {
            if(segments.length < 3) throw new Error("Order ID is missing!");

            const orderId = segments.pop();

            if(method === "GET") {
                const response = await fetch(`${BASE_URL}/order/${orderId}`);
                orderData = await response.json();
            }
            else {
                const response = await fetch(`${BASE_URL}/order/${orderId}`, {
                    method: "PATCH",
                    body: event.body,
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                orderData = await response.json();
            }
        }
        else {
            const result = {
                statusCode: 405,
                body: JSON.stringify({ error: "Method Not Allowed" }),
            };

            return result;
        }

        if(orderData.status !== "success") {
            const result = {
                statusCode: 404,
                body: JSON.stringify({ error: "404 Not Found" }),
            };

            return result;
        }

        const result = {
            statusCode: 200,
            body: JSON.stringify(orderData),
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