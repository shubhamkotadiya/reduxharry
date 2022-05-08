import React from 'react'
import { useSelector } from 'react-redux'

function Navbar() {
    const amount = useSelector(state => state.amount);
    return (
        <div>
            <button disabled={true}>your balance : {amount}</button>
        </div>
    )
}

export default Navbar
