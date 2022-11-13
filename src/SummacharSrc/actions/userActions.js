export const setUserDataAction = (data)=>{
    return {
        type:"ADD_USER",
        value:data
    }
}
export const setLoginAction = (status)=>{
    return {
        type:"SET_LOGIN",
        value:status
    }
}
export const setLogOut = ()=>{
    return {
        type:"SET_LOGOUT"        
    }
}