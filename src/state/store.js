import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

 const store = createStore(reducers,{},applyMiddleware(thunk));

 export default store



 //applymiddleware mean jyare koi element store ma jase to te middleware through jase 
 //pehla middleware ma jase tyarbad store ma jase