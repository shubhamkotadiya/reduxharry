
export const depositMoney = (amount)=>{

    return (dispatch)=>{
        dispatch({
            type:"deposit",
            payload:amount,
        })
    }

    // return {
    //     type:"deposit",
    //     payload:amount,
    // }
}

export const withdrawMoney = (amount)=>{

    return (dispatch)=>{
        dispatch({
            type:"withdraw",
            payload:amount,
        })
    }

    // return {
    //     type:"withdraw",
    //     payload:amount,
    // }

}