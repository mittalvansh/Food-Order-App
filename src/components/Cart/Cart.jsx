import React, { useContext } from "react";
import ReactDOM from "react-dom";
import CartItem from "./CartItem";
import classes from './Cart.module.css';
import CartContext from "../Hooks/cart-context";


function Backdrop(props) {
    return <div className={classes.backdrop} onClick={props.onClose}></div>
}

function ModalOverlay(props) {
    const cartctx = useContext(CartContext);

    return (
        <div className={classes.modal}>
            {cartctx.items.map(meal => (
                <CartItem
                    key={meal.id}
                    data={meal}
                />
            ))}

            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{cartctx.totalAmount}</span>
            </div>

            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}> Close</button>
                <button className={classes.button} >Order</button>
            </div>
        </div >

    );
}

function Cart(props) {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, document.getElementById('backdrop-root'))}
            {ReactDOM.createPortal(<ModalOverlay onClose={props.onClose} />, document.getElementById('overlay-root'))}
        </>
    );
}

export default Cart;