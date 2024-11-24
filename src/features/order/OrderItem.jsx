import { formatCurrency } from "../../utils/helpers";

const OrderItem = ({ item, ingredients, isLoadingIngredients }) => {
    const { name, quantity, totalPrice } = item;

    return (
        <li className="space-y-1 py-3">
            <div className="flex items-center justify-between gap-3 text-sm">
                <p>
                    <span className="font-bold">{quantity}&times;</span> {name}
                </p>
                <p className="font-bold">{formatCurrency(totalPrice)}</p>
            </div>
            <p className="text-sm capitalize italic text-stone-400">
                {!isLoadingIngredients ? ingredients?.join(", ") : "Loading..."}
            </p> 
        </li>
    );
};

export default OrderItem;