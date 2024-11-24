import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

const MenuItem = ({ pizza }) => {
  const dispatch = useDispatch();
  const { name, unitPrice, id, soldOut, imageUrl, ingredients } = pizza;

  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity !== 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: pizza.id,
      name: pizza.name,
      quantity: 1,
      unitPrice: pizza.unitPrice,
      totalPrice: pizza.unitPrice * 1,
    }
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={`${name}-image`}
        className={`w-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex flex-grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-sm">
            {soldOut ? (
              <span className="font-medium text-red-500">SOLD OUT</span>
            ) : (
              formatCurrency(unitPrice)
            )}
          </p>
          {isInCart &&
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity id={id} currentQuantity={currentQuantity}/>
              <DeleteItem id={id}/>
            </div>
          }
          {!soldOut && !isInCart &&
            <Button type="small" onClick={handleAddToCart}>Add to cart</Button>
          }
        </div>
      </div>
    </li>
  );
};

export default MenuItem;