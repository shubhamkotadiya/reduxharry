import { signInWithEmailAndPassword } from "@firebase/auth";
import axios from "axios";
import { useHistory } from "react-router";
import { setLoginAction, setLogOut, setUserDataAction } from "../actions/userActions";
import apiUrl from "../common/apiUrl";
import { auth } from "../common/firebaseConfig";
import { getAuthToken, getUserUuid, removeFirstQuizAttempt, removeFreeTrialToken, removeRefreshToken, removeToken, removeUserAddressDetails, removeUserUuid,removeSearchHistory, resetToken, setFireBaseErrorMessage, handleError } from "../common/helper";

const useUser = (state,dispatch,logOutCallback=()=>{})=>{
    const pass_obj =  {
        isLoggedIn:state.isLoggedIn,
        login : async(email,password)=>{                        
            // const response = await signInWithEmailAndPassword(auth,email,password).then((res)=>{                    
            //     return {status:true,data:res.user};
            // }).catch((error)=>{
            //     //console.log(error.code)                
            //     return {status:false,message:setFireBaseErrorMessage(error.code),code:error.code};
            // })      
            // return response;                                                      
        },       
        data:state.data,
        setUserData:(data)=>{
            dispatch(setUserDataAction(data));
        },
        setLogin:(status)=>{
            dispatch(setLoginAction(status));
        },
        getUserData: async()=>{
            return await axios({
                url:apiUrl.getUserDataUrl+"?user-uuid="+getUserUuid(),
                method:"GET",
                headers:{
                    'content-type': 'application/json',
                    'Authorization':`Token ${getAuthToken()}`
                }
            }).then((response)=>{
                if(response.status==200 || response.status==201){                                 
                    dispatch(setUserDataAction(response.data));
                }
                return {status:true,code:response.status,data:response.data}
                
            }).catch(async(err)=>{
                if (err.response && err.response.status==401){
                    
                    return {status:false,code:err.response.status}
                }else{
                    handleError(err)
                    return {status:false,code:err.response.status}
                }
                
                
            })
        },
        logOut : async()=>{
            return await auth.signOut().then(
                (res)=>{
                    removeToken();
                    removeFreeTrialToken();
                    removeUserUuid();
                    removeUserAddressDetails();
                    removeRefreshToken();
                    removeFirstQuizAttempt();
                    dispatch(setLogOut());
                    logOutCallback();
                    removeSearchHistory();
                    return {status:true}
                    
                }
            ).catch(()=>{
                return {status:false}
            });
                    
        }
    }
    return pass_obj;
    
}
export default useUser;
