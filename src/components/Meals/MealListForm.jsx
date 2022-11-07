import React, { useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import classes from './MealListForm.module.css';
import CartContext from "../Hooks/cart-context";
import Input from "../UI/Input";

function MealListForm(props) {
    const inputref = useRef();
    const ctx = useContext(CartContext);

    const submitHandler = (event) => {
        event.preventDefault();
        const amount = +inputref.current.value;

        ctx.addItem({
            name: props.data.name,
            price: props.data.price,
            id: props.id,
            amount: amount
        });
    }

    return (
        <>
            <form className={classes.form} onSubmit={(e) => submitHandler(e)}>
                <Input
                    ref={inputref}
                    label='Amount'
                    input={{
                        id: 'amount_' + props.id,
                        type: 'number',
                        min: '1',
                        max: '5',
                        step: '1',
                        defaultValue: '1',
                    }}
                />
                <button type="submit">
                    <FontAwesomeIcon icon={faPlus} /> Add
                </button>
            </form>
        </>
    );
}

export default MealListForm;