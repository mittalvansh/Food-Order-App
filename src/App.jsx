import React, { useContext } from "react";
import Header from "../src/components/NavBar/Header";
import Meals from "../src/components/Meals/Meals";
import MealsSummary from "../src/components/Meals/MealsSummary";
import Auth from "./components/Auth/Auth";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "./components/Hooks/Auth-Context";
import "./App.css";

function App() {
    const Authctx = useContext(AuthContext);
    return (
        <>
            {Authctx.isLoggedIn ? (
                <>
                    <Header />
                    <MealsSummary />
                    <Meals />
                </>
            ) : (
                <Auth />
            )}
        </>
    );
}

export default App;
