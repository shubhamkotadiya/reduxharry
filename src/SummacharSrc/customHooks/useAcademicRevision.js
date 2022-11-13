import {   setState } from "../actions/AcdemicRevisionAction";

const useAcademicRevision = (state, dispatch)=>{
    
    return {
        data:{...state.data},
       
        next:{...state.next},
       
        setState:(data,next)=>{            
            dispatch(setState(data,next))
        }
    }
}
export default useAcademicRevision;