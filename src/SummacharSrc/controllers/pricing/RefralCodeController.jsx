import axios from "axios"
import { useEffect, useState } from "react"
import apiUrl from "../../common/apiUrl"
import { getHeaders, getUserUuid, resetToken, setAuthToken } from "../../common/helper"
import RefralCode from "../../pages/auth/RefralCode"

const RefralCodeController = (props) => {
    const [loading, setLoading] = useState(false)
    
    const [error, setError] = useState("")
    const onPopState = () => {
        props.onClosePopUp()
    }
    useEffect(() => {
        window.addEventListener('popstate', onPopState)
        return () => {
            return window.removeEventListener('popstate', onPopState)
        }
    }, [])
    const applyCode = async () => {
        setLoading(true)
        // const body = { coupon_code: props.refralCode, sub_plan_uuid: props.planId }
        return await axios({
            url: apiUrl.checkCouponCodeUrl + '?coupon_code=' + props.refralCode.code + "&sub_plan_uuid=" + props.planId,
            headers: getHeaders(),
            method: "GET",
            // data: body
        }).then((response) => {
            props.setAmount(response.data.amount_with_gst)
            props.onSubmit()
            setLoading(false)
        }).catch(async (error) => {
            if (error.response.status === 401) {
                await resetToken(() => { applyCode() })
            }
            if (error.response.status === 400|| error.response.status === 409) {
                setError(error.response.data.description)                
            }
            setLoading(false)
        })
    }
    return (
        <>
            <RefralCode
               
                refralCode={props.refralCode}
                setRefralCode={props.setRefralCode}
                onSayNo={props.onSayNo}
                error={error}
                setError={setError}
                loading={loading}
                onClosePopUp={props.onClosePopUp}
                applyCode={applyCode}
            />
        </>
    )
}
export default RefralCodeController