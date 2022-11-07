import React, { useState } from "react";
import Header from "./components/NavBar/Header";
import MealsSummary from "./components/Meals/MealsSummary";
import Meals from "./components/Meals/Meals";
import CartProvider from "./components/Hooks/CartProvider";
import "./App.css";

function App() {
    return (
        <CartProvider>
            <Header />
            <MealsSummary />
            <Meals />
        </CartProvider>
    );
}

export default App;
