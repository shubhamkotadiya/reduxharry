const  usePlans = (state,setstate)=>{
    
    return {
        data:{...state},
        setData:(data)=>{setstate(data)}
    }
}
export default usePlans