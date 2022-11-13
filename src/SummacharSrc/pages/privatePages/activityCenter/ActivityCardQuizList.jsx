import { isApp } from "../../../common/helper";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { setDateToAppFormat } from "../../../common/helper";
import "../../../assets/css/acadQuizList.css";
import { Store } from "../../../App";
import { useHistory, useParams, useRouteMatch } from "react-router";
import AccessBadges from "../../../components/lockingsystem/access_badges_component/AccessBadges";
import proxy from "../../../assets/images/quiz-proxy.png";

const ActivityCardQuizList = (Props) => {
    const data = Props.data;
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const user = useContext(Store).user.data;
    const params = useParams();
    const subject = params.subject;

    const onResize = () => {
        let height = window.innerHeight;
        let width = window.innerWidth;

        setWindowSize({ width: width, height: height });
    };
    useEffect(() => {
        onResize();
        window.addEventListener("resize", onResize);
        return () => {
            return window.removeEventListener("resize", onResize);
        };
    }, []);
    return (
        <div className="row p-relative  pointer info-tile" style={{ marginTop: "0px" }}>
            {!Props.noBadges && <AccessBadges
                premium_intrest_string={Props.is_free_Activity ? "academics/free/" + data.slug : "academics/" + subject + "/" + data.slug}
                calledFrom={Props.called_from ? Props.called_from : "QUIZ"}
                data={data}
                subject_has_access={user.subject_list && user.subject_list.indexOf(subject) !== -1}
            />}

            <div className="quiz-item-display-box row-center p-relative df row p-primary radius-primary" onClick={() => {
                Props.openPopUp(data.activity_type, data.slug, data.promo_image);
            }} >
                <div className="hover-tile radius-primary fit-content pointer" style={{ zIndex: 0 }} >

                </div>
                <img src={data.promo_image ?? proxy} className="quiz-item-img-box radius-primary" alt="" />
                <div className="df flex-1  column" style={{ justifyContent: "center" }}>
                    <span className="typo-headings df row font-bold" >{data.activity_name}</span>
                    {data.description && <p className="activity-description typo-Description df row txt-gray">{data.description}</p>}

                    {data.question_count && (
                        <p className="typo-Description df row txt-gray">
                            {/* {data.activity_type === "objective" ? "MCQ" : data.activity_type} &#183; {data.question_count}  Questions &#183;  {Math.floor(data.activity_duration/60)}min {(data.activity_duration%60)}s  */}
                            {data.question_count}  Questions &#183;  {Math.floor(data.activity_duration / 60)}min {(data.activity_duration % 60)}s

                        </p>

                    )}
                </div>
            </div>
        </div>
    );
};

export default ActivityCardQuizList;
