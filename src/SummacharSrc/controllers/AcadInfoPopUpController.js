import axios from "axios";
import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import { Store } from "../App";
import apiUrl from "../common/apiUrl";
import { getHeaders, getUserUuid, handleError, setReadStatus } from "../common/helper";
import Loader from "../components/Loader";
import AcadInfoPopUp from "../pages/privatePages/Academics/AcadInfoPopUp";
import Infographic from "../pages/privatePages/Infographic";
import { AcademicContext, AcademicSubChapterContext } from "./AcademicController";
import { getDataBySlug } from "./NewsPopUpController";



const AcadInfoPopUpController = (props) => {
    //console.log(props)
    const params = useParams();
    const history = useHistory()
    const [popUpData, setPopUpData] = useState({});
    const [loading, setLoading] = useState(false);
    const [bookMarkLoader, setBookMarkLoader] = useState(false);
    const [bookMarked, changeBook] = useState(false);
    const AcademicConceptContext = useContext(AcademicContext);
    const type = "acad";
    const SubChapterContext = useContext(AcademicSubChapterContext);
    const bookMark = async (value) => {
        setBookMarkLoader(true);
        const ContextData = AcademicConceptContext ? { ...AcademicConceptContext.data } : {};

        if (ContextData[params.subject] && ContextData[params.subject][params.chapter_name]) {
            let subChapterIndex = 0;
            for (let subchapters of ContextData[params.subject][params.chapter_name]) {
                const subChapterName = Object.keys(subchapters)[0];
                let suchaptersDataIndex = 0;
                for (let row of Object.values(subchapters)[0]) {
                    let resultIndex = 0;
                    for (let storyResult of row.results) {

                        if (storyResult.uuid === popUpData.uuid) {


                            ContextData[params.subject][params.chapter_name][subChapterIndex][subChapterName][suchaptersDataIndex].results[resultIndex].has_bookmarked = value;
                            AcademicConceptContext.setData(ContextData);
                            break;
                        }
                        resultIndex += 1
                    }
                    suchaptersDataIndex += 1;
                }
                subChapterIndex += 1;
            }
        }

        let popUpdataTemp = { ...popUpData };

        popUpdataTemp.has_bookmarked = value;
        setPopUpData(popUpdataTemp);
        setBookMarkLoader(false);


        await axios({
            url: apiUrl.bookMarkUrl + popUpData.uuid + "/" + "?user-uuid=" + getUserUuid(),
            method: "POST",
            data: {
                has_bookmarked: value == true ? "True" : "False"
            },
            headers: getHeaders()
        });
    }
    const submitQuiz = async (answer, data, index) => {
        let isSubmited = false;
        const ContextData = AcademicConceptContext ? { ...AcademicConceptContext.data } : {};
        if (ContextData[params.subject] && ContextData[params.subject][params.chapter_name]) {
            let subChapterIndex = 0;
            for (let subchapters of ContextData[params.subject][params.chapter_name]) {
                const subChapterName = Object.keys(subchapters)[0];
                let suchaptersDataIndex = 0;
                for (let row of Object.values(subchapters)[0]) {
                    let resultIndex = 0;
                    for (let storyResult of row.results) {

                        if (storyResult.uuid === popUpData.uuid) {

                            const attempt = {
                                attempt_answer: answer,
                                user_points: 0.00,
                                is_correct: storyResult.slides[index].answer === answer,
                                attempt_time: 0,
                                attempt_file: null
                            }
                            if (Object.keys(storyResult.slides[index].attempt).length <= 0) {
                                ContextData[params.subject][params.chapter_name][subChapterIndex][subChapterName][suchaptersDataIndex].results[resultIndex].slides[index].attempt = attempt;

                                let total_instory_quiz = 0;
                                let attepted_quiz = 0;
                                let read_status = false;
                                const temp = ContextData[params.subject][params.chapter_name][subChapterIndex][subChapterName][suchaptersDataIndex].results[resultIndex];
                                if (!temp.has_read) {
                                    for (let row of temp.slides) {
                                        if (row.slide_type === "Question") {
                                            total_instory_quiz += 1;
                                            if (row.attempt && Object.keys(row.attempt).length > 0) {
                                                attepted_quiz += 1;
                                            }
                                        }

                                    }
                                    if (attepted_quiz === total_instory_quiz) {
                                        read_status = true;
                                        if (SubChapterContext.data && SubChapterContext.data[params.subject]) {
                                            const subChapter = { ...SubChapterContext.data }
                                            const subChapterlist = subChapter[params.subject];
                                            if (subChapterlist && subChapterlist.length > 0) {
                                                let i = 0;
                                                for (let tempData of subChapterlist) {
                                                    if (tempData.chapter_name === params.chapter_name) {
                                                        subChapterlist[i].story_read_count = subChapterlist[i].story_read_count + 1
                                                        break;
                                                    }
                                                    i++
                                                }
                                                subChapter[params.subject] = subChapterlist                                                
                                                SubChapterContext.setState(subChapter, { ...SubChapterContext.next });
                                            }
                                            
                                        }
                                    }
                                }

                                ContextData[params.subject][params.chapter_name][subChapterIndex][subChapterName][suchaptersDataIndex].results[resultIndex].has_read = read_status;
                                AcademicConceptContext.setData(ContextData);
                            }
                            isSubmited = true;
                            break;
                        }
                        resultIndex += 1
                    }
                    suchaptersDataIndex += 1;
                }
                subChapterIndex += 1;
            }
        }

        let popUpdataTemp = { ...popUpData };

        let total_instory_quiz = 0;
        let attepted_quiz = 0;
        let read_status = false;

        const attempt = {
            attempt_answer: answer,
            user_points: 0.00,
            is_correct: popUpdataTemp.slides[index].answer === answer,
            attempt_time: 0,
            attempt_file: null
        }
        popUpdataTemp.slides[index].attempt = attempt;
        const temp = popUpdataTemp;
        if (!temp.has_read) {
            for (let row of temp.slides) {
                if (row.slide_type === "Question") {
                    total_instory_quiz += 1;
                    if (row.attempt && Object.keys(row.attempt).length > 0) {
                        attepted_quiz += 1;

                    }
                }

            }

            if (attepted_quiz === total_instory_quiz) {
                read_status = true;
                setReadStatus(temp.uuid);
            }
        }
        popUpdataTemp.has_read = read_status;
        setPopUpData(popUpdataTemp);
        let pass_data = {
            source: "story",
            source_id: popUpdataTemp.uuid,
            attempt_answer: answer,
            attempt_time: 0
        };
        axios({
            url: apiUrl.inStoryQuizSubmit + data.uuid + "/" + "?user-uuid=" + getUserUuid(),
            method: "POST",
            data: pass_data,
            headers: getHeaders(),
        }).then(() => {
            return { status: true }
        }).catch((err) => {
            handleError(err)
            return { status: false }
        })



    }

    const onRead = () => {
        const ContextData = { ...AcademicConceptContext.data };        
        if (ContextData[params.subject] && ContextData[params.subject][params.chapter_name]) {
            let subChapterIndex = 0;
            for (let subchapters of ContextData[params.subject][params.chapter_name]) {
                const subChapterName = Object.keys(subchapters)[0];
                let suchaptersDataIndex = 0;
                for (let row of Object.values(subchapters)[0]) {
                    let resultIndex = 0;
                    for (let storyResult of row.results) {

                        if (storyResult.uuid === popUpData.uuid) {

                            let total_instory_quiz = 0;
                            let attepted_quiz = 0;
                            let read_status = false;
                            const temp = storyResult;
                            // if (!temp.has_read) {
                            for (let row of temp.slides) {
                                if (row.slide_type === "Question") {
                                    total_instory_quiz += 1;
                                    if (row.attempt && Object.keys(row.attempt).length > 0) {
                                        attepted_quiz += 1;

                                    }
                                }

                            }
                            if (attepted_quiz === total_instory_quiz) {
                                read_status = true;
                                // setReadStatus(temp.uuid);
                            }
                            // }

                            ContextData[params.subject][params.chapter_name][subChapterIndex][subChapterName][suchaptersDataIndex].results[resultIndex].has_read = read_status;
                            AcademicConceptContext.setData(ContextData);

                            break;
                        }
                        resultIndex += 1
                    }
                    suchaptersDataIndex += 1;
                }
                subChapterIndex += 1;
            }
        }
        if (SubChapterContext.data && SubChapterContext.data[params.subject]) {
            const subChapter = { ...SubChapterContext.data }
            const subChapterlist = subChapter[params.subject];
            if (subChapterlist && subChapterlist.length > 0) {
                let i = 0;
                for (let tempData of subChapterlist) {
                    if (tempData.chapter_name === params.chapter_name) {
                        subChapterlist[i].story_total_count = subChapterlist[i].story_total_count + 1
                        break;
                    }
                    i++
                }
                subChapter[params.subject] = subChapterlist
                
                SubChapterContext.setState(subChapter, { ...SubChapterContext.next });
            }
            
        }
        let popUpdataTemp = { ...popUpData };

        let total_instory_quiz = 0;
        let attepted_quiz = 0;
        let read_status = false;
        // for (let row of temp.slides) {
        //     if (row.slide_type === "Question") {
        //         total_instory_quiz += 1;
        //         if (row.attempt && Object.keys(row.attempt).length > 0) {
        //             attepted_quiz += 1;

        //         }
        //     }

        // }
        // if (attepted_quiz === total_instory_quiz) {
        read_status = true;
        setReadStatus(popUpdataTemp.uuid)
        popUpdataTemp.has_read = read_status;
        setPopUpData(popUpdataTemp);
    }

    useEffect(async () => {

        if (props.data && props.data.data && Object.keys(props.data.data).length > 0) {
            setPopUpData(props.data.data)
            changeBook(props.data.data.has_bookmarked == "True" ? true : false);
        } else {
            setLoading(true)
            const response = await getDataBySlug(params.slug);
            if (response.status == true) {
                if (response.data.results[0].user_has_access) {
                    setPopUpData(response.data.results[0]);
                    changeBook(response.data.results[0].has_bookmarked == "True" ? true : false);
                } else {
                    history.push('/academics')
                }

            } else {
                toast.error("Oops! Something went wrong");
                history.push('/academics')
            }
        }

        setLoading(false)        

    }, [])


    const onBackClick = () => {
        history.goBack();
    }
    if (!loading) {
        return (
            <>
                {/* <div className="outer-main-container" style={{overfowY:"scroll"}}> */}

                {/* <div className="common-grid-outer">     */}
                <Infographic onRead={onRead} submitQuiz={submitQuiz} onBackClick={onBackClick} bookMark={bookMark} bookMarkLoader={bookMarkLoader} data={popUpData} setPopUpData={setPopUpData} loading={loading} type={type} />
                {/* </div> */}

                {/* </div> */}
                {/* <AcadInfoPopUp onRead={onRead} submitQuiz={submitQuiz} onBackClick={onBackClick} bookMark={bookMark} bookMarkLoader={bookMarkLoader} data={popUpData} setPopUpData={setPopUpData} loading={loading} /> */}
            </>
        )
    } else {
        return (
            // <div className="pop_up_container row df center">
            //     <div className="grayArea fit-content" onClick={() => { history.goBack() }}></div>
            //     <div className="news_popUp_Box df">
            <Loader />
            //     </div>
            // </div>

        )
    }

}
export default AcadInfoPopUpController;