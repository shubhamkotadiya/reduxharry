import { setUserType } from "../common/helper";

const userReducer = (state,action)=>{
    
    
    if(action.type=="ADD_USER"){           
        return {...state,data:{...action.value,user_type:setUserType(action.value.subject_list)}};
    }
    if(action.type=="SET_LOGIN"){        
        return {...state,isLoggedIn:action.value};
    }
    if(action.type=="SET_LOGOUT"){
        return {isLoggedIn:false,data:{}};
    }
}
export default userReducer;