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
import AcademicController from "./AcademicController";

export const AcademicContext = createContext();
export const AcademicSubChapterContext = createContext();
export const AcademicRevisionContext = createContext();
export const AcademicQNAContext = createContext();

const AcadSubjectsController = () => {
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
            mainbreadCrumb.set([params.subject,""]);
        } else {
            mainbreadCrumb.set([params.subject]);
        }
    }, [breadCrumb, params.subject])

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
    return (
        <>
            <div className="wrapper_container" style={{ overflowY: "hidden", height: "100%" }}>
                <div className="app-profile-container Acad_container" style={{ height: "100%", justifyContent: "flex-start" }}>
                    <div className="profile-inner-container" style={{ height: "100%", justifyContent: "flex-start", display: "block", MarginTop: "30px", padding: "10px 0px 10px 10px!important" }}>
                       
                        <AcademicContext.Provider value={AcadmicConceptData}>
                            <AcademicSubChapterContext.Provider value={AcademicSubChapterList} >
                                        <div className="body"
                                            style={{ height: "100%" }} >
                                    <Switch>
                                        <Route exact path={path }>
                                        <AcadInfoController subjectStatus={subjectStatus} breadCrumb={breadCrumb} setBreadCrumb={setBreadCrumb} />
                                    </Route> <Route path={path + "/:chapter_name/:chapter_number"}>
                                        <AcademicController subjectStatus={subjectStatus} breadCrumb={breadCrumb} setBreadCrumb={setBreadCrumb} />
                                    </Route>
                                    </Switch>
                                </div>

                            </AcademicSubChapterContext.Provider >

                        </AcademicContext.Provider>

                    </div>
                </div>
            </div>
        </>
    );
};

export default AcadSubjectsController;
