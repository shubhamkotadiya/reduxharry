import React, { useState } from "react";
import { useContext } from "react";
import { isApp, premiumInt } from "../../../common/helper";
import { Store } from '../../../App'
import { Grid } from "@mui/material";
import GridConfig from "../../../common/GridConfig";
import VideoTile from "./AcademicConceptComponent/VideoTile";
import InfoTile from "./AcademicConceptComponent/InfoTile";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import AcademicsVideoPopUp from "./AcademicsVideoPopUp";
import AcadInfoPopUpController from "../../../controllers/AcadInfoPopUpController";
import ActivityCardQuizList from "../activityCenter/ActivityCardQuizList";
import PremiumPopUp from "../../../components/premiumPop"
import apiUrl, { mode } from "../../../common/apiUrl";
import { LockingSystemContext } from "../../../components/lockingsystem/LockingSysytemPopUp";
import AccessBadges from "../../../components/lockingsystem/access_badges_component/AccessBadges";
import '../../../assets/css/enquirenow.css'

const AcademicStatic = () => {
    const user = useContext(Store).user;

    let [isVisible, changeVisibility] = useState(false);
    let [popupContent, setContent] = useState('');
    const lockSystem = useContext(LockingSystemContext)


    const gridItem = mode === "development" ? [
        {
            "uuid": "009a4390-3f3b-46c5-8bcf-d5a7b43a8420",
            "slug": "how-to-present-data-in-economics-1638965448",
            "title": "Introducing Early Societies",
            "thumbnail": "https://summachar-school-backend-test.s3.amazonaws.com/video_thumbnails/1.1_8VQS08z.jpg",
            "vdoci_video_id": "b0b74bbe565143b1a77c75985e4573a5",
            "academic_subjects": [
                "85a60134-41c0-41a0-a3d3-d3f7d97ee62d"
            ],
            "chapters": [
                "d308c0cd-aef1-4a1b-934c-30b16fccce27"
            ],
            "subchapters": [
                "5dbd9102-1173-4f0b-bdfe-1229cf23ba0b"
            ],
            "board": "e50d79f5-8352-423a-bb30-81d2de72583c",
            "vdoci_otp": "20160313versASE323VjByB1N3dC0kQKhCEBi96u3br9oXR53ovFBuTlN1Jtah9J",
            "vdoci_pl_info": "eyJ2aWRlb0lkIjoiYjBiNzRiYmU1NjUxNDNiMWE3N2M3NTk4NWU0NTczYTUifQ==",
            "vdoci_ttl": 31536000,
            "vdoci_expired_dt": "2022-12-19T14:16:59.688277+05:30",
            "status": "Published",
            "video_length": 81,
            "user_has_access": true,
            "watch_count": 4,
            "type": "video",
            "has_watched": false,
            "progress_seconds": 0
        }
        ,
        {
            "uuid": "8cb7c9e9-63f5-4e12-8f12-3e7fb6fc6347",
            "headline": "Introducing Early Societies",
            "slug": "biological-basis-of-behaviour-1633871580",
            "status": "published",
            "summary": "A brief overview of the early developments of humans - from primates to tool-wielding hunter gatherers to the first agricultural societies",
            "priority": 1,
            "published_date": "2021-10-04T17:00:00+05:30",
            "external_link": null,
            "categories": {},
            "has_bookmarked": false,
            "grade_range": "{\"bounds\": \"[)\", \"lower\": \"11\", \"upper\": \"12\"}",
            "slides": [{
                "uuid": "5c4fa285-8986-4277-8cfb-c6dff0bbe836",
                "title": "Introducing Early Societies-0",
                "media": "https://summachar-school-backend-test.s3.amazonaws.com/media/story/1_GM9m0_JCxJODxOic5lFbN9RicqmmYp7_01.webp",
                "categories": {},
                "grade_range": "{\"bounds\": \"()\", \"lower\": null, \"upper\": null}",
                "slide_type": "Media"
            }],
            "has_read": false,
            "user_has_access": true,
            "tag_names": [
                "Human evolution",
                "Africa",
                "Agriculture",
                "Settlements"
            ],
            "type": "story"
        },
        {
            "uuid": "03e6510f-d91e-49fe-b4d6-511f877a785f",
            "headline": "Hominids",
            "slug": "types-of-winds-1633784520",
            "status": "published",
            "summary": "Who were the pre-cursors to modern humans?",
            "priority": 1,
            "published_date": "2021-10-04T16:50:00+05:30",
            "external_link": null,
            "categories": {},
            "has_bookmarked": false,
            "grade_range": "{\"bounds\": \"[)\", \"lower\": \"11\", \"upper\": \"12\"}",
            "slides": [{
                "uuid": "86199df8-3bc6-45d8-a754-043b7a06677e",
                "title": "Hominids-0",
                "media": "https://summachar-school-backend-test.s3.amazonaws.com/media/story/1MrnHSAw-GsOmLiCZ9fhUZ1Ww9yv48Jb8_01.webp",
                "categories": {},
                "grade_range": "{\"bounds\": \"()\", \"lower\": null, \"upper\": null}",
                "slide_type": "Media"
            },],
            "has_read": false,
            "user_has_access": false,
            "type": "story",
            "tag_names": [
                "Hominids",
                "Australopithecus",
                "Homo Erectus",
                "Homo Sapiens",
                "Neanderthals"
            ]
        },
        {
            "uuid": "03e6510f-d91e-49fe-b4d6-511f877a785f",
            "headline": "Hominids",
            "type": "story",
            "slug": "hominids-1633346400",
            "status": "published",
            "summary": "Who were the pre-cursors to modern humans?",
            "priority": 1,
            "published_date": "2021-10-04T16:50:00+05:30",
            "external_link": null,
            "categories": {},
            "has_bookmarked": false,
            "grade_range": "{\"bounds\": \"[)\", \"lower\": \"11\", \"upper\": \"12\"}",
            "slides": [
                {
                    "uuid": "86199df8-3bc6-45d8-a754-043b7a06677e",
                    "title": "Hominids-0",
                    "media": "https://summachar-school-backend-test.s3.amazonaws.com/media/story/Hominids-0_tkZcMlV.jpg",
                    "categories": {},
                    "grade_range": "{\"bounds\": \"()\", \"lower\": null, \"upper\": null}",
                    "slide_type": "Media"
                }
            ],
            "has_read": false,
            "user_has_access": false,
            "tag_names": [
                "Hominids",
                "Australopithecus",
                "Homo Erectus",
                "Homo Sapiens",
                "Neanderthals"
            ]
        },


    ] :
        [
            {
                "uuid": "009a4390-3f3b-46c5-8bcf-d5a7b43a8420",
                "slug": "how-to-present-data-in-economics-1638965448",
                "title": "Introducing Early Societies",
                "thumbnail": "https://summachar-school-backend-test.s3.amazonaws.com/video_thumbnails/1.1_8VQS08z.jpg",
                "vdoci_video_id": "b0b74bbe565143b1a77c75985e4573a5",
                "academic_subjects": [
                    "85a60134-41c0-41a0-a3d3-d3f7d97ee62d"
                ],
                "chapters": [
                    "d308c0cd-aef1-4a1b-934c-30b16fccce27"
                ],
                "subchapters": [
                    "5dbd9102-1173-4f0b-bdfe-1229cf23ba0b"
                ],
                "board": "e50d79f5-8352-423a-bb30-81d2de72583c",
                "vdoci_otp": "20160313versASE323VjByB1N3dC0kQKhCEBi96u3br9oXR53ovFBuTlN1Jtah9J",
                "vdoci_pl_info": "eyJ2aWRlb0lkIjoiYjBiNzRiYmU1NjUxNDNiMWE3N2M3NTk4NWU0NTczYTUifQ==",
                "vdoci_ttl": 31536000,
                "vdoci_expired_dt": "2022-12-19T14:16:59.688277+05:30",
                "status": "Published",
                "video_length": 81,
                "user_has_access": true,
                "watch_count": 4,
                "type": "video",
                "has_watched": false,
                "progress_seconds": 0
            }
            ,
            {
                "uuid": "8cb7c9e9-63f5-4e12-8f12-3e7fb6fc6347",
                "headline": "Introducing Early Societies",
                "slug": "biological-basis-of-behaviour-1633871580",
                "status": "published",
                "summary": "A brief overview of the early developments of humans - from primates to tool-wielding hunter gatherers to the first agricultural societies",
                "priority": 1,
                "published_date": "2021-10-04T17:00:00+05:30",
                "external_link": null,
                "categories": {},
                "has_bookmarked": false,
                "grade_range": "{\"bounds\": \"[)\", \"lower\": \"11\", \"upper\": \"12\"}",
                "slides": [{
                    "uuid": "5c4fa285-8986-4277-8cfb-c6dff0bbe836",
                    "title": "Introducing Early Societies-0",
                    "media": "https://summachar-school-backend-test.s3.amazonaws.com/media/story/1_GM9m0_JCxJODxOic5lFbN9RicqmmYp7_01.webp",
                    "categories": {},
                    "grade_range": "{\"bounds\": \"()\", \"lower\": null, \"upper\": null}",
                    "slide_type": "Media"
                }],
                "has_read": false,
                "user_has_access": true,
                "tag_names": [
                    "Human evolution",
                    "Africa",
                    "Agriculture",
                    "Settlements"
                ],
                "type": "story"
            },
            {
                "uuid": "03e6510f-d91e-49fe-b4d6-511f877a785f",
                "headline": "Hominids",
                "slug": "types-of-winds-1633784520",
                "status": "published",
                "summary": "Who were the pre-cursors to modern humans?",
                "priority": 1,
                "published_date": "2021-10-04T16:50:00+05:30",
                "external_link": null,
                "categories": {},
                "has_bookmarked": false,
                "grade_range": "{\"bounds\": \"[)\", \"lower\": \"11\", \"upper\": \"12\"}",
                "slides": [{
                    "uuid": "86199df8-3bc6-45d8-a754-043b7a06677e",
                    "title": "Hominids-0",
                    "media": "https://summachar-school-backend-test.s3.amazonaws.com/media/story/1MrnHSAw-GsOmLiCZ9fhUZ1Ww9yv48Jb8_01.webp",
                    "categories": {},
                    "grade_range": "{\"bounds\": \"()\", \"lower\": null, \"upper\": null}",
                    "slide_type": "Media"
                },],
                "has_read": false,
                "user_has_access": false,
                "type": "story",
                "tag_names": [
                    "Hominids",
                    "Australopithecus",
                    "Homo Erectus",
                    "Homo Sapiens",
                    "Neanderthals"
                ]
            },
            {
                "uuid": "03e6510f-d91e-49fe-b4d6-511f877a785f",
                "headline": "Hominids",
                "type": "story",
                "slug": "hominids-1633346400",
                "status": "published",
                "summary": "Who were the pre-cursors to modern humans?",
                "priority": 1,
                "published_date": "2021-10-04T16:50:00+05:30",
                "external_link": null,
                "categories": {},
                "has_bookmarked": false,
                "grade_range": "{\"bounds\": \"[)\", \"lower\": \"11\", \"upper\": \"12\"}",
                "slides": [
                    {
                        "uuid": "86199df8-3bc6-45d8-a754-043b7a06677e",
                        "title": "Hominids-0",
                        "media": "https://summachar-school-backend-test.s3.amazonaws.com/media/story/Hominids-0_tkZcMlV.jpg",
                        "categories": {},
                        "grade_range": "{\"bounds\": \"()\", \"lower\": null, \"upper\": null}",
                        "slide_type": "Media"
                    }
                ],
                "has_read": false,
                "user_has_access": false,
                "tag_names": [
                    "Hominids",
                    "Australopithecus",
                    "Homo Erectus",
                    "Homo Sapiens",
                    "Neanderthals"
                ]
            },


        ]

    const freeQuizList = mode === "development" ?
        [
            {
                "uuid": "76deb8c0-9acc-4650-8b26-7955fee0ca72",
                activity_duration:150,
                "activity_name": "Introduction to Political Theory II",
                "slug": "introduction-to-political-theory-ii-1633512763",
                "promo_image": "https://summachar-school-backend-test.s3.amazonaws.com/media/quiz/promo/CBSE_PolSci_11_Quiz_Covers.png",
                "description": "Test your knowledge on putting political theory to practice.",
                "start_time": "2021-12-18T15:02:43+05:30",
                "end_time": "2022-10-09T15:00:43+05:30",
                "categories": {},
                "activity_type": "objective",
                "activity_status": "published",
                "has_attempted": false,
                "submit_count": 0,
                "academic_subjects": [
                    "3f84943e-e68e-464b-b55f-2c672cc72686"
                ],
                "chapters": [
                    "391b36e8-609f-47c3-8b54-b514c565926d"
                ],
                "subchapters": [
                    "5d0fdda5-37ac-44cc-aebf-d8b782c78613"
                ],
                "tags": [
                    "a41cf524-e156-4202-bbc7-c07ed05b93a4",
                    "f6d23edc-c562-4958-a082-8dd68e621deb",
                    "f8aba089-0271-42f1-b2be-8c3ee73bc29d"
                ],
                "user_has_access": true,
                "question_count": 5
            },
            {
                "uuid": "f90d9d0e-72c0-4413-8b9d-91d2c4891c97",
                activity_duration:150,
                "activity_name": "Sociology and Society IV",
                "slug": "sociology-and-society-iv-1633426423",
                "promo_image": "https://summachar-school-backend-test.s3.amazonaws.com/media/quiz/promo/CBSE_Sociology_11_Quiz_Covers.png",
                "description": "Test your knowledge on the intellectual ideas and material issues that went into the making of sociology.",
                "start_time": "2021-12-18T15:03:43+05:30",
                "end_time": "2022-10-09T15:00:43+05:30",
                "categories": {},
                "activity_type": "objective",
                "activity_status": "published",
                "has_attempted": false,
                "submit_count": 0,
                "academic_subjects": [
                    "69a0f010-52ff-4698-b5ef-510205eb5f73"
                ],
                "chapters": [
                    "b47e52cc-dae3-4599-93b3-3429d02f9988"
                ],
                "subchapters": [
                    "5c044c5f-1dd0-4229-8969-fec4c8504dcd"
                ],
                "tags": [
                    "0bfe8025-6458-4272-a3cf-25a486af2b12",
                    "62e8cb9e-48e4-4696-ac27-e596ba286579",
                    "8c62337d-6eee-4209-85ec-e4e51f6e9572",
                    "b58346dc-ff2b-434c-bb6b-3ebe6b26201f",
                    "c40c8db5-0c41-4b06-ae5e-c6f7dbc36b36",
                    "f3390b90-eafa-4677-8fe6-a234374f671f"
                ],
                "user_has_access": true,
                "question_count": 5
            }
        ] :
        [
            {
                "uuid": "76deb8c0-9acc-4650-8b26-7955fee0ca72",
                activity_duration:150,
                "activity_name": "Introduction to Political Theory II",
                "slug": "introduction-to-political-theory-ii-1633512763",
                "promo_image": "https://summachar-school-backend-test.s3.amazonaws.com/media/quiz/promo/CBSE_PolSci_11_Quiz_Covers.png",
                "description": "Test your knowledge on putting political theory to practice.",
                "start_time": "2021-12-18T15:02:43+05:30",
                "end_time": "2022-10-09T15:00:43+05:30",
                "categories": {},
                "activity_type": "objective",
                "activity_status": "published",
                "has_attempted": false,
                "submit_count": 0,
                "academic_subjects": [
                    "3f84943e-e68e-464b-b55f-2c672cc72686"
                ],
                "chapters": [
                    "391b36e8-609f-47c3-8b54-b514c565926d"
                ],
                "subchapters": [
                    "5d0fdda5-37ac-44cc-aebf-d8b782c78613"
                ],
                "tags": [
                    "a41cf524-e156-4202-bbc7-c07ed05b93a4",
                    "f6d23edc-c562-4958-a082-8dd68e621deb",
                    "f8aba089-0271-42f1-b2be-8c3ee73bc29d"
                ],
                "user_has_access": true,
                "question_count": 5
            },
            {
                "uuid": "f90d9d0e-72c0-4413-8b9d-91d2c4891c97",
                activity_duration:150,
                "activity_name": "Sociology and Society IV",
                "slug": "sociology-and-society-iv-1633426423",
                "promo_image": "https://summachar-school-backend-test.s3.amazonaws.com/media/quiz/promo/CBSE_Sociology_11_Quiz_Covers.png",
                "description": "Test your knowledge on the intellectual ideas and material issues that went into the making of sociology.",
                "start_time": "2021-12-18T15:03:43+05:30",
                "end_time": "2022-10-09T15:00:43+05:30",
                "categories": {},
                "activity_type": "objective",
                "activity_status": "published",
                "has_attempted": false,
                "submit_count": 0,
                "academic_subjects": [
                    "69a0f010-52ff-4698-b5ef-510205eb5f73"
                ],
                "chapters": [
                    "b47e52cc-dae3-4599-93b3-3429d02f9988"
                ],
                "subchapters": [
                    "5c044c5f-1dd0-4229-8969-fec4c8504dcd"
                ],
                "tags": [
                    "0bfe8025-6458-4272-a3cf-25a486af2b12",
                    "62e8cb9e-48e4-4696-ac27-e596ba286579",
                    "8c62337d-6eee-4209-85ec-e4e51f6e9572",
                    "b58346dc-ff2b-434c-bb6b-3ebe6b26201f",
                    "c40c8db5-0c41-4b06-ae5e-c6f7dbc36b36",
                    "f3390b90-eafa-4677-8fe6-a234374f671f"
                ],
                "user_has_access": true,
                "question_count": 5
            }
        ]
    let [isEnquire, changeEnquire] = useState(false);
    const [desc, changeDesc] = useState("");
    const setPopUp = (data) => {
        premiumInt("/inquiry");
        lockSystem.openPopUp("ENQ_ACAD", "");

        if (isApp()) {
            setContent("This content is for our premium users");
        }
        else {
            setContent("This content is for our premium users. You may contact us on +91 9880678169 or namaskar@summachar.in")
        }
    }

    const setInfoPopUp = (data) => {
        premiumInt("academics");
        lockSystem.openPopUp("ENQ_ACAD", "");


    };
    const { path, url } = useRouteMatch();
    const history = useHistory()
    const openPopUp = (data) => {

        history.push(url + "/story/" + data.slug)
    }
    const openVideoPopUp = (data) => {
        history.push(url + "/videos/" + data.slug)
    }
    return (
        <>
            <Switch>

                <Route exact path={url + "/story/:slug"}>
                    <AcadInfoPopUpController />
                </Route>
                <Route exact path={url + "/videos/:slug"}>
                    {isApp() ? (
                        <></>
                    ) : (
                        <AcademicsVideoPopUp
                            data={{}}
                            closePopUp={() => {
                                history.goBack();
                            }}
                        />
                    )}
                </Route>
                <Route exact path={path}>
                    {isVisible && <PremiumPopUp changeVisibility={changeVisibility} description={popupContent}> </PremiumPopUp>}

                    <div
                        className='wrapper_container enter_animation subMain_container news_container'
                        id='news_container'
                    >
                        <div className='common-grid-outer'>
                            <div className="centered_outer_container p-h-secondary">
                                <div className="df row column">
                                    <p className="df row typo-sub-headings  m-v-primary" style={{ color: "#000", marginTop: "0px" }}>Pathshala also provides academic content in beautiful infographics and short videos to help students learn any concept in 2 minutes. Perfect for last minute revision! Currently we cover 11th and 12th standard Arts stream courses. Contact us to know more.
</p>
                                    { <button className="golden-btn p-relative shimmer" onClick={() => { }}><AccessBadges premium_intrest_string={"/academics/inquiry_from_popup"} calledFrom="ACTIVITY" hide_lock={true} data={{user_has_access:false}} /> Enquire&nbsp;Now</button>}
                                    {/* {isApp() && <button className="golden-btn shimmer" onClick={() => premiumInt("/inquiry_from_popup")}><a href="/tel:+919880678169" style={{ color: "#18181B" }}> Enquire&nbsp;Now</a></button>} */}
                                </div>
                                <div className="title-div m-v-primary" style={{ marginBottom: "0px", marginTop: user.data.user_type === "FREE_USER" ? 0 : 32 + "px !important" }}  >
                                    <div className="title heading-text"  ><b>Sample Concepts</b></div>
                                </div>
                                <div className="df flex-1 " >
                                    <Grid className="row grid-top-padding" container spacing={3}>


                                        {gridItem.map((data, index) => {
                                            if (data.type === "video") {
                                                return <VideoTile noBadges={true} setPopUp={setInfoPopUp} openPopUp={openVideoPopUp} path={path} url={url} data={data} key={index} />;
                                            } else if (data.type === "story") {
                                                return <InfoTile noBadges={true} setPopUp={setInfoPopUp} openPopUp={openPopUp} path={path} url={url} data={data} key={index} />;
                                            }
                                        })}

                                    </Grid>
                                </div>
                                <div className="quiz-list-grid df row" style={{ flexWrap: "wrap", position: "relative" }}>
                                    <div className="title-div m-v-primary row " style={{ marginBottom: "0px" }} >
                                        <div className="title heading-text"  ><b>Sample Question Banks</b></div>
                                    </div>
                                    {
                                        freeQuizList.map((data, index) => {
                                            return (

                                                <ActivityCardQuizList hide_attempt_quiz={true} noBadges={true} openPopUp={(type, slug, img) => { history.push("/activity/" + slug) }} called_from="FREE_QUIZ" key={index} is_free_Activity={true} data={data} />
                                            )
                                        })}
                                </div>
                            </div>

                        </div>


                    </div>
                </Route>
            </Switch>
        </>
    )
}
export default AcademicStatic;