import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupee, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import classes from './CartItem.module.css';
import CartContext from "../Hooks/cart-context";

function CartItem(props) {
    const cartctx = useContext(CartContext);

    const addItemHandler = () => {
        cartctx.addItem({ ...props.data, amount: 1 });
    }

    const removeItemHandler = () => {
        cartctx.removeItem(props.data.id);
    }


    return (
        <div className={classes.container}>
            <div className={classes.container_1}>
                <h3>{props.data.name}</h3>
                <div className={classes.item}>
                    <span className={classes.price}>{props.data.price} <FontAwesomeIcon icon={faIndianRupee} /></span>
                    <span className={classes.amount}>x{props.data.amount}</span>
                </div>
            </div>
            <div>
                <button className={classes.add}><FontAwesomeIcon icon={faPlus} onClick={addItemHandler} /></button>
                <button className={classes.subtract}><FontAwesomeIcon icon={faMinus} onClick={removeItemHandler} /></button>
            </div>
        </div>
    );
}

export default CartItem;