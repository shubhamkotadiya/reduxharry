import { useContext } from "react";
import FreeBadge from "../badges/FreeBadge";
import LockBadge from "../badges/LockBadge";
import ReadBadge from "../badges/ReadBadge";
import { Store } from "../../../App";
const FreeQuizAccessBadge = (props) => {
    const user = useContext(Store).user.data;
    
    if(props.data && props.data.user_has_access){
        
        if(user.subject_list==null || (user.subject_list && user.subject_list.length<2)){
            if(props.data.has_attempted){
                return <ReadBadge data={props.data} sentence="Yay! You attempted it on "/>
            }else{
                return <FreeBadge />
            }
            
            
        }else{  
            if(props.data.has_attempted){
                return <ReadBadge data={props.data} sentence="Yay! You attempted it on "/>
            }else{
                return <></>
            }          
            
        }
    }else{
        return <LockBadge premium_intrest_string={props.premium_intrest_string?props.premium_intrest_string:""} />
    }
    
}
export default FreeQuizAccessBadge;