import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import apiUrl from "../../common/apiUrl";
import { getHeaders, getUserUuid, handleError, resetToken } from "../../common/helper";
import Loader from "../../components/Loader";
import QNAPage from "../../pages/privatePages/Academics/qna/QNAPage";
import { AcademicQNAContext } from "../AcademicController";

const QNAController = () => {
    const params = useParams();
    const subject = params.subject;
    const qna = useContext(AcademicQNAContext);
    const [loading, setLoading] = useState(false)
    const [Scrollloading, setScrollLoading] = useState(false)
    const fetchData = async (url = "") => {
        return await axios({
            url: url ? url : apiUrl.acadQNAUrl + "?user-uuid=" + getUserUuid() + "&chapters=" + params.chapter_name+"&academic_subjects=" + subject,
            method: "GET",
            headers: getHeaders(),
        }).then((res) => {
            if (res.data) {
                let tempData = { ...qna.data };

                if(tempData[subject]){
                    for(let row of res.data.results){
                        tempData[subject].push(row)
                    }  
                }else{
                    tempData[subject] = res.data.results
                }
                

                let tempNext = { ...qna.next };

                res.data.next && res.data.next != null ? tempNext[subject] = res.data.next : tempNext[subject] = ""


                qna.setState(tempData, tempNext);
                return { status: true }

            }
        }).catch(
            async (error) => {

                if (error.response && error.response.status == 401) {
                    await resetToken(async () => { await fetchData() });
                } else {

                    handleError(error)
                    return { status: false }
                }

                return { status: false }

            })
    }
    const onScroll = async (ref) => {
        if (ref) {
            if (!Scrollloading && (qna.next[subject] && qna.next[subject] != "") && ((ref.current.clientHeight + ref.current.scrollTop) > (ref.current.scrollHeight / 2))) {
                setScrollLoading(true)
                await fetchData(qna.next[subject]);
                setScrollLoading(false)
            }
        }
    }
    useEffect(async () => {
        if (!(qna.data && qna.data[subject])) {
            setLoading(true);
            await fetchData()
            setLoading(false);
        }
    }, [])
    if (loading) {
        return (
            <div className="df row fit-content center">
                <Loader />
            </div>
        )
    } else {
        return (
            <>
                <QNAPage
                    onScroll={onScroll}
                    scrollLoading={Scrollloading}
                    data={qna.data[subject]}
                />
            </>
        )
    }

}
export default QNAController;