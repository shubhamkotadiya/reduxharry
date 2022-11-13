import axios from "axios"
import { toast } from "react-toastify"
import { setData } from "../actions/KidsCornerAction"
import apiUrl from "../common/apiUrl"
import { getHeaders, getUserUuid, handleError, resetToken } from "../common/helper"

const getData = async () => {
    return await axios({
        url: apiUrl.kidsCornerUrl + "?user-uuid=" + getUserUuid(),
        method: "GET",
        headers: getHeaders()
    }).then(res => {
        if (res.status == 200 || res.status == 201) {
            return { status: true, code: res.status, data: res.data }
        }
    }).catch(error => {
        if (error.response.status === 401) {
            return resetToken(async () => { getData() })
        } else {
            handleError(error)
            return { status: false, code: error.response.status }
        }

    })
}

const useKidsCorner = (state, dispatch) => {


    const passData = {
        data: state.data,
        getData: async () => {
            const response = await getData();
            if (response.status) {
                dispatch(setData(response.data))
            } else {
                toast.error("Oops! something went erong")
            }
        },
        deleteData: async (data) => {
            return await axios({
                url: apiUrl.kidsCornerUrl + "?user-uuid=" + getUserUuid() + "&uuid=" + data.uuid,
                method: "DELETE",
                headers: getHeaders()
            }).then(res => {
                if (res.status == 200 || res.status == 201) {
                    return { status: true, code: res.status, data: res.data }
                }
            }).catch(error => {
                if (error.response.status === 401) {
                    return resetToken(async () => { getData() })
                } else {
                    handleError(error)
                    return { status: false, code: error.response.status }
                }

            })
        }

    }
    return passData
}
export default useKidsCorner