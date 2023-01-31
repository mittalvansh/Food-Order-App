import React, { useState, useContext, useEffect } from "react";
import classes from './Header.module.css';
import mealsImage from '../../assets/Meals.jpg';
import Cart from "../Cart/Cart";
import CartContext from "../Hooks/cart-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
} from "@fortawesome/free-solid-svg-icons";
import app from "../../firebaseConfig";
import { db } from "../../firebaseConfig";
import { Drawer, Box, Typography, Button, 
    Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";

function Header() {
    const [view, setView] = useState(false);
    const [isopen, setIsOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);
    console.log(items);

    const id = window.localStorage.getItem("uid");
    const dbInstance = collection(db, "User" , id , "orderData");

    const getData = async () => {
        try{
            const data = await getDocs(dbInstance);
            const newData = data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            newData.map((item) => {
                let name = item.foodData.map((e) => {
                    return e.name;
                })
                let amount = item.foodData.map((e) => {
                    return e.amount;
                })
                let totalAmount = item.totalAmount;
                let time = item.time;
                setItems(prev => ([...prev, {
                    name: name,
                    amount: amount,
                    totalAmount: totalAmount,
                    time: time,
                    id: item.id
                }]));
            });
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getData();
    }, []);

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
                <div className={classes.rightSide}>
                    <button className={classes.button} onClick={viewHandler}>
                        <span>Your Cart</span>
                        <span className={classes.badge}>{numberOfCartItems}</span>
                    </button>
                    <p onClick={() => {
                        setIsOpen(true);
                    }}>
                        <FontAwesomeIcon icon={faBars} />
                    </p>
                </div>
            </header>
            <Drawer anchor="right" open={isopen}
                onClose={() => {
                    setIsOpen(false);
                }}
            >
                <Box width='300px' textAlign='center'>
                    <div style={{
                        height: '5rem',
                        backgroundColor: '#651212',
                    }}></div>
                    <Typography variant='h5' style={{
                        padding: '1rem',
                    }}>
                        Shiv Shakti Foods
                    </Typography>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1rem',
                    }}>
                        <Button 
                            variant='contained' 
                            style={{
                                marginBottom: '1rem',
                                backgroundColor: '#9f1717',
                                color: '#fff',
                                border: '3px solid #fff',
                                borderRadius: '8px',
                                height: '60px',
                                padding: '0 4rem',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            My Profile
                        </Button>
                        <Button 
                            variant='contained' 
                            style={{
                                marginBottom: '1rem',
                                backgroundColor: '#9f1717',
                                color: '#fff',
                                border: '3px solid #fff',
                                borderRadius: '8px',
                                height: '60px',
                                padding: '0 4rem',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                            }}
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            My Orders
                        </Button>
                        <Button
                            variant='contained'
                            style={{
                                marginTop: '1rem',
                                border: '2px solid #fff',
                                backgroundColor: '#9f1717',
                                color: '#fff',
                                borderRadius: '4px',
                                height: '40px',
                                padding: '0 1rem',
                                fontWeight: 'bold',
                                fontSize: '0.8rem',
                                transition: 'all 0.3s ease',
                            }}
                            onClick={() => {
                                window.localStorage.removeItem('loggedIn');
                                window.localStorage.removeItem('uid');
                                window.location.reload();
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                    <Dialog
                        open={open}
                        onClose={() => {
                            setOpen(false);
                        }}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Your Orders"}</DialogTitle>
                        <DialogContent>
                            {items.map((item) => {
                                return (
                                    <Box style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '1rem',
                                        border: '1px solid #9f1717',
                                        borderRadius: '8px',
                                        margin: '1rem',
                                    }}
                                    flexDirection={{ xs: 'column', sm: 'row' }}
                                    justifyContent={{ xs: 'center', sm: 'space-between' }}
                                    >
                                        <Box 
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'flex-start',
                                            }}
                                            alignItems={{ xs: 'center', sm: 'flex-start' }}
                                        >
                                            {item.name.map((e, i) => {
                                                return (
                                                    <Typography variant='h6'
                                                        fontSize={{ xs: '0.8rem', sm: '1.2rem'}}
                                                    >
                                                        {e} x {item.amount[i]}
                                                    </Typography>
                                                )
                                            })}
                                        </Box>
                                        <Box 
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'flex-end',
                                            }}
                                        >
                                            <Typography 
                                                variant='h6'
                                                fontSize={{ xs: '0.8rem', sm: '1.2rem'}}
                                            >
                                                {item.time.slice(0,16)}
                                            </Typography>
                                            <Typography 
                                                variant='h6'
                                                fontSize={{ xs: '0.8rem', sm: '1.2rem'}}
                                            >
                                                {item.time.slice(16,25)}
                                            </Typography>
                                            <Typography 
                                                variant='h6'
                                                fontSize={{ xs: '0.8rem', sm: '1.2rem'}}
                                            >
                                                <span>Total Amount: </span> 
                                                {item.totalAmount}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )
                            })}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => {
                                setOpen(false);
                            }} color="primary" autoFocus>
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Drawer>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="A Table full of delicious Food!" />
            </div>
        </>
    );
}

export default Header;