
import FreeBadge from "../badges/FreeBadge";
import LockBadge from "../badges/LockBadge";

const SubjectAceessBadges = (props) => {
    if(props.data && props.data.has_content){        
        return <></>        
    }else{
        
    return <LockBadge popUpType="SUBJECT_WILL_LIVE" additional={props.live_date ? props.live_date : ""} premium_intrest_string={props.premium_intrest_string ? props.premium_intrest_string : ""} />
    }
}
export default SubjectAceessBadges;