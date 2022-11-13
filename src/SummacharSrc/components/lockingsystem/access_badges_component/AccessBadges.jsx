import ActivityAccessBadge from "./ActivityAccessBadge";
import FreeQuizAccessBadge from "./FreeQuizAccessBadge";
import InfoTileAccessBadges from "./InfoTileAccessBadges"
import NewsAccessBadge from "./NewsAccessBadge";
import QuizAccessBadges from "./QuizAccessBadges";
import SubjectAceessBadges from "./SubjectAceessBadges";
import SubjectChapterAccessBadges from "./SubjectChapterAccessBadges";
// import SubjectAccessBadges from "./SubjectAccessBadges";
import VideoTileAccessBadges from "./VideoTileAccessBadges";

const AccessBadges = props => {

  switch (props.calledFrom ? props.calledFrom : '') {
    case "INFOGRAPHICS": return <InfoTileAccessBadges premium_intrest_string={props.premium_intrest_string ? props.premium_intrest_string : ""} subject_has_access={props.subject_has_access ? props.subject_has_access : false} data={props.data} />;
    case "NEWS": return <NewsAccessBadge hide_badge={props.hide_badge ? props.hide_badge : false} premium_intrest_string={props.premium_intrest_string ? props.premium_intrest_string : ""} subject_has_access={props.subject_has_access ? props.subject_has_access : false} data={props.data} />;
    case "ACTIVITY": return <ActivityAccessBadge category={props.category} not_stated={props.not_stated ? props.not_stated : false} has_ended={props.has_ended ? props.has_ended : false} premium_intrest_string={props.premium_intrest_string ? props.premium_intrest_string : ""} hide_lock={props.hide_lock} data={props.data} />;
    case "VIDEO": return <VideoTileAccessBadges premium_intrest_string={props.premium_intrest_string ? props.premium_intrest_string : ""} subject_has_access={props.subject_has_access ? props.subject_has_access : false} data={props.data} />;
    case "SUBJECT_CHAPTER": return <SubjectChapterAccessBadges premium_intrest_string={props.premium_intrest_string ? props.premium_intrest_string : ""} subject_has_access={props.subject_has_access ? props.subject_has_access : false} data={props.data} />;
    case "SUBJECT": return <SubjectAceessBadges live_date={props.live_date ? props.live_date : ""} premium_intrest_string={props.premium_intrest_string ? props.premium_intrest_string : ""} subject_has_access={props.subject_has_access ? props.subject_has_access : false} data={props.data} />;
    case "QUIZ": return <QuizAccessBadges is_free_badge_not_allowed={props.is_free_badge_not_allowed ? props.is_free_badge_not_allowed : false} premium_intrest_string={props.premium_intrest_string ? props.premium_intrest_string : ""} subject_has_access={props.subject_has_access ? props.subject_has_access : false} data={props.data} />
    case "FREE_QUIZ": return <FreeQuizAccessBadge is_free_badge_not_allowed={true} premium_intrest_string={props.premium_intrest_string ? props.premium_intrest_string : ""} subject_has_access={props.subject_has_access ? props.subject_has_access : false} data={props.data} />
    default: return <></>
  }
}
export default AccessBadges
