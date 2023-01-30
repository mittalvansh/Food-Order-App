import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    setIsLoggedIn: false,
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const info = window.localStorage.getItem("loggedIn");
        if (info === "true") {
            setIsLoggedIn(true);
        }
    }, [isLoggedIn]);


    return (
        <AuthContext.Provider value={{
            isLoggedIn, setIsLoggedIn
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;

