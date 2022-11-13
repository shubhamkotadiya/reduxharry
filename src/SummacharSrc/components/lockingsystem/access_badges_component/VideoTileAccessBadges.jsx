import FreeBadge from "../badges/FreeBadge";
import LockBadge from "../badges/LockBadge";
import ReadBadge from "../badges/ReadBadge";
const VideoTileAccessBadges = (props) => {
    if(props.data && props.data.user_has_access){
        if(!props.subject_has_access && !props.data.has_watched){
            return <FreeBadge />
        }else if( props.data.has_watched){
            return <ReadBadge data={props.data} sentence="Hooray! You watched it on "/>
        }else{            
            return <></>
        }
    }else{
        return <LockBadge premium_intrest_string={props.premium_intrest_string?props.premium_intrest_string:""} />
    }
}
export default VideoTileAccessBadges;