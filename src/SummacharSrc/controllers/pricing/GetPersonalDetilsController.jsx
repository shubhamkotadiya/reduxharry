import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { changeCityName, changeStateName, setAddressData } from "../../actions/PersonalDetailsAction";
import apiUrl, { StateCityCountry_api_token } from "../../common/apiUrl";
import { getHeaders, getUserAddressDetails, getUserUuid, resetToken, setUserAddressDetails } from "../../common/helper";
import PresonalDetails from "../../pages/auth/PresonalDetails";
import PersonalDetailsReducer from "../../reducers/PersonalDetailsReducer";

const GetPersonalDetilsController = (props) => {
    const [countrylist, setCountryList] = useState([])
    const [stateList, setStateList] = useState([])
    const [citylist, setCityList] = useState([])
    const [loading, setLoading] = useState(true)
    const [stateloading, setStateloading] = useState(false)
    const [cityloading, setCityloading] = useState(false)
    const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJzb2hhbXBhdGVsOTQwM0BnbWFpbC5jb20iLCJhcGlfdG9rZW4iOiJLT3U4dXIyYVoxT0FKcFNwMFZ3dVBUQWhLQTFNQWozbzJJNUNvUXNCaFR5Zm5sVS1NdGFSeUpub2VubUlIallzUnZVIn0sImV4cCI6MTY0MDg0NTgzOX0.2xXbJ6x-Nt_wRFsxIuC9oEChhg-ADVDZXZHuEScicCw");
    const [formData, dispatchForFormData] = useReducer(PersonalDetailsReducer, getUserAddressDetails() ? getUserAddressDetails() :
        {
            country: "India",
            apartment: "",
            landmark: "",
            city: "",
            state: "",
            pincode: ""
        })

    const refreshToken = async (callBack = async () => { }) => {
        return await axios({
            url: 'https://www.universal-tutorial.com/api/getaccesstoken',
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "api-token": StateCityCountry_api_token,
                "user-email": "sohampatel9403@gmail.com"
            }

        }).then(async res => {
            setToken(res.data.auth_token)
            await callBack(res.data.auth_token)
            // setCountryList(res.data); setLoading(false)
        })
        // var req = unirest("GET", "https://www.universal-tutorial.com/api/getaccesstoken");

        //   req.headers({
        //     "Accept": "application/json",
        //     "api-token": "AuXnFjES43NqbdODZoc1anLtpO9op_9HsA7hqU56HJoxlbbNrMsUAzmsp6cqoZ0HhWQ",
        //     "user-email": "abc@gmail.com"
        //   });
    }
    const onPopState = () => {
        props.onClosePopUp()
    }
    useEffect(() => {
        window.addEventListener('popstate', onPopState)
        return () => {
            return window.removeEventListener('popstate', onPopState)
        }
    }, [])
    const submitForm = () => {
        if (validate()) {
            setUserAddressDetails(formData)
            props.onSubmit(formData);
        }

    }
    const validate = () => {
        if (formData.country === "") {
            toast.error("Please enter country/region")
            return false
        }
        if (formData.apartment === "") {
            toast.error("Please enter apartment, street name");
            return false;
        }
        if (formData.pincode === "" || isNaN(formData.pincode)) {
            toast.error("Please enter a valid pincode");
            return false;
        }
        if (formData.state === "" || formData.state === "-") {
            toast.error("Please enter state name")
            return false
        }

        if (formData.city === "" || formData.city === "-") {
            toast.error("Please enter city name");
            return false;
        }

        return true;
    }
    const getBillingData = async () => {
        return await axios({
            url: apiUrl.billingDetailsUrl + "?user-uuid=" + getUserUuid(),
            method: 'GET',
            headers: getHeaders()

        }).then((response) => {
            return { status: true, data: response.data }
        }).catch(async (error) => {
            if (error.response.status == '401') {
                return await resetToken(getBillingData)
            } else {
                return { status: false }
            }
        })
    }
    const getCountryStateCityList = async (type = "", State_OR_city = "", Temptoken = "", dontChangeSubList = false) => {
        let url = 'https://www.universal-tutorial.com/api/countries/';
        if (type == "state") {
            setStateloading(true)
            if (!dontChangeSubList) {
                console.log("a gaya")
                dispatchForFormData(changeStateName("-"))
                dispatchForFormData(changeCityName("-"))

            }

            url = "https://www.universal-tutorial.com/api/states/" + State_OR_city
        } else if (type == "city") {
            setCityloading(true)
            if (!dontChangeSubList) {
                console.log("a gaya")
                dispatchForFormData(changeCityName("-"))
            }
            url = "https://www.universal-tutorial.com/api/cities/" + State_OR_city
        } else {

            setLoading(true)
            if (!dontChangeSubList) {
                setCityList([]);
                console.log("a gaya")
                dispatchForFormData(changeStateName("-"))
                dispatchForFormData(changeCityName("-"))
            }
        }
        if (type != "" && State_OR_city == "-") {
            return 0;
        }

        return await axios({
            url: url,
            method: 'GET',
            headers: {
                "Authorization": Temptoken == "" ? "Bearer " + token : "Bearer " + Temptoken,
                "Accept": "application/json"
            }

        }).then(res => {


            if (type == "city") {
                setCityList(res.data);
            } else if (type == "state") {
                setStateList(res.data);
            } else {
                setCountryList(res.data);
            }
            setLoading(false)
            setCityloading(false)
            setStateloading(false)
        }).catch(async err => {
            if (err.response.data.error.name === "TokenExpiredError") {
                await refreshToken((newtoken) => { getCountryStateCityList(type, State_OR_city, newtoken, dontChangeSubList) })
            }
            setLoading(false)
            setCityloading(false)
            setStateloading(false)
        })
    }
    useEffect(() => {
        (async () => {
            const cached_data = getUserAddressDetails()
            if (cached_data) {
                await Promise.all([
                    getCountryStateCityList("", "", "", true),
                    getCountryStateCityList("state", cached_data.country, "", true),
                    getCountryStateCityList("city", cached_data.state, "", true)
                ])

            } else {
                const data_list_response = await getBillingData();
                if (data_list_response.status) {
                    const { address, ...otherAdressDetails } = data_list_response.data

                    dispatchForFormData(setAddressData({ ...otherAdressDetails, apartment: address }))
                    await Promise.all([
                        getCountryStateCityList("", "", "", true),
                        getCountryStateCityList("state", otherAdressDetails.country, "", true),
                        getCountryStateCityList("city", otherAdressDetails.state, "", true)
                    ])

                } else {
                    await Promise.all([
                        getCountryStateCityList("", "", "", true),
                        getCountryStateCityList("state", "India"),
                    ])
                }


            }

        })()
    }, [])
    return (
        <>
            <PresonalDetails
                formData={formData}
                loading={loading}
                countrylist={countrylist}
                stateList={stateList}
                cityList={citylist}
                dispatchForFormData={dispatchForFormData}
                submitForm={submitForm}
                getCountryStateCityList={getCountryStateCityList}
                onClosePopUp={props.onClosePopUp}
                stateloading={stateloading}
                cityloading={cityloading}
            />
        </>
    );
}
export default GetPersonalDetilsController;