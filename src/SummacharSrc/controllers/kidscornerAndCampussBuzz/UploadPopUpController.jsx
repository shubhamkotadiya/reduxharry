import axios from "axios"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import apiUrl from "../../common/apiUrl"
import { getHeaders, getUserUuid, handleError } from "../../common/helper"
import UploadPopUp from "../../pages/privatePages/kidscornerAndCampuusBuzz/UploadPopUp"

const UploadPopUpController = (props) => {
    const history = useHistory()
    const [details, setDetails] = useState({
        name: "",
        description: "",
        file: "",
        fileName: "",
        type: "",
    })
    const [loading, setloading] = useState(false)
    const uplaod = async () => {
        var formData = new FormData();
        formData.append("file", details.file);
        formData.append("title", details.name);
        formData.append("description", details.description);
        formData.append('competition_type', details.type);
        setloading(true)
        const response = await axios({
            url: apiUrl.kidsCornerUrl + "?user-uuid=" + getUserUuid(),
            method: "POST",
            headers: getHeaders(true),
            data: formData,


        }).then(
            async(res) => {
                if (props.onUpload) {
                    await props.onUpload()
                }
                history.replace("/kids-corner")


            }
        ).catch(
            (error) => {
                handleError(error)
                alert("OOPS! something went wrong")
                // setLoading(false)
            }
        )
        setloading(false)
    }
    return (
        <>
            <UploadPopUp
                name={details.name}
                setName={(name) => { setDetails({ ...details, name: name }) }}
                description={details.description}
                setDescription={(description) => { setDetails({ ...details, description: description }) }}
                file={details.file}
                fileName={details.fileName}
                type={details.type}
                setType={(type) => { setDetails({ ...details, type: type }) }}
                setFile={(file, fileName) => { setDetails({ ...details, file: file, fileName: fileName }) }}
                uplaod={uplaod}
                loading={loading}

            />
        </>
    )
}
export default UploadPopUpController