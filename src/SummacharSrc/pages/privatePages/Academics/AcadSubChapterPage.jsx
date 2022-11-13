import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";

import LaoderSmall from "../../../assets/images/common/loader_small.gif"

import "../../../assets/css/academics.css";
import "../../../assets/css/acadChaptersList.css";
import "../../../assets/css/acadQuizList.css";

import SubChapter from "./AcademicConceptComponent/SubChapter";
import NoData from "../../../components/NoData";
import { Store } from "../../../App";

const AcadSubChapterPage = (props) => {
    const user = useContext(Store).user.data;
    const [data, setData] = useState(user.board === "CBSE" ? {} : [])
    const ref = useRef(null)
    const [termBoxVisblity, setTermBoxVisiblity] = useState([])

    const DEFAULT_OPEN_TERM = "Term2"
    useLayoutEffect(() => {
        if (props.data && props.data.length > 0) {
            if (user.board === "CBSE") {
                const temp = {};
                const visiblityOfTerm = []
                for (let row of props.data) {

                    if (row.term && row.term != null) {
                        let term = row.term
                        if (term === "Out Of Syllabus") {
                            term = "Term3"
                        }
                        if (temp[term]) {

                            temp[term].push(row)
                        } else {

                            temp[term] = Array()
                            temp[term][0] = row
                            // console.log(term == "Term2")
                            // termTemp.push(term == "Term2")

                        }

                    }
                }

                let i = 0;
                const ordered = Object.keys(temp).sort().reduce(
                    (obj, key) => {
                        if (key === DEFAULT_OPEN_TERM) {
                            visiblityOfTerm[i] = true
                        } else {
                            visiblityOfTerm[i] = false
                        }
                        i++
                        obj[key] = temp[key];
                        return obj;
                    },
                    {}
                );
                setTermBoxVisiblity(visiblityOfTerm)
                setData(ordered)
            } else {
                setData(props.data)
            }
        }
    }, [props.data])

    useEffect(() => {
        ref.current.scrollTo({
            top:0
        })
    },[termBoxVisblity])

    return (
        <>
            <div className="wrapper_container enter_animation news_container acad_info" id="acadInfo_container" style={{ height: "100%", padding: "0px", paddingTop: "20px" }} ref={ref} onScroll={() => props.onScroll(ref)}>

                <div className='common-grid-outer'>
                    <div className="centered_outer_container">
                        {/* {props.visibility && props.popUpData &&
                    <Switch>
                        <Route path={url + "/details"}>
                            <AcadInfoPopUpController setInfo={props.setInfo} allInfoData={props.infoList} data={props.popUpData} changeVisibility={props.changeVisibility} />
                        </Route>
                    </Switch>

                } */}
                        <div className="outer-main-container concepts-outer">
                            <div className="inner-main-container concepts-inner" style={{ marginBottom: "10px", maxWidth: "100%", width: "100%" }}>
                                {/* {console.log(props.infoList.results)} */}
                                {
                                    user.board !== "CBSE" && (data && data.length > 0 ?


                                        <div className="chapters-list-grid" style={{ marginBottom: 32 }}>


                                            {data.map((info, keyIndex) => {
                                                {

                                                    return (

                                                        <SubChapter key={info.uuid} data={info} />

                                                    )

                                                }
                                            })}
                                        </div> : <div className="chapters-list-grid"><NoData /></div>)

                                }

                                {
                                    user.board === "CBSE" && (data && Object.keys(data).length > 0 ?

                                        Object.keys(data).map((term, termIndex) => {
                                            return (
                                                <div className="row m-v-primary" style={{ marginTop: "0px" }} key={termIndex}>
                                                    <div className="  chapters-list-grid radius-primary p-primary column  border-primary df" style={{ display: "flex" }} onClick={() => {
                                                        const visiblity = []
                                                        for (let i = 0; i < termBoxVisblity.length; i++) {
                                                            visiblity.push(i === termIndex ? !termBoxVisblity[i] : false)
                                                        }
                                                        setTermBoxVisiblity(visiblity)
                                                    }}>
                                                        <div className="space-between df pointer row-center">
                                                            <span className="typo-headings font-bold df ">{term === "Term1" ? "Term 1" : term === "Term2" ? "Term 2" : "Out Of Syllabus"}</span>
                                                            <div className="df center" style={{ height: '30px', width: '30px', transition: 'all 0.2s linear 0s', transform: !termBoxVisblity[termIndex] ? 'rotate(90deg)' : 'rotate(-90deg)' }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="28" viewBox="0 0 17 28" fill="none">
                                                                    <path d="M0.953818 26.6815C0.476756 26.2016 0.208983 25.5524 0.208983 24.8758C0.208983 24.1991 0.476756 23.5499 0.953818 23.07L10.0212 13.8746L0.953819 4.80721C0.476757 4.3273 0.208984 3.67811 0.208984 3.00143C0.208984 2.32475 0.476757 1.67555 0.953819 1.19565C1.19193 0.955569 1.47523 0.765016 1.78736 0.634977C2.09949 0.504938 2.43428 0.437988 2.77241 0.437988C3.11055 0.437988 3.44534 0.504938 3.75747 0.634977C4.0696 0.765016 4.35289 0.95557 4.591 1.19565L15.4513 12.056C15.6914 12.2941 15.882 12.5774 16.012 12.8895C16.142 13.2016 16.209 13.5364 16.209 13.8746C16.209 14.2127 16.142 14.5475 16.012 14.8596C15.882 15.1717 15.6914 15.455 15.4513 15.6932L4.591 26.6815C4.35289 26.9216 4.06959 27.1122 3.75746 27.2422C3.44533 27.3722 3.11055 27.4392 2.77241 27.4392C2.43428 27.4392 2.09949 27.3722 1.78736 27.2422C1.47523 27.1122 1.19193 26.9216 0.953818 26.6815Z" fill="#5C56D4">

                                                                    </path>
                                                                </svg>
                                                            </div>

                                                        </div>


                                                        {termBoxVisblity[termIndex] && <div className="term-column row">
                                                            <div className="row" key={termIndex} style={{}}>


                                                                {data[term].map((info, keyIndex) => {
                                                                    {

                                                                        return (

                                                                            <SubChapter key={info.uuid} data={info} />

                                                                        )

                                                                    }
                                                                })}
                                                            </div>
                                                        </div>}
                                                    </div>


                                                </div>
                                            )
                                        })
                                        : <div className="chapters-list-grid"><NoData /></div>)

                                }




                                {props.scrollLoading && <div className="loader-box" >
                                    <img src={LaoderSmall} style={{ width: "50px" }} alt="" />
                                </div>}
                            </div>
                            {
                                props.infoList && props.infoList.results && props.infoList.results.length <= 0 &&
                                <h1 className="fit-content df center " style={{ paddingTop: "30px" }}>Section available with Humanities course subscription!</h1>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AcadSubChapterPage;

