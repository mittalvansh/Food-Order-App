import React from "react";
import MealListForm from "./MealListForm";
import classes from './MealList.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupee } from "@fortawesome/free-solid-svg-icons";

function MealList(props) {

    return (
        <div className={classes.meal}>
            <div>
                <h3>{props.data.name}</h3>
                <div className={classes.description}>{props.data.description}</div>
                <div className={classes.price}> {props.data.price} <FontAwesomeIcon icon={faIndianRupee} /> </div>
            </div>
            <div>
                <MealListForm data={props.data} id={props.id} />
            </div>
        </div>
    );
}

export default MealList;