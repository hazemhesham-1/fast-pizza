import { Link } from "react-router-dom";

const Button = ({ children, path, disabled, type, onClick }) => {
    const baseClass = {
        display: "inline-block",
        background: "bg-yellow-400",
        border: "rounded-full",
        text: "text-stone-800 text-sm",
        font: "font-semibold uppercase tracking-wide",
        transitions: "transition-colors duration-300",
        hover: "hover:bg-yellow-300",
        focus: "focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2",
        disabled: "disabled:cursor-not-allowed",
    };
    
    const base = Object.values(baseClass).join(" ");

    const styles = {
        primary: base + " px-4 py-3 md:px-6 md:py-4",
        secondary: Object.values({
            ...baseClass,
            background: "",
            border: "rounded-full border-2 border-stone-300",
            text: "text-stone-400 text-sm",
            padding: "px-4 py-2.5 md:px-6 md:py-3.5",
            hover: "hover:bg-stone-300 hover:text-stone-800",
            focus: "focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2",
        }).join(" "),
        small: base + " text-xs px-4 py-2 md:px-5 md:py-2.5",
        round: Object.values({
            ...baseClass,
            padding: "px-2.5 py-1 md:px-3.5 md:py-2",
        }).join(" "),
    };

    if(path != null) {
        return (
            <Link to={path} className={styles[type]}>
                {children}
            </Link>
        );
    }

    if(onClick) {
        return (
            <button className={styles[type]} disabled={disabled} onClick={onClick}>
                {children}
            </button>
        );
    }

    return (
        <button className={styles[type]} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;