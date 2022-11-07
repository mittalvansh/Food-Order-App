import React, { useState, useContext } from "react";
import mealsImage from '../../assets/Meals.jpg';
import Cart from "../Cart/Cart";
import classes from './Header.module.css';
import CartContext from "../Hooks/cart-context";

function Header() {
    const [view, setView] = useState(false);

    const viewHandler = () => {
        setView(true);
    }

    const closeHandler = () => {
        setView(false);
    }

    const cartCtx = useContext(CartContext);

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    return (
        <>
            {view && <Cart onClose={closeHandler} />}
            <header className={classes.header}>
                <h1>Shiv Shakti Foods</h1>
                <button className={classes.button} onClick={viewHandler}>
                    <span>Your Cart</span>
                    <span className={classes.badge}>{numberOfCartItems}</span>
                </button>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="A Table full of delicious Food!" />
            </div>
        </>
    );
}

export default Header;