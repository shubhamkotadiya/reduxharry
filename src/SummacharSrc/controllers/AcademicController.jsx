import React, { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";
import { BreadCrumbContext, Store } from "../App";

import AcadVideoController from "../controllers/AcadVideoController";
import AcadInfoController from "./AcadSubChapteController";


import AcadTestController from "../controllers/AcadTestController";

import { Route, Switch, useParams, useRouteMatch } from "react-router";
import { Link, useLocation } from "react-router-dom";

import { useHistory } from "react-router";
import PageNotFound from "../pages/errors/PageNotFound";
import AcademicConceptController from "./AcademicConceptController";
import useAcdemicConcept from "../customHooks/useAcdemicConcept";
import AcademicConceptReducer from "../reducers/AcademicConceptReducer";
import AcademicSubChapterReducer from "../reducers/AcademicSubChapterReducer";
import useAcademicSubChapterList from "../customHooks/useAcademicSubChapterList";
import RevisionController from "./acad/RevisionController";
import AcademicRevisionReducer from "../reducers/AcademicRevisionReducer";
import useAcademicRevision from "../customHooks/useAcademicRevision";
import AcdemicQNAReducer from "../reducers/AcdemicQNAReducer";
import useAcademicQNA from "../customHooks/useAcademicQNA";
import QNAController from "./acad/QNAController";

export const AcademicContext = createContext();
export const AcademicSubChapterContext = createContext();
export const AcademicRevisionContext = createContext();
export const AcademicQNAContext = createContext();

const AcademicController = () => {
    const subject = useContext(Store).subject;
    const location = useLocation();
    const [subjectStatus, setSubjectStatus] = useState({ user_has_access: false, has_content: false });
    let { path, url } = useRouteMatch();
    const params = useParams();
    const [breadCrumb, setBreadCrumb] = useState([]);
    const history = useHistory();
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    const [AcadmicConceptDataState, dispatchAcdemicConceptDataState] = useReducer(AcademicConceptReducer, { data: {}, next: {} });
    const [AcadmicSubChapterDataState, dispatchAcadmicSubChapterDataState] = useReducer(AcademicSubChapterReducer, { data: {}, next: {} });
    const [AcadmicRevisionDataState, dispatchAcadmicRevisionDataState] = useReducer(AcademicRevisionReducer, { data: {}, next: {} });
    const [AcadmicQNADataState, dispatchAcadmicQNADataState] = useReducer(AcdemicQNAReducer, { data: {}, next: {} });
    const mainbreadCrumb = useContext(BreadCrumbContext);

    useEffect(() => {
        for (let row of subject.data) {
            if (row.subject_name === params.subject) {
                setSubjectStatus({ user_has_access: row.user_has_access, has_content: row.has_content });
                break;
            }
        }

    }, []);
    
    useEffect(() => {
        
        if (breadCrumb[2]) {
            if(location.pathname.search("/story") !== -1  || location.pathname.search("/videos")!== -1)  {
                // mainbreadCrumb.set([params.subject, "Chapter "+breadCrumb[2].name]);
            mainbreadCrumb.set([params.subject, "Chapter "+breadCrumb[2].name], [url.split("/").splice(0, 3).join("/"), location.pathname.split("/").splice(0, 6).join("/")]);
            }
            else {
                // mainbreadCrumb.set([params.subject, "Chapter "+breadCrumb[2].name]);
                mainbreadCrumb.set([params.subject, "Chapter "+breadCrumb[2].name], [url.split("/").splice(0, 3).join("/")]);
            }
            // mainbreadCrumb.set([params.subject, "Chapter "+breadCrumb[2].name]);
        } else {
            mainbreadCrumb.set([params.subject]);
        }
    }, [breadCrumb, params.subject,location])

    const AcadmicConceptData = useAcdemicConcept(AcadmicConceptDataState, dispatchAcdemicConceptDataState);
    const AcademicSubChapterList = useAcademicSubChapterList(AcadmicSubChapterDataState, dispatchAcadmicSubChapterDataState);
    const AcademicRevisionData = useAcademicRevision(AcadmicRevisionDataState, dispatchAcadmicRevisionDataState)
    const AcdemicQNAData = useAcademicQNA(AcadmicQNADataState, dispatchAcadmicQNADataState);
    const onResize = () => {
        let heights = 0;
        if (window.innerWidth >= 1280) {
            heights = window.innerHeight - 130;
        } else if (window.innerWidth < 481) {
            heights = window.innerHeight - 93;
        } else if (window.innerWidth < 600) {
            heights = window.innerHeight - 93;
        } else if (window.innerWidth < 700) {
            heights = window.innerHeight - 105;
        } else if (window.innerWidth < 1280) {
            heights = window.innerHeight - 105;
        }

        setWindowSize({ width: window.innerWidth, height: heights });
    };

    useEffect(() => {
        onResize();
        window.addEventListener("resize", onResize);
        return () => {
            return window.removeEventListener("resize", onResize);
        };
    }, []);

    var len = history.location.pathname.split("/").length
    // return (
    //     <>
    //         <div className="wrapper_container" style={{ overflowY: "hidden", height: "100%" }}>
    //             <div className="app-profile-container Acad_container" style={{ height: "100%", justifyContent: "flex-start" }}>
    //                 <div className="profile-inner-container" style={{ height: "100%", justifyContent: "flex-start", display: "block", MarginTop: "30px", padding: "10px 0px 10px 10px!important" }}>
    //                     <div className='common-grid-outer'>
    //                         <div className="row centered_outer_container">
    //                             {/*<h3 className=" txt-gray typo-headings font-bold">{breadCrumb[1].name}</h3>*/}

    //                             {history.location.pathname.split("/")[len - 2] != "story" && (
    //                                 <nav
    //                                     className="nav-bar m-primary"
    //                                     style={{
    //                                         padding: "0px",
    //                                         // marginLeft: 36,
    //                                     }}
    //                                 >
    //                                      <ul
    //                                             style={{
    //                                                 fontSize: 16,
    //                                                 fontFamily: "Poppins",
    //                                                 fontWeight: 600,
    //                                             }}
    //                                         >

    //                                             <Link onClick={() => { }} to={url + "/concepts"} className={location.pathname.search("concepts") != -1 || location.pathname.slice(-5) == "topic" ? "active" : "tab-hoverable"}>
    //                                                 Concepts
    //                                             </Link>
    //                                             <Link onClick={() => { }} to={url + "/test"} className={location.pathname.slice(-4) == "test" || location.pathname.slice(-26) == "test/rules-and-eligibility" ? "active" : "tab-hoverable"}>
    //                                                 Quizzes
    //                                             </Link>
    //                                             <Link onClick={() => { }} to={url + "/revision"} className={location.pathname.slice(-8) == "revision" || location.pathname.slice(-26) == "test/rules-and-eligibility" ? "active" : "tab-hoverable"}>
    //                                                 Revision
    //                                             </Link>
    //                                             <Link onClick={() => { }} to={url + "/qna"} className={location.pathname.slice(-3) == "qna" || location.pathname.slice(-26) == "test/rules-and-eligibility" ? "active" : "tab-hoverable"}>
    //                                                 Q&A
    //                                             </Link>
    //                                         </ul>
    //                                 </nav>
    //                             )}
    //                         </div>
    //                     </div>
    //                     <AcademicContext.Provider value={AcadmicConceptData}>
    //                         <AcademicSubChapterContext.Provider value={AcademicSubChapterList} >
    //                             <AcademicQNAContext.Provider value={AcdemicQNAData} >
    //                                 <AcademicRevisionContext.Provider value={AcademicRevisionData} >
    //                                     <div className="body temp-padding"
    //                                         style={{ height: "100%" }}
    //                                     >
    //                                         <Switch>
    //                                             {/* <Route path={path + "/"} component={AcadVideoController} /> */}
    //                                             <Route path={path + "/concepts"}>
    //                                                 <AcademicConceptController subjectStatus={subjectStatus} breadCrumb={breadCrumb} setBreadCrumb={setBreadCrumb} />
    //                                             </Route>
    //                                             <Route exact path={path + "/revision"}>
    //                                                 <RevisionController subjectStatus={subjectStatus} breadCrumb={breadCrumb} setBreadCrumb={setBreadCrumb} />
    //                                             </Route>
    //                                             <Route exact path={path + "/qna"}>
    //                                                 <QNAController subjectStatus={subjectStatus} breadCrumb={breadCrumb} setBreadCrumb={setBreadCrumb} />
    //                                             </Route>

    //                                             <Route path={path + "/infographics/details"} component={AcadInfoController} />
    //                                             <Route path={path + "/test"}>
    //                                                 <AcadTestController breadCrumb={breadCrumb} subjectStatus={subjectStatus} size={windowSize} setBreadCrumb={setBreadCrumb} />
    //                                             </Route>
    //                                             <Route path={path + "/videos"}>
    //                                                 <AcadVideoController breadCrumb={breadCrumb} subjectStatus={subjectStatus} setBreadCrumb={setBreadCrumb} />
    //                                             </Route>
    //                                             <Route path={"*"} component={PageNotFound} />
    //                                         </Switch>
    //                                     </div>

    //                                 </AcademicRevisionContext.Provider>
    //                             </AcademicQNAContext.Provider>
    //                         </AcademicSubChapterContext.Provider >
    //                     </AcademicContext.Provider>

    //                 </div>
    //             </div>
    //         </div>
    //     </>
    // );
    return (
        <>
            <div className="df row column fit-content">
                <div className="common-grid-outer">


                    <div className="df column centered_outer_container">
                        {history.location.pathname.split("/")[len - 2] != "story" && (
                            <nav
                                className="nav-bar m-primary"
                                style={{
                                    padding: "0px",
                                    //   marginLeft: 36,
                                }}
                            >
                                <ul
                                    style={{
                                        fontSize: 16,
                                        fontFamily: "Poppins",
                                        fontWeight: 600,
                                    }}
                                >

                                    <Link onClick={() => { }} to={url + "/concepts"} className={location.pathname.search("concepts") != -1 || location.pathname.slice(-5) == "topic" ? "active" : "tab-hoverable"}>
                                        Concepts
                                    </Link>
                                    <Link onClick={() => { }} to={url + "/test"} className={location.pathname.slice(-4) == "test" || location.pathname.slice(-26) == "test/rules-and-eligibility" ? "active" : "tab-hoverable"}>
                                        Quizzes
                                    </Link>
                                    <Link onClick={() => { }} to={url + "/revision"} className={location.pathname.slice(-8) == "revision" || location.pathname.slice(-26) == "test/rules-and-eligibility" ? "active" : "tab-hoverable"}>
                                        Revision
                                    </Link>
                                    <Link onClick={() => { }} to={url + "/qna"} className={location.pathname.slice(-3) == "qna" || location.pathname.slice(-26) == "test/rules-and-eligibility" ? "active" : "tab-hoverable"}>
                                        Q&A
                                    </Link>
                                </ul>
                            </nav>
                        )}
                    </div>
                </div>
                <AcademicContext.Provider value={AcadmicConceptData}>
                    <AcademicSubChapterContext.Provider value={AcademicSubChapterList} >
                        <AcademicQNAContext.Provider value={AcdemicQNAData} >
                            <AcademicRevisionContext.Provider value={AcademicRevisionData} >
                                {/* <div className="body temp-padding"
                                        style={{ height: "100%" }}
                                    > */}
                                <Switch>
                                    {/* <Route path={path + "/"} component={AcadVideoController} /> */}
                                    <Route path={path + "/concepts"}>
                                        <AcademicConceptController subjectStatus={subjectStatus} breadCrumb={breadCrumb} setBreadCrumb={setBreadCrumb} />
                                    </Route>
                                    <Route exact path={path + "/revision"}>
                                        <RevisionController subjectStatus={subjectStatus} breadCrumb={breadCrumb} setBreadCrumb={setBreadCrumb} />
                                    </Route>
                                    <Route exact path={path + "/qna"}>
                                        <QNAController subjectStatus={subjectStatus} breadCrumb={breadCrumb} setBreadCrumb={setBreadCrumb} />
                                    </Route>

                                    <Route path={path + "/infographics/details"} component={AcadInfoController} />
                                    <Route path={path + "/test"}>
                                        <AcadTestController breadCrumb={breadCrumb} subjectStatus={subjectStatus} size={windowSize} setBreadCrumb={setBreadCrumb} />
                                    </Route>
                                    <Route path={path + "/videos"}>
                                        <AcadVideoController breadCrumb={breadCrumb} subjectStatus={subjectStatus} setBreadCrumb={setBreadCrumb} />
                                    </Route>
                                    <Route path={"*"} component={PageNotFound} />
                                </Switch>
                                {/* </div> */}

                            </AcademicRevisionContext.Provider>
                        </AcademicQNAContext.Provider>
                    </AcademicSubChapterContext.Provider >
                </AcademicContext.Provider>


            </div>
        </>
    )
};

export default AcademicController;
