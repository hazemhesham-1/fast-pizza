import LinkButton from "../../ui/LinkButton";

const EmptyCart = () => {
    return (
        <div className="px-4 py-3">
            <LinkButton path="/menu">&larr; Back to menu</LinkButton>
            <p className="mt-7 text-xl font-semibold">
                Your cart is still empty. start adding some pizzas 😀
            </p>
        </div>
    );
};

export default EmptyCart;