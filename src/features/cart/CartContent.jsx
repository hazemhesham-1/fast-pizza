import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";

const CartContent = () => {
    const totalQuantity = useSelector(getTotalCartQuantity);
    const totalPrice = useSelector(getTotalCartPrice);

    return (
        <div className="flex justify-between bg-stone-800 text-stone-200 text-sm uppercase p-4 sm:px-6 md:text-base">
            <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6">
                <span>{totalQuantity} pizzas</span>
                <span>{formatCurrency(totalPrice)}</span>
            </p>
            <Link to="/cart">Open Cart &rarr;</Link>
        </div>
    );
}

export default CartContent;