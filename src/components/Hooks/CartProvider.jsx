import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultItemList = {
    items: [],
    totalAmount: 0,
}

const handler = (state, action) => {
    if (action.type === 'add-item') {
        const updatedTotalAmount =
            state.totalAmount + (action.item.price * action.item.amount);

        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount,
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }
    else if (action.type === 'remove-item') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    else if(action.type === 'clear-cart') {
        const updatedItems = [];
        const updatedTotalAmount = 0;

        return {
            ...state,
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    return defaultCartState;
}

const CartProvider = (props) => {
    const [state, dispatch] = useReducer(handler, defaultItemList);

    const addItemHandler = (item) => {
        dispatch({ type: "add-item", item: item });
    };

    const removeItemHandler = (id) => {
        dispatch({ type: "remove-item", id: id });
    };

    const clearCartHandler = () => {
        dispatch({ type: "clear-cart" });
    };

    const ctx = {
        items: state.items,
        totalAmount: state.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearCart: clearCartHandler
    };

    return (
        <CartContext.Provider value={ctx}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;
