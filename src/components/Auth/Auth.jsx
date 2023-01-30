import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

function Auth() {

    const [form, setForm] = useState(false)

    const createHandler = e => {
        setForm(!form)
    }

    return (
        <>
            {form ? <Login onCreate={createHandler} /> : <SignUp onCreate={createHandler} />}
        </>
    )
}

export default Auth