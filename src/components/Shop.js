import React from 'react'
import { useDispatch } from 'react-redux';
import {actionCreators} from '../state/index';

function Shop() {
    const dispatch = useDispatch();
    return (
        <div>
            <button onClick={()=>{dispatch(actionCreators.withdrawMoney(100))}}>-</button>
            Update Balance
            <button onClick={()=>{dispatch(actionCreators.depositMoney(100))}}>+</button>

            {/* <button onClick={()=>dispatch({
               type:"withdraw",
               payload:100,
            })}>-</button>
            Update Balance
            <button onClick={()=>dispatch({
                type:"deposit",
                payload:100,
            })}>+</button> */}

        </div>
    )
}

export default Shop
