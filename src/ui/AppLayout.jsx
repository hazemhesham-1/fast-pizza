import { Outlet, useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";
import CartContent from "../features/cart/CartContent";
import Header from "./Header";
import Loader from "./Loader";

const AppLayout = () => {
    const cart = useSelector((state) => state.cart.cart);

    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";

    return (
        <div className="grid h-screen grid-rows-[auto_1fr_auto]">
            {isLoading && <Loader/>}
            <Header/>
            <div className="overflow-auto">
                <main className="mx-auto max-w-3xl">
                    <Outlet/>
                </main>
            </div>
            {cart.length > 0 && <CartContent/>}
        </div>
    );
};

export default AppLayout;