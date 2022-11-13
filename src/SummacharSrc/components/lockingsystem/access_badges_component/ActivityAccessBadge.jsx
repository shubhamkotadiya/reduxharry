import LockBadge from "../badges/LockBadge"

const ActivityAccessBadge = (props) => {

    if (props.data.user_has_access) {

        if (props.has_ended && props.category === "live") {

            return <LockBadge hide_lock={true} popUpType={"QUIZ_ENDED"} additional={props.data.start_time} premium_intrest_string={""} />
        } else if (props.not_stated && props.category === "Upcoming") {
            return <LockBadge hide_lock={true} popUpType={"NOT_STARTED_QUIZ"} additional={props.data.start_time} premium_intrest_string={""} />

        } else {

            return (
                <>

                </>
            )
        }

    } else {
        return <LockBadge hide_lock={props.hide_lock ? props.hide_lock : false} premium_intrest_string={props.premium_intrest_string ? props.premium_intrest_string : ""} />
    }

}
export default ActivityAccessBadge