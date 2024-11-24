import { calcMinutesLeft, formatCurrency, formatDateTime } from "../../utils/helpers";
import { getOrder } from "../../services/apiRestaurant";
import { useFetcher, useLoaderData } from "react-router-dom";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

const Order = () => {
    const order = useLoaderData();

    const fetcher = useFetcher();

    useEffect(() => {
        if(!fetcher.data && fetcher.state === "idle") {
            fetcher.load("/menu");
        }
    }, [fetcher]);

    const {
        cart,
        customer,
        estimatedDelivery,
        id,
        orderPrice,
        priority,
        priorityPrice,
        status
    } = order;

    const totalPrice = orderPrice + priorityPrice;
    const timeLeft = calcMinutesLeft(estimatedDelivery);

    return (
        <div className="space-y-8 px-4 py-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-semibold">
                    Order #{id} status
                </h2>
                <p className="space-x-2">
                    {priority && (
                        <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wider text-red-50">
                            Priority
                        </span>
                    )}
                    <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wider text-green-50">
                        {status} order
                    </span>
                </p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
                <p className="font-medium">
                    {timeLeft <= 0 ?
                        `Order was delivered to ${customer} successfully`
                        : `Only ${timeLeft} minutes left 😃`
                    }
                </p>
                <p className="text-xs text-stone-600">
                    Estimated delivery time: {formatDateTime(estimatedDelivery)}
                </p>
            </div>
            <ul className="divide-y divide-stone-200 border-b border-t">
                {cart.map((item) =>
                    <OrderItem
                        item={item}
                        key={item.pizzaId}
                        ingredients={fetcher.data?.find(pizza =>
                            item.pizzaId === pizza.id
                        ).ingredients}
                        isLoadingIngredients={fetcher.state === "loading"}
                    />
                )}
            </ul>
            <div className="space-y-2 bg-stone-200 px-6 py-5">
                <p className="text-sm font-medium text-stone-700">
                    Price pizza: {formatCurrency(orderPrice)}
                </p>
                {priority &&
                    <p className="text-sm font-medium text-stone-700">
                        Price priority: {formatCurrency(priorityPrice)}
                    </p>
                }
                <p className="font-bold">
                    To pay on delivery: {formatCurrency(totalPrice)}
                </p>
            </div>
            {!priority && <UpdateOrder/>}
        </div>
    );
};

export async function loader({ params }) {
    const order = await getOrder(params.orderId);
    return order;
}

export default Order;