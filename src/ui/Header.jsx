import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

const Header = () => {
    return (
        <header
            className="font-serif flex items-center justify-between
            border-b border-stone-300 bg-yellow-400 px-4 py-3
            uppercase sm:px-6"
        >
            <Link to="/" className="tracking-widest">
                Fast Pizza Co.
            </Link>
            <SearchOrder />
            <Username />
        </header>
    );
};

export default Header;