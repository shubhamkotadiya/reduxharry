import { signInDefaultData } from "../controllers/SignInController";

const signInReducer = ( state , action )=>{
    const temp = {...state};
    if(action.type==="SET_PHONE_NO"){
        temp.phoneNo = action.value;
        return temp;
    }
    if(action.type==="SET_OTP"){
        temp.otp = action.value;
        return temp;
    }

    if(action.type==="SET_PATHSHALA"){
        temp.pathshala = action.value;
        return temp;
    }
    if(action.type==="SET_LOADING"){
        temp.loading = action.value;
        return temp;
    }
    if(action.type==="SET_SELECTED_USER"){
        temp.selctedUser = action.value;
        return temp;
    }
    if(action.type==="SET_STEP"){
        temp.step = action.value;
        return temp;
    }
    if(action.type==="SET_STEP_INCREASE"){
        temp.step += 1;
        return temp;
    }
    if(action.type==="REFRESH"){
        
        return signInDefaultData;
    }

}
export default signInReducer;