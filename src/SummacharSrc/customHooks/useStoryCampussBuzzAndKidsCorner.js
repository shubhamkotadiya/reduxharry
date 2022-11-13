import axios from "axios"
import { toast } from "react-toastify"
import { setDataAndLink } from "../actions/campussBuzzAction"
import { setData } from "../actions/KidsCornerAction"
import apiUrl from "../common/apiUrl"
import { getHeaders, getUserUuid, handleError, resetToken } from "../common/helper"

const getData = async (url = "", category = "campus_buzz") => {
    return await axios({
        url: url != "" ? url : apiUrl.storyUrl + "?category=" + category + "&user-uuid=" + getUserUuid(),
        // url: url!="" ? url : apiUrl.storyUrl + "?user-uuid=" + getUserUuid(),
        method: "GET",
        headers: getHeaders()
    }).then(res => {
        // if (res.status == 200 || res.status == 201) {
        return { status: true, code: res.status, data: res.data }
        // }
    }).catch(error => {
        if (error.response.status === 401) {
            return resetToken(async () => { getData(url) })
        } else {
            handleError(error)
            return { status: false, code: error.response.status }
        }

    })
}

const useStoryCampussBuzzAndKidsCorner = (state, dispatch, category) => {


    const passData = {
        data: state.data,
        next: state.next,
        getData: async (fromScroll = false) => {
            const response = await getData(fromScroll ? state.next : "", category);
            if (response.status) {
                if(category==="campus_buzz"){
                    dispatch(setDataAndLink(response.data, ''))
                }else{
                    const next = response.data.next && response.data.next != null ? response.data.next : ""
                    const temp = [...state.data];
                    
                    for (let row of response.data) {
                        temp.push(row)
                    }
                    dispatch(setDataAndLink(temp, next))
                    return true
                }
              
            } else {
                toast.error("Oops! something went wrong")
                return false
            }
        },
        setData:(data)=>{
            dispatch(setDataAndLink(data, ''))
        }

    }
    return passData
}
export default useStoryCampussBuzzAndKidsCorner