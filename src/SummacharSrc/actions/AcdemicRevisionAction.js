export const setState = (data,next)=>{
    return {
        type: "SET_STATE",
        value: {
            data:data,
            
            next:next
        }
    }
}
