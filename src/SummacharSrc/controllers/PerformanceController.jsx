import { useRouteMatch } from "react-router";
import { BreadCrumbContext, Store } from "../App";
import { Link } from "react-router-dom";

import apiUrl from "../common/apiUrl";
import { getHeaders, getUserUuid } from "../common/helper";
import axios from "axios";

import { useState, useEffect, useContext } from "react";

import PerformancePage from "../pages/privatePages/performance/PerformancePage";
import Loader from "../components/Loader";

const PerformanceController = () => {

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,

    });
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

    // Variable declaration

    const [loading, setLoading] = useState(true);
    const context = useContext(Store);
    const breadCrumbContext = useContext(BreadCrumbContext);

    const subjectList = context.subject.data;

    let { path, url } = useRouteMatch();


    const [performanceData, setPerformance] = useState({});
    const [subjectWisePerformance, setSubjectWisePerformance] = useState({});

    // const [chapterList, setChapterList] = useState({});

    let chapterList = {};
    let subjectPerformance = {};

    const [chapterData, setChapterData] = useState({});

    // On Component mount i.e. useEffect, we will set the breadcrumb and get the performance data
    useEffect(() => {

        // Set breadcrumb
        breadCrumbContext.set(["Performance"]);

        // Get All performance data
        let allPerformance = async () => {
            await axios({
                url: apiUrl.performanceUrl + "?user-uuid=" + getUserUuid(),
                method: "GET",
                headers: getHeaders(),
            }).then((res) => {
                setPerformance(res.data);
                // console.log("performance", res.data);
                setLoading(false);
            }).catch(async (error) => {

            });
        };

        // Chapter list is obtained using this
        let getChapterList = async (subject) => {
            await axios({
                url: apiUrl.topicUrl + "?user-uuid=" + getUserUuid() + "&subject=" + subject,
                method: "GET",
                headers: getHeaders(),
            }).then((res) => {
                // setChapterList(...chapterList, { subject: res.data.results });
                chapterList[subject] = res.data;
                return res.data
            }).catch(async (error) => {
                console.log(error);
            })
        }

        // After getting the chapter list, we will request all subject's individual performance
        let getSubjectWisePerformance = async (subject) => {
            await axios({
                url: apiUrl.performanceUrl + subject + "?user-uuid=" + getUserUuid(),
                method: "GET",
                headers: getHeaders(),
            }).then((res) => {
                subjectPerformance[subject] = res.data;

                return res.data
            }
            ).catch(async (error) => {

            })
        }

        // All performance is called here
        allPerformance();

        // Chapter wise performance is obtained here
        let gatherChapterData = async () => {
            for (let i = 0; i < subjectList.length; i++) {


                let subject = subjectList[i];
                await getChapterList(subject.subject_name);
                //console.log(chapterList);
            }
        };

        // let gatherSubjectWisePerformance = async () => {
        //     for (let i = 0; i < subjectList.length; i++) {
        //         let subject = subjectList[i];
        //         await getSubjectWisePerformance(subject.subject_name);
        //     }
        // }


        // Wait for all the data to be obtained, the proceed to render the page
        // (async () => {
        //     await gatherChapterData();
        //     // console.log(chapterList);
        //     setChapterData(chapterList);

        //     // await gatherSubjectWisePerformance();
        //     // setSubjectWisePerformance(subjectPerformance);
        //     // setLoading(false);

        // })();

    }, []);



    return (
        <>

            <div className="performance-main-container" style={{}}>
                {windowSize.width > 960 && <div className="centered_outer_container" style={{}}>
                    <div style={{ width: "100%", padding: "0 32px" }}>
                        <nav className="performance-navbar performance-hidden-scrollbar" style={{}}>
                            <ul
                                className=" txt-gray typo-headings font-bold"
                                style={{
                                    fontSize: 16,
                                    fontFamily: "Poppins",
                                    fontWeight: 600,
                                    display: "flex",
                                    flexDirection: "row",
                                    textDecorationLine: "none",
                                    padding: "8px 0px",
                                }}
                            >
                                <Link className={`performance-navbar ${url.includes("All") ? " active" : "tab-hoverable"}`} to={"/performance/All"} >
                                    All
                                </Link>
                                {subjectList.map((sub, keyIndex) => {
                                    return (

                                        <Link key={keyIndex} className={`performance-navbar ${url.includes(sub.subject_name) ? " active" : "tab-hoverable"}`} to={`/performance/${sub.subject_name}`}>
                                            {sub.subject_name}
                                        </Link>

                                    );

                                })}
                            </ul>
                        </nav>
                    </div>
                </div>}
                {!loading ?
                    <div className="centered_outer_container" style={{
                        //  overflowY: "scroll"
                        height: windowSize.height - 110,
                    }}>

                        <PerformancePage
                        subjectList={subjectList}
                        url={url}
                            width={windowSize.width}
                            // allPerformance={allPerformance} 
                            performanceData={performanceData}
                        // chapterList={chapterData}

                        />
                    </div>
                    :
                    <div style={{
                        margin: "auto",
                    }}>
                        <Loader />
                    </div>
                }
            </div >
        </>
    );
}


export default PerformanceController;