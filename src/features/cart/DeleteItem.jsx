import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";
import Button from "../../ui/Button";

const DeleteItem = ({ id }) => {
    const dispatch = useDispatch();

    return (
        <Button type="small" onClick={() => dispatch(deleteItem(id))}>
            Remove Item
        </Button>
    );
};

export default DeleteItem;