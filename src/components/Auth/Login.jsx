import React, { useRef, useContext } from "react";
import classes from "./Login.module.css";
import { Stack, TextField } from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebaseConfig";
import AuthContext from "../../components/Hooks/Auth-Context";
import { ToastContainer, toast } from "react-toastify";

function Login(props) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const GETAUTH = getAuth(app);
    const Authctx = useContext(AuthContext);

    function notify(message) {
        toast(message, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            progress: undefined,
        });
    }

    async function submitHandler(e) {
        e.preventDefault();

        try {
            let res = await signInWithEmailAndPassword(GETAUTH, emailRef.current.value, 
                passwordRef.current.value);
            notify("Logged in successfully!");
            setTimeout(() => {
                window.localStorage.setItem("uid", res.user.uid);
                window.localStorage.setItem("loggedIn", true);
                Authctx.setIsLoggedIn(true);
            }, 3500);
        }
        catch (err) {
            notify("Invalid email or password!");
        }
    }
    return (
        <>
            <ToastContainer toastStyle={{ backgroundColor: "#262626", color: "#fff" }} />
            <div className={classes.wrapper}>
                <div className={classes.Container}>
                    <form className={classes.form} onSubmit={submitHandler}>
                        <h1>Sign in to your account</h1>
                        <Stack spacing={4}>
                            <Stack direction='column' spacing={2}>
                                <TextField
                                    inputRef={emailRef}
                                    className={classes.input}
                                    type="text"
                                    label="Enter College Email"
                                    variant="outlined"
                                    color="secondary"
                                    InputProps={{
                                        endAdornment: <AlternateEmailIcon />,
                                    }}
                                    required
                                />
                                <TextField
                                    inputRef={passwordRef}
                                    className={classes.input}
                                    type="password"
                                    label="Enter Password"
                                    color="secondary"
                                    variant="outlined"
                                    helperText="Password must be atleast 8 characters long"
                                    InputProps={{
                                        endAdornment: <LockOutlinedIcon />
                                    }}
                                    required
                                />
                            </Stack>
                        </Stack>

                        <div className={classes.btn}>
                            <button type="submit">Sign In</button>
                        </div>

                        <div className={classes.link}>
                            <span>
                                Don't Have an Account?
                            </span>
                            <button onClick={() => { props.onCreate(); }}>
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
                <div className={classes.image}></div>
            </div>
        </>
    );
}

export default Login;