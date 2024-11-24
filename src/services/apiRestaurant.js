const API_URL = "https://react-fast-pizza-api.onrender.com/api";

async function getMenu() {
    try {
        const res = await fetch(`${API_URL}/menu`);
        if(!res.ok) throw Error();

        const { data } = await res.json();
        return data;
    }
    catch(err) {
        throw new Error("Failed to fetch menu data");
    }
}

async function getOrder(id) {
    try {
        const res = await fetch(`${API_URL}/order/${id}`);
        if(!res.ok) throw Error();

        const { data } = await res.json();
        return data;
    }
    catch(err) {
        throw new Error(`Order #${id} was not found`);
    }
}

async function createOrder(newOrder) {
    try {
        const res = await fetch(`${API_URL}/order`, {
            method: "POST",
            body: JSON.stringify(newOrder),
            headers: {
                "Content-Type": "application/json",
            }
        });
        if(!res.ok) throw Error();

        const { data } = await res.json();
        return data;
    }
    catch(err) {
        throw new Error("Failed to create new order");
    }
}

async function updateOrder(id, updatedData) {
    try {
        const res = await fetch(`${API_URL}/order/${id}`, {
            method: "PATCH",
            body: JSON.stringify(updatedData),
            headers: {
                "Content-Type": "application/json",
            }
        });
        if(!res.ok) throw Error();
    }
    catch(err) {
        throw new Error("Failed to update your order");
    }
}

export { getMenu, getOrder, createOrder, updateOrder };