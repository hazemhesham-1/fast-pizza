import { Link, useNavigate } from "react-router-dom";

const LinkButton = ({ children, path }) => {
    const navigate = useNavigate();
    const className = "text-sm text-blue-500 hover:text-blue-700 hover:underline";

    if(path === "-1") {
        return (
            <button onClick={() => navigate(-1)} className={className}>
                {children}
            </button>
        );
    }

    return (
        <Link to={path} className={className}>{children}</Link>
    );
}

export default LinkButton;