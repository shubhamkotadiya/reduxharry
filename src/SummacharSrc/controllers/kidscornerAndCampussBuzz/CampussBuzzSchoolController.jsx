import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import apiUrl from "../../common/apiUrl"
import { getHeaders, getUserUuid, handleError, resetToken } from "../../common/helper"
import Loader from "../../components/Loader"
import StorykidsCornerAndCampusBuzz from "../../pages/privatePages/kidscornerAndCampuusBuzz/StorykidsCornerAndCampusBuzz"

const CampussBuzzSchoolController = () => {
    const [data, setData] = useState({})
    const [scrollLoading, setScrollLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const getData = async (school_name) => {
        return await axios({
            url: apiUrl.storyUrl + "?category=campus_buzz&school_name=" + school_name + "&user-uuid=" + getUserUuid(),
            method: "GET",
            headers: getHeaders()
        }).then(res => {

            return { status: true, code: res.status, data: res.data }

        }).catch(error => {
            if (error.response.status === 401) {
                return resetToken(async () => { getData(school_name) })
            } else {
                handleError(error)
                return { status: false, code: error.response.status }
            }

        })
    }
    const params = useParams()
const schoolName = params.school_name
    useEffect(() => {
        (async () => {
            
            setLoading(true)
            const response = await getData(schoolName)
            if (response.status) {
                const temp = {}
                temp[schoolName] = response.data
                setData(temp)
            } else {
                toast.error("oops! something went wrong")
            }
            setLoading(false)
        })()
    }, [])

    const getTitle = (title) => {

        return title

    }

    const onScroll = async (ref) => {

    }
    if (loading) {
        return (
            <>
                <Loader />
            </>
        )
    } else {
        return (
            <>
                <StorykidsCornerAndCampusBuzz
                    fromCampussBuzzSchool={true}
                    getTitle={getTitle}
                    onScroll={onScroll}
                    scrollLoading={scrollLoading}
                    data={data}
                />
            </>
        )
    }

}
export default CampussBuzzSchoolController