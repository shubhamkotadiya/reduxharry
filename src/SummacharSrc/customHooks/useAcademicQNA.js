import {   setState } from "../actions/AcademicQNAAction";

const useAcademicQNA = (state, dispatch)=>{
    
    return {
        data:{...state.data},
       
        next:{...state.next},
       
        setState:(data,next)=>{            
            dispatch(setState(data,next))
        }
    }
}
export default useAcademicQNA;