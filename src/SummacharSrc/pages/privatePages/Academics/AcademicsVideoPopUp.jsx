import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import apiUrl from "../../../common/apiUrl";
import { getHeaders, getUserUuid, resetToken } from "../../../common/helper";
import Loader from "../../../components/Loader";
import { AcademicContext, AcademicSubChapterContext } from "../../../controllers/AcademicController";

const AcademicsVideoPopUp = (Props) => {

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

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const video_slug = useParams().slug;
    const params = useParams()
    const AcademicConceptContext = useContext(AcademicContext);
    // const [data,setData] = useState(Props.data)
    const [data, setData] = useState({})
    const SubChapterContext = useContext(AcademicSubChapterContext);
    var video;
    const setVideo = () => {
        setLoading(true)
        const script = document.createElement('script');
        script.src = "https://player.vdocipher.com/playerAssets/1.6.10/vdo.js";
        document.body.appendChild(script);

        script.async = true;

        script.onload = (thiss, e) => {
            video = new window.VdoPlayer({
                otp: data.vdoci_otp,
                playbackInfo: data.vdoci_pl_info,
                theme: "9ae8bbe8dd964ddc9bdb932cca1cb59a",
                container: document.querySelector("#host"),
            });

            video.addEventListener('load', async () => {
                video.seek(data.has_watched ? 0 : data.progress_seconds ? data.progress_seconds : 0)
            });
            video.addEventListener('ended', async () => {
                //console.log(data)
                ProgressdVideo(data.uuid);
                if (!data.has_watched) {

                    await watchedVideo(data.uuid)
                }

                history.goBack();
            });
            video.addEventListener('progress', (e) => {
                // console.log('progress',e)
            })
        }
        script.onerror = () => {
            setLoading(false)
            Props.closePopUp();
            toast.error("OOPS! Something wents wrong!!")
            return false;
        }

    }
    const getVideoById = async (uuid) => {
        return await axios({
            url: apiUrl.subjectVideos + uuid + "/?user-uuid=" + getUserUuid(),
            method: "GET",
            headers: getHeaders()
        })
            .then(async (response) => {
                // if(response.data)
                if (response.data.user_has_access) {
                    setData(response.data)
                    return { status: true }
                } else {
                    history.push('/academics');
                    return { status: false }
                }

            })
            .catch(async (error) => {
                if (error.response.status == 401) {
                    await resetToken(async () => { getVideoById(uuid) });

                    return { status: false, code: error.response.status }
                } else {
                    if (error.response.status == 404) {
                        history.push("/home")
                    }
                    return { status: false, code: error.response.status }
                }

            })
    }
    const watchedVideo = async (uuid) => {
        let isSubmited = false;
        const ContextData = AcademicConceptContext?{ ...AcademicConceptContext.data }:{};
        if (ContextData[params.subject] && ContextData[params.subject][params.chapter_name]) {
            let subChapterIndex = 0;
            for (let subchapters of ContextData[params.subject][params.chapter_name]) {
                const subChapterName = Object.keys(subchapters)[0];
                let suchaptersDataIndex = 0;
                for (let row of Object.values(subchapters)[0]) {
                    let resultIndex = 0;
                    for (let storyResult of row.results) {

                        if (storyResult.uuid === uuid) {


                            ContextData[params.subject][params.chapter_name][subChapterIndex][subChapterName][suchaptersDataIndex].results[resultIndex].has_watched = true

                            AcademicConceptContext.setData(ContextData);

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

        return await axios({
            url: apiUrl.subjectVideoWatched + uuid + "?user-uuid=" + getUserUuid(),
            method: "GET",
            headers: getHeaders()
        })
    }
    const ProgressdVideo = async (uuid) => {

        if (video) {
            // alert()
            const played_seconds = Math.round(video.currentTime);
            let isSubmited = false;
            const ContextData = AcademicConceptContext?{ ...AcademicConceptContext.data }:{};
            if (ContextData[params.subject] && ContextData[params.subject][params.chapter_name]) {
                let subChapterIndex = 0;
                for (let subchapters of ContextData[params.subject][params.chapter_name]) {
                    const subChapterName = Object.keys(subchapters)[0];
                    let suchaptersDataIndex = 0;
                    for (let row of Object.values(subchapters)[0]) {
                        let resultIndex = 0;
                        for (let storyResult of row.results) {

                            if (storyResult.uuid === uuid) {


                                ContextData[params.subject][params.chapter_name][subChapterIndex][subChapterName][suchaptersDataIndex].results[resultIndex].progress_seconds = played_seconds

                                AcademicConceptContext.setData(ContextData);

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

            return await axios({
                url: apiUrl.subjectVideoProgress + uuid + "/" + played_seconds + "/?user-uuid=" + getUserUuid(),
                method: "POST",
                headers: getHeaders()
            })
        }

    }
    useEffect(async () => {
        if (!(data && Object.keys(data).length > 0)) {
            const response = await getVideoById(video_slug);
        }

    }, []);
    useEffect(() => {
        if (data && Object.keys(data).length > 0) {
            setVideo();
        }
    }, [data])

    var margin = 16;
    return (
        <div className="inner_pop_up_container row df center" style={{position:"fixed"}}>
            <div className="grayArea fit-content" onClick={() => { ProgressdVideo(data.uuid); history.goBack(); }}></div>
            {windowSize.width<960 ?
                <div className="news_popUp_Box  df center" style={{ padding: "0px", maxWidth: 960,
                    height:windowSize.height - 2*margin,
                    marginTop: margin,
                    marginBottom: margin,
                }} id="host">
                    {loading && <Loader />}
                    {!loading && <Loader />}
                </div>
                :
                <div className="news_popUp_Box  df center" style={{ padding: "0px", maxWidth: 960}} id="host">
                    {loading && <Loader />}
                    {!loading && <Loader />}
                </div>
            }
        </div>
    )
}
export default AcademicsVideoPopUp;