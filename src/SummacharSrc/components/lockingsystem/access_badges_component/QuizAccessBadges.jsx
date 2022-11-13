import FreeBadge from "../badges/FreeBadge";
import LockBadge from "../badges/LockBadge";
import ReadBadge from "../badges/ReadBadge";

const QuizAccessBadges = (props) => {
    if(props.data && props.data.user_has_access){
        if(!props.subject_has_access && !props.is_free_badge_not_allowed && !props.data.has_attempted){
            return <FreeBadge />
        }if(props.data.has_attempted){
            return <ReadBadge data={props.data} sentence="Yay! You attempted it on "/>
        }else{            
            return <></>
        }

        
    }else{
        return <LockBadge premium_intrest_string={props.premium_intrest_string?props.premium_intrest_string:""} />
    }
    
}
export default QuizAccessBadges;