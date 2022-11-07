import React from "react";
import classes from './Meals.module.css';
import MealList from "./MealList";

const DUMMY_MEALS = [
    {
        id: 'm1',
        name: 'Veg Cheese SandWich',
        description: 'Filled with cheese and veggies!',
        price: 80,
    },
    {
        id: 'm2',
        name: 'VadaPav',
        description: 'Maharashtra specialty!',
        price: 20,
    },
    {
        id: 'm3',
        name: 'Chole Bhature',
        description: 'Best BreakFast Ever!',
        price: 120,
    },
    {
        id: 'm4',
        name: 'Coco',
        description: 'Filled with Chocolate!',
        price: 30,
    },
];


function Meals() {
    return (
        <div className={classes.container}>
            {DUMMY_MEALS.map(meal => (
                <MealList
                    key={meal.id}
                    id={meal.id}
                    data={meal}
                />
            ))}
        </div>
    );
}

export default Meals;