import React, { useRef, useContext } from "react";
import classes from "./SignUp.module.css";
import { Stack, TextField } from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../firebaseConfig";
import AuthContext from "../../components/Hooks/Auth-Context";
import { ToastContainer, toast } from "react-toastify";

function SignUp(props) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const GETAUTH = getAuth(app);
    const Authctx = useContext(AuthContext);

    function notify(message) {
        toast(message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            progress: undefined,
        });
    }

    async function submitHandler(e) {
        e.preventDefault();

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            notify("Passwords do not match!");
            return;
        }
        if (passwordRef.current.value.length < 8) {
            notify("Password should be atleast 8 characters long!");
            return;
        }

        try {
            let res = await createUserWithEmailAndPassword(GETAUTH, emailRef.current.value, passwordRef.current.value);
            console.log(res);
            notify("Account created successfully!");
            setTimeout(() => {
                window.localStorage.setItem("uid", res.user.uid);
                window.localStorage.setItem("loggedIn", true);
                Authctx.setIsLoggedIn(true);
            }, 3500);
        }
        catch (err) {
            notify(err.message);
        }
    }

    return (
        <>
            <ToastContainer toastStyle={{ backgroundColor: "#262626", color: "#fff" }} />
            <div className={classes.wrapper}>
                <div className={classes.image}></div>
                <div className={classes.Container}>
                    <form className={classes.form} onSubmit={submitHandler}>
                        <h1>Create an account</h1>
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
                                    InputProps={{
                                        endAdornment: <LockOutlinedIcon />
                                    }}
                                    required
                                />
                                <TextField
                                    inputRef={confirmPasswordRef}
                                    className={classes.input}
                                    type="password"
                                    label="Confirm Password"
                                    variant="outlined"
                                    color="secondary"
                                    helperText="Password must be atleast 8 characters long"
                                    InputProps={{
                                        endAdornment: <LockOutlinedIcon />
                                    }}
                                    required
                                />
                            </Stack>
                        </Stack>

                        <div className={classes.btn}>
                            <button type="submit">Sign Up</button>
                        </div>

                        <div className={classes.link}>
                            <span>
                                Already have an account?
                            </span>
                            <button onClick={() => { props.onCreate(); }}>
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;