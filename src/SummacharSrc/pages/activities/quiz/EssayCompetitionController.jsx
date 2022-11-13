import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import apiUrl from "../../../common/apiUrl";
import { getFirstQuizAttempt, getHeaders, getUserUuid, handleError, isFreeTrial } from "../../../common/helper";
import { LockingSystemContext } from "../../../components/lockingsystem/LockingSysytemPopUp";
import EssayCompetitionComponent from "./EssayCompetitionComponent";
const EssayCompetitionController = () => {
    const [competitionData, setCompetitionData] = useState({
        uuid: "",
        slug: "",
        hasAttempted: false
    })
    const history = useHistory();
    const [file, setfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const submit = async () => {
        setLoading(true)
        var formData = new FormData();
        formData.append("file", file);
        const response = await axios({
            url: apiUrl.submitCompetitionFile + competitionData.slug + "/" + competitionData.uuid + "/"+"?user-uuid="+getUserUuid(),
            method: "POST",
            headers: getHeaders(true),
            data: formData,

        }).then(
            (res) => {
                history.push("/activities")
                setLoading(false)

            }
        ).catch(
            (error) => {
                alert("OOPS! something went wrong")
                setLoading(false)
            }
        )
    }
    const getData = async (slug) => {
        return await axios({
            url: apiUrl.quizUrl + slug,
            method: "GET",
            headers: getHeaders()
        }).then((response) => {
            return { status: true, data: response.data }
        }).catch((error) => {
            handleError(error)
            return { status: false, error: error }
        })
    }

    const params = useParams();
    const lockSystem = useContext(LockingSystemContext)
    useEffect(async () => {
        if (!isFreeTrial() || !getFirstQuizAttempt()) {

            setCompetitionData({
                ...competitionData,
                slug: params.slug,
            });
            setLoading(true)
            const response = await getData(params.slug);
            if (response.status) {
                setLoading(false);
                setCompetitionData({
                    uuid: response.data.questions_associated[0].uuid,
                    slug: params.slug,
                    hasAttempted: true,
                });
            } else {
                // alert("OOps!! something went wrong!")
                history.push("/activities")
                lockSystem.openPopUp("ONLY_TEXT", "Oops, something went wrong. ")
                setLoading(false)
            }
        }
        else {
            history.push("/not-found")
        }


    }, [])
    useEffect(() => {
    }, [file])

    return (
        <EssayCompetitionComponent loading={loading} submit={submit} setfile={setfile} file={file} />
    )
}
export default EssayCompetitionController;