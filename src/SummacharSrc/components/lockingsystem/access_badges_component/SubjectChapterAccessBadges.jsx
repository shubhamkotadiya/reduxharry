import FreeBadge from "../badges/FreeBadge";
import LockBadge from "../badges/LockBadge";

const SubjectChapterAccessBadges = (props) => {
    if (props.data && props.data.has_content && props.data.user_has_access) {
        // if(!props.subject_has_access){
        // return <FreeBadge />
        // }else{
        return <></>
        // }        

    } else {
        return <LockBadge premium_intrest_string={props.premium_intrest_string ? props.premium_intrest_string : ""} popUpType={props.subject_has_access ? "SUBJECT_CHAPTER_WILL_LIVE" : ""} />
    }
}
export default SubjectChapterAccessBadges;