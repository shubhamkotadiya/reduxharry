import { combineReducers } from "redux";
import amountReducer from "./amountReducer";

 const reducers= combineReducers({
    amount:amountReducer,
})

export default reducers



//reducers are nothing but our store (state) .
//in the store, we have different-different variable like amount, and so many
//we can use those variable whenever we want example: state.amount (which is used in Navbar component)