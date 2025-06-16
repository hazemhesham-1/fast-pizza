import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

const Header = () => {
    return (
        <header className="font-serif header">
            <Link to="/" className="tracking-widest">
                Fast Pizza Co.
            </Link>
            <SearchOrder/>
            <Username/>
        </header>
    );
};

export default Header;