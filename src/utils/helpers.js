export function formatCurrency(value) {
    return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });
}

export function formatDateTime(date) {
    return new Date(date).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    });
}

export function calcMinutesLeft(time) {
    return Math.round((new Date(time).getTime() - Date.now()) / 60000);
}