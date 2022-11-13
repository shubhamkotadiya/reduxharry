import FreeBadge from "../badges/FreeBadge";
import LockBadge from "../badges/LockBadge";
import ReadBadge from "../badges/ReadBadge";

const InfoTileAccessBadges = (props) => {
    if(props.data && props.data.user_has_access){
        if(!props.subject_has_access && !props.data.has_read){
            return <FreeBadge />
        }else if( props.data.has_read){
            return <ReadBadge data={props.data} sentence="Hooray! You read it on "/>
        }else{            
            return <></>
        }
    }else{
        return <LockBadge premium_intrest_string={props.premium_intrest_string?props.premium_intrest_string:""} />
    }
    
}
export default InfoTileAccessBadges;