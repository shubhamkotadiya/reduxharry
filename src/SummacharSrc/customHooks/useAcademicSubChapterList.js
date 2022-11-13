import { setState } from "../actions/AcdemicSubChapterAction";


const useAcademicSubChapterList = (state, dispatch) => {
    return {
        data:{...state.data},
       
        next:{...state.next},
       
        setState:(data,next)=>{            
            dispatch(setState(data,next))
        }
    }
}
export default useAcademicSubChapterList;