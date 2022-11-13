import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { isApp, setDateToAppFormat } from "../../../common/helper"
import imgdemo from "../../../assets/images/quiz_card_cover_demo.png";
import AccessBadges from "../../../components/lockingsystem/access_badges_component/AccessBadges";

const ActivityCard = (Props) => {

    const data = Props.data
    const category = Props.category ? Props.category : ""
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })
    const start_time = new Date(Props.data.start_time).getTime()
    const end_time = new Date(Props.data.end_time).getTime()
    const current_time = new Date().getTime()
    const [has_ended, set_has_ended] = useState(end_time <= current_time)
    const [not_stated, set_not_stated] = useState(start_time >= current_time)


    useEffect(() => {
        const intervalRef = setInterval(() => {
            const current_intervaled_time = new Date().getTime()

            if (start_time <= current_intervaled_time && not_stated === true) {
                clearInterval(intervalRef)
                set_not_stated(false)
            }
            if (end_time <= current_intervaled_time && has_ended === false) {
                set_has_ended(true)
                clearInterval(intervalRef)
            }

        }, 1000);
        return () => {
            clearInterval(intervalRef)
        }
    }, [])
    const onResize = () => {
        let height = window.innerHeight;
        let width = window.innerWidth;

        setWindowSize({ width: width, height: height })

    }
    useEffect(() => {
        onResize();
        window.addEventListener('resize', onResize)
        return () => { return window.removeEventListener('resize', onResize) }
    }, [])
    const history = useHistory()
    // if (windowSize.width > 720) {
    //     return (
    //         <div className="activity_card df row-center p-relative"
    //         >
    //             {!data.user_has_access &&
    //                 <div style={{ position: "absolute", right: "15px", top: "-3px" }}>
    //                     <svg className="quiz_lock_content_svg" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                         <rect x="1" y="1" width="46" height="46" rx="23" fill="#5C56D4" />
    //                         <path d="M29 21V19C29 16.2 26.8 14 24 14C21.2 14 19 16.2 19 19V21C17.3 21 16 22.3 16 24V31C16 32.7 17.3 34 19 34H29C30.7 34 32 32.7 32 31V24C32 22.3 30.7 21 29 21ZM21 19C21 17.3 22.3 16 24 16C25.7 16 27 17.3 27 19V21H21V19Z" fill="white" />
    //                         <path d="M28 22H29C30.1477 22 31 22.8523 31 24V31C31 32.1477 30.1477 33 29 33H19C17.8523 33 17 32.1477 17 31V24C17 22.8523 17.8523 22 19 22H20H21H27H28Z" fill="white" stroke="white" strokeWidth="2" />
    //                         <rect x="1" y="1" width="46" height="46" rx="23" stroke="white" strokeWidth="2" />
    //                     </svg>
    //                 </div>
    //             }
    //             {data.promo_image && <div className="img_box">
    //                 <img src={data.promo_image ? data.promo_image : ""} alt="" />
    //             </div>}
    //             {!data.promo_image &&
    //                 //     <div className="activity_card_title df center bg-primary" style={{ backgroundColor: "#E7E6F9" }}>
    //                 //     <div className="txt-white txt-large" style={{ color: "#777777", margin: "10px 20px 10px 20px", }}>{data.activity_name}</div>
    //                 // </div>
    //                 <img src={imgdemo} className="radius-primary" alt="" />
    //             }

    //             {data.user_has_access && data.activity_type == "subjective" && !data.has_attempted &&
    //                 <button

    //                     style={{
    //                         background: (!data.user_has_access) ? '#B8B8B9' : "5C56D4",
    //                         borderColor: (!data.user_has_access) ? '#B8B8B9' : "5C56D4",
    //                         width: "100%",
    //                         marginTop: "10px"
    //                     }}

    //                     onClick={not_stated ? () => { } :() => { Props.openPopUp("subjective", data.slug, data.promo_image) }} className="btn-primary row btn txt-large">
    //                     Participate
    //                     <AccessBadges category={category} premium_intrest_string={"Knowledge/Activities/" + category + "/" + data.slug} calledFrom="ACTIVITY" not_stated={not_stated} has_ended={has_ended} hide_lock={true} data={data} />
    //                 </button>
    //             }
    //             {data.user_has_access && data.activity_type == "objective" && !data.has_attempted &&
    //                 <button style={{
    //                     background: (!data.user_has_access) ? '#B8B8B9' : "5C56D4",
    //                     borderColor: (!data.user_has_access) ? '#B8B8B9' : "5C56D4",
    //                     width: "100%",
    //                     marginTop: "10px"
    //                 }}
    //                     onClick={not_stated ? () => { } : () => { Props.openPopUp("objective", data.slug, data.promo_image) }} className="btn-primary row btn txt-large">
    //                     Play Now
    //                     <AccessBadges category={category} premium_intrest_string={"Knowledge/Activities/" + category + "/" + data.slug} calledFrom="ACTIVITY" not_stated={not_stated} has_ended={has_ended} hide_lock={true} data={data} />
    //                 </button>
    //             }
    //             {data.user_has_access && data.has_attempted &&
    //                 <Link to={"/activity/" + data.slug} className="btn-primary df center row btn txt-large">
    //                     View Answers
    //                 </Link>
    //             }
    //             {
    //                 !data.user_has_access && data.activity_type == "objective" && !data.has_attempted &&
    //                 <button

    //                     style={{
    //                         background: (!data.user_has_access) ? '#B8B8B9' : "5C56D4",
    //                         borderColor: (!data.user_has_access) ? '#B8B8B9' : "5C56D4",
    //                         width: "100%",
    //                         marginTop: "10px"
    //                     }}
    //                     className="btn-primary p-relative row btn txt-large">
    //                     Play Now

    //                     <AccessBadges category={category} premium_intrest_string={"Knowledge/Activities/" + category + "/" + data.slug} calledFrom="ACTIVITY" not_stated={not_stated} has_ended={has_ended} hide_lock={true} data={data} />
    //                 </button>
    //             }
    //             {!data.user_has_access && data.activity_type == "subjective" && !data.has_attempted &&
    //                 <button style={{
    //                     background: (!data.user_has_access) ? '#B8B8B9' : "5C56D4",
    //                     borderColor: (!data.user_has_access) ? '#B8B8B9' : "5C56D4",
    //                     width: "100%",
    //                     marginTop: "10px"
    //                 }}
    //                     className="btn-primary row btn txt-large p-relative">
    //                     Participate
    //                     <AccessBadges category={category} premium_intrest_string={"Knowledge/Activities/" + category + "/" + data.slug} calledFrom="ACTIVITY" not_stated={not_stated} has_ended={has_ended} hide_lock={true} data={data} />
    //                 </button>
    //             }
    //             {
    //                 !data.user_has_access && data.has_attempted &&
    //                 <button style={{
    //                     background: (!data.user_has_access) ? '#B8B8B9' : "5C56D4",
    //                     borderColor: (!data.user_has_access) ? '#B8B8B9' : "5C56D4",
    //                     width: "100%",
    //                     marginTop: "10px"
    //                 }}
    //                     className="btn-primary p-relative row btn txt-large">
    //                     View Answer
    //                     <AccessBadges category={category} premium_intrest_string={"Knowledge/Activities/" + category + "/" + data.slug} calledFrom="ACTIVITY" not_stated={not_stated} has_ended={has_ended} hide_lock={true} data={data} />
    //                 </button>
    //             }

    //         </div>
    //     )
    // } else {
    return (
        <div className="row pointer df radius-primary row-center relative">
            <div className="df fit-content info-tile hover-zoom   column row-center p-relative">
                <div className="row df p-relative">
                    <div className="block-container df column center" style={{ justifyContent: "flex-end", zIndex: 0 }}>


                        {!data.has_attempted ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" style={{ marginBottom: "10px" }} viewBox="0 0 32 32" fill="none">
                                <rect width="32" height="32" rx="16" fill="white" />
                                <g filter="url(#filter0_d_2636_22512)">
                                    <path d="M23.2 14.6143C24.2666 15.2301 24.2666 16.7697 23.2 17.3855L13.6 22.9281C12.5333 23.5439 11.2 22.7741 11.2 21.5425L11.2 10.4573C11.2 9.22566 12.5333 8.45586 13.6 9.0717L23.2 14.6143Z" fill="#5C56D4" />
                                </g>
                                <defs>
                                    <filter id="filter0_d_2636_22512" x="3.19995" y="0.85498" width="28.8" height="30.2898" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset />
                                        <feGaussianBlur stdDeviation="4" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.360784 0 0 0 0 0.337255 0 0 0 0 0.831373 0 0 0 0.4 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2636_22512" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2636_22512" result="shape" />
                                    </filter>
                                </defs>
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: "10px" }} width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <rect width="32" height="32" rx="16" fill="white" />
                                <path d="M22.71 11.2099C22.617 11.1161 22.5064 11.0417 22.3845 10.991C22.2627 10.9402 22.132 10.9141 22 10.9141C21.8679 10.9141 21.7372 10.9402 21.6154 10.991C21.4935 11.0417 21.3829 11.1161 21.29 11.2099L13.84 18.6699L10.71 15.5299C10.6134 15.4366 10.4995 15.3633 10.3746 15.3141C10.2498 15.2649 10.1165 15.2408 9.98227 15.2431C9.84809 15.2454 9.71568 15.2741 9.5926 15.3276C9.46953 15.3811 9.35819 15.4583 9.26495 15.5549C9.17171 15.6514 9.0984 15.7653 9.04919 15.8902C8.99999 16.015 8.97586 16.1484 8.97818 16.2825C8.9805 16.4167 9.00923 16.5491 9.06272 16.6722C9.11622 16.7953 9.19343 16.9066 9.28995 16.9999L13.13 20.8399C13.2229 20.9336 13.3335 21.008 13.4554 21.0588C13.5772 21.1095 13.7079 21.1357 13.84 21.1357C13.972 21.1357 14.1027 21.1095 14.2245 21.0588C14.3464 21.008 14.457 20.9336 14.55 20.8399L22.71 12.6799C22.8115 12.5862 22.8925 12.4726 22.9479 12.3461C23.0033 12.2196 23.0319 12.083 23.0319 11.9449C23.0319 11.8068 23.0033 11.6702 22.9479 11.5437C22.8925 11.4172 22.8115 11.3035 22.71 11.2099V11.2099Z" fill="#5C56D4" />
                            </svg>
                        }
                    </div>

                    <img className=" df row radius-primary" src={data.promo_image ? data.promo_image : ""} alt="" />
                </div>
                {
                    <AccessBadges category={category} premium_intrest_string={"Knowledge/Activities/" + category + "/" + data.slug +"/inquiry_from_popup"} calledFrom="ACTIVITY" not_stated={not_stated} has_ended={has_ended} data={data} />
                }
                <div className="hover-tile radius-primary fit-content pointer" onClick={() => {
                    if (data.has_attempted) {
                        history.push("/activity/" + data.slug)
                    } else {
                        if (data.activity_type == "objective") {
                            Props.openPopUp("objective", data.slug, data.promo_image)
                        } else {
                            Props.openPopUp("subjective", data.slug, data.promo_image)
                        }
                    }

                }} style={{ zIndex: 0 }}>

                </div>
                <div style={{ zIndex: 0 }} className="df fit-content space-between activity-card-small column row-center relative"
                    onClick={() => {
                        if (data.has_attempted) {
                            history.push("/activity/" + data.slug)
                        } else {
                            if (data.activity_type == "objective") {
                                Props.openPopUp("objective", data.slug, data.promo_image)
                            } else {
                                Props.openPopUp("subjective", data.slug, data.promo_image)
                            }
                        }

                    }}
                ></div>
            </div>
        </div>
    )
    // }

}
export default ActivityCard;