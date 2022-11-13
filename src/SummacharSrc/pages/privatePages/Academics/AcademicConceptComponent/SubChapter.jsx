import { useContext, useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router";
import { Store } from "../../../../App";
import AccessBadges from "../../../../components/lockingsystem/access_badges_component/AccessBadges";
import proxy from "../../../../assets/images/quiz-proxy.png";
import { Link } from "react-router-dom";
import "../../../../assets/css/SubChapter.css";
import { style } from "@mui/system";
import { keyframes } from "styled-components";
const SubChapter = (props) => {
    const user = useContext(Store).user.data;
    const info = props.data;
    const { path, url } = useRouteMatch()
    const params = useParams();
    const subject = params.subject;


    var percent = (info.story_read_count + info.video_watched_count) / (info.story_total_count + info.video_total_count) * 100;
    percent = Math.round(percent);
    if (isNaN(percent) || percent > 100 || percent < 0) {
        percent = "0%";
    } else {
        percent = percent + "%";
    }
    const [width, setWidth] = useState(0)
    const [showDelay, setshowDelay] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setWidth(percent)
        }, 500)
        setTimeout(() => {
            setshowDelay(false)
        }, 1000)
        
    }, [])

    // const percent = (info.story_read_count + video_watched_count)/ (video_total_count + read_total_count) * 100;
    // var progressAnimation = keyframes `
    //         0% {width: 0%;}
    //         50% {width: 50%;}
    //         100% {width: 100%;}
    // `;
    // let progresStyle = {
    //     Animation:`${progressAnimation} 2s linear infinite`,
    // } 

    return (
        <div className="row p-relative m-v-primary pointer subchapter-card info-tile" style={{ marginTop: "0px" }}>
            <AccessBadges
                premium_intrest_string={"academics/" + subject + "/" + info.chapter_name}
                calledFrom="SUBJECT_CHAPTER"
                data={info}
                subject_has_access={user.subject_list && user.subject_list.indexOf(subject) !== -1}

            />
           
            <Link to={url + "/" + info.chapter_name + '/' + info.sequence_no + "/concepts"} className="quiz-item-display-box row-center df row p-primary radius-primary" style={{ minHeight: "100px" }}>
                <img className="quiz-item-img-box radius-primary" src={info.cover_image ? info.cover_image : proxy} alt="" />
                <div className="df flex-1  column" style={{ justifyContent: "center" }}>
                    <div className="typo-headings df row font-bold">Chapter {info.sequence_no} <br /> {info.chapter_name}</div>
                    {(info.description) && <div className="typo-description txt-gray df row">{info.description}</div>}
                    <div className="progress" style={{
                        marginTop: 24
                    }}>
                        <div className="progress-bar" style={{ width: width, transition: "all 1s linear", backgroundColor: (percent == "100%") ? "#4DFEA0" : "" }}>

                        </div>
                    </div>
                    {percent == "100%" ?
                        <div className="progress-text" style={{ color: "#4DFEA0" }}>
                           {!showDelay && 'Well Done!'}
                        </div>
                        : percent == "0%" ?
                            <div className="progress-text">
                                Let's Begin!
                            </div>
                            :
                            <div className="progress-text">
                                {!showDelay && <>{percent} Completed</>}
                            </div>
                    }


                </div>
                <div to={url + "/" + info.chapter_name + '/' + info.sequence_no + "/concepts"} className="hover-tile hide-below-tablet radius-primary fit-content pointer" style={{ zIndex: 0 }} >

</div>
            </Link>
        </div>
    )
}
export default SubChapter;