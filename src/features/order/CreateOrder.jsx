import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress, getFullAddress, getUsername } from "../user/userSlice";

function isValidPhone(number) {
  const pattern = /^\+?\d{1,4}?[-./s]?\(?\d{1,3}?\)?[-./s]?\d{1,4}[-./s]?\d{1,4}$/;
  return pattern.test(number);
}

const CreateOrder = () => {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: addressStatus,
    address,
    position,
    error: addressError,
  } = useSelector(state =>  state.user);
  const isLoadingPosition = addressStatus === "loading";

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();
  const dispatch = useDispatch();

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if(cart.length === 0) return <EmptyCart/>;

  function handleGetPosition(e) {
    e.preventDefault();
    dispatch(fetchAddress());
  }

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let's go!
      </h2>
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-32">First Name</label>
          <div className="flex-grow">
            <input
              className="input"
              type="text"
              name="customer"
              defaultValue={username}
              required
            />
          </div>
        </div>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-32">Phone Number</label>
          <div className="flex-grow">
            <input
              className="input"
              type="tel"
              name="phone"
              required
            />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>
        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-32">Address</label>
          <div className="flex-grow">
            <input
              className="input"
              type="text"
              name="address"
              defaultValue={address}
              disabled={isLoadingPosition}
              required
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {addressError}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && addressStatus != "error" &&
            <span className="absolute right-1 bottom-1 z-50 sm:bottom-1.5">
              <Button
                type="small"
                onClick={(e) => handleGetPosition(e)}
                disabled={isLoadingPosition}
              >
                Get position
              </Button>
            </span>
          } 
        </div>
        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            id="priority"
            name="priority"
            value={withPriority}
            onChange={e => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Do you want to give your order priority?
          </label>
          <br/>
        </div>
        <div>
          <input
            type="hidden"
            name="cart"
            value={JSON.stringify(cart)}
          />
          <input
            type="hidden"
            name="position"
            value={position.latitude && position.longitude ? `${position.latitude},${position.longitude}` : ""}
          />
          <Button type="primary" disabled={isSubmitting || isLoadingPosition}>
            {isSubmitting ?
              "Placing order..." : `Order now for ${formatCurrency(totalPrice)}`
            }
          </Button>
        </div>
      </Form>
    </div>
  );
};

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = new Object();
  if(!isValidPhone(order.phone)) {
    errors.phone = "Please, enter a valid phone number";
  }

  if(Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;