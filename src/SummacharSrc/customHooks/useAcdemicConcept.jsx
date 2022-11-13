import axios from "axios";
import { toast } from "react-toastify";
import { setState,setData } from "../actions/AcdemicConceptAction";
import apiUrl from "../common/apiUrl";
import { getHeaders, resetToken } from "../common/helper";
import { getUserUuid } from "../common/helper"

const useAcdemicConcept = (state, dispatch) => {
   

    const pass_obj = {
        data: { ...state.data },
        next: { ...state.next },
        setData: (data) => {

            dispatch(setData(data));
        },
        // setLoading: (status) => {
        //     dispatch(setLoading(status));
        // },
        // getData: async (subject, chapter_name,url="") => {
        //     // pass_obj.setLoading(true);
        //     dispatch(setState(data,next))
        //     const response = await getConceptList(chapter_name);
        //     if (response.status) {
        //         const data = response.data;
        //         const list = { ...state.data };
        //         // if(list[subject]){
        //         //     list[subject][chapter_name] = data
        //         // }else{                    
        //         //     list[subject] = {

        //         //         [chapter_name]:data
        //         //     }  
        //         // }        
        //         if (data.results) {

        //         }

        //         dispatch(setState(list, []));
        //         return true;
        //     } else {
        //         if (response.error.response && response.error.response.status == 401) {
        //             await resetToken(async () => {
        //                 pass_obj.getData();
        //                 // pass_obj.setLoading(false);
        //             });
        //             return false;
        //         } else {
        //             // pass_obj.setLoading(false);
        //             toast.error("OOPS! Something went wrong!");
        //             return false;
        //         }
        //     }
        // }
        setState:(data,next)=>{            
            dispatch(setState(data,next))
        }
    }
    return pass_obj;
}
export default useAcdemicConcept;