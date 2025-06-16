async function getMenu() {
    try {
        const res = await fetch("/api/menu");
        if(!res.ok) throw new Error("Failed to fetch menu data");

        const { data } = await res.json();
        return data;
    }
    catch(err) {
        console.error(err.message);
    }
}

async function getOrder(id) {
    try {
        const res = await fetch(`/api/order/${id}`);
        if(!res.ok) throw new Error(`Order #${id} was not found`);

        const { data } = await res.json();
        return data;
    }
    catch(err) {
        console.error(err.message);
    }
}

async function createOrder(newOrder) {
    try {
        const res = await fetch("/api/order", {
            method: "POST",
            body: JSON.stringify(newOrder),
            headers: {
                "Content-Type": "application/json",
            }
        });

        if(!res.ok) throw new Error("Failed to create new order");

        const { data } = await res.json();
        return data;
    }
    catch(err) {
        console.error(err.message);
    }
}

async function updateOrder(id, updatedData) {
    try {
        const res = await fetch(`/api/order/${id}`, {
            method: "PATCH",
            body: JSON.stringify(updatedData),
            headers: {
                "Content-Type": "application/json",
            }
        });

        if(!res.ok) throw new Error("Failed to update your order");
    }
    catch(err) {
        console.error(err.message);
    }
}

export { getMenu, getOrder, createOrder, updateOrder };