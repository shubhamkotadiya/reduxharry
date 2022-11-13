import Certificate from "../../pages/privatePages/certificate/Certificate"
import { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { getHeaders, getUserUuid, handleError, resetToken } from "../../common/helper"
import apiUrl from "../../common/apiUrl"
import { Link, Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { toast } from "react-toastify"
import { BreadCrumbContext } from "../../App"
import CertificatePopUp from "../../pages/privatePages/certificate/CertificatePopUp"
import { Store} from "../../App"
const CertificateController = () => {
    
    const [data, setData] = useState([])
    const [popUpData, setPopUpData] = useState({})
    const { path, url } = useRouteMatch()
    const location = useLocation()
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const getData = async () => {
        return await axios({
            url: apiUrl.certificateUrl + '?user-uuid=' + getUserUuid(),
            method: 'GET',
            headers: getHeaders()
        }).then((res) => {
            setData(res.data)
        }).catch((err) => {
            if (err.response.status === 401) {
                // return resetToken(async () => {
                //     await getData()
                // })
            } else {
                handleError(err)
                toast.error("Oops something went wrong!")
            }
        })
    }
    const mainbreadCrumb = useContext(BreadCrumbContext);
    
    useEffect(()=>{
        
          mainbreadCrumb.set([<span className="color-blue">Profile</span>,'Certificates'] ,["/profile/profile"] );

         
      },[location,url])
    
    

    useEffect(() => {
        (async () => {
            if (data.length <= 0) {
                setLoading(true)
                await getData()
                setLoading(false)
            }

        })()
    }, [location.pathname])

useEffect(()=>{
    if (location.pathname !== "/profile/certificates") {
        history.replace("/profile/certificates")
    }
},[])
    return (
        <>
            <Switch>
                <Route exact path={path} >
                    <Certificate
                        data={data}
                        onClick={(data) => { setPopUpData(data); history.replace(path + "/view") }}
                        loading={loading}
                    />
                </Route>
                <Route exact path={path + "/view"} >
                    <CertificatePopUp
                        onClosePopUp={() => { setPopUpData({}) }}
                        data={popUpData}

                    />
                </Route>
            </Switch>

        </>
    )
}
export default CertificateController