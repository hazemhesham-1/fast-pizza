import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";

const CartItem = ({ item }) => {
    const { name, quantity, unitPrice, pizzaId } = item;
    
    const totalPrice = quantity * unitPrice;

    return (
        <li className="py-3 sm:flex sm:items-center sm:justify-between">
            <p className="mb-1 sm:mb-0">
                {Number(quantity)}&times; {name}
            </p>
            <div className="flex items-center justify-between sm:gap-6">
                <p className="text-sm font-bold">
                    {formatCurrency(totalPrice)}
                </p>
                <UpdateItemQuantity id={pizzaId} currentQuantity={quantity}/>
                <DeleteItem id={pizzaId}/>
            </div>
        </li>
    );
};

export default CartItem;