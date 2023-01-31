import React, { useContext } from "react";
import ReactDOM from "react-dom";
import CartItem from "./CartItem";
import classes from './Cart.module.css';
import CartContext from "../Hooks/cart-context";
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";


function Backdrop(props) {
    return <div className={classes.backdrop} onClick={props.onClose}></div>
}

function ModalOverlay(props) {
    const cartctx = useContext(CartContext);
    const id = window.localStorage.getItem('uid');
    const dbInstance = collection(db , "User" , id , "orderData")

    function notify(message) {
        toast(message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            progress: undefined,
        });
    }

    const data = {
        foodData : cartctx.items,
        totalAmount: cartctx.totalAmount,
        time: Date().toString()
    }

    async function clickHandler(e) {
        try {
            await addDoc(dbInstance , data);
            notify("Order placed successfully!");
            setTimeout(() => {
                cartctx.clearCart();
                window.location.reload();
            }, 3500);
        } catch(err) {
            alert(err.message)
        }
    };

    return (
        <>
        <ToastContainer toastStyle={{ backgroundColor: "#262626", color: "#fff" }} />
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
                <button className={classes.button} onClick={clickHandler}>Order</button>
            </div>
        </div>
        </>
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