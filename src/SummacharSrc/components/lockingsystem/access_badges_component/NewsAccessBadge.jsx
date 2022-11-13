import FreeBadge from "../badges/FreeBadge";
import LockBadge from "../badges/LockBadge";
import ReadBadge from "../badges/ReadBadge";

import Tooltip from '@material-ui/core/Tooltip';
const NewsAccessBadge = (props) => {
    // if(props.data && props.data.user_has_access){
    //     if(!props.subject_has_access && !props.data.has_read){
    //         return <FreeBadge />
    //     }else 
    // }else{
    //     return <LockBadge premium_intrest_string={props.premium_intrest_string?props.premium_intrest_string:""} />
    // }
    if(props.data.user_has_access){
        if (props.data.has_read) {
            return <ReadBadge hide_badge={props.hide_badge} data={props.data} sentence="Cheers! You read it on " />
        } else {
            return <></>
        }
    }else{
        return <LockBadge hide_badge={props.hide_badge}/>
    }
    

}
export default NewsAccessBadge;