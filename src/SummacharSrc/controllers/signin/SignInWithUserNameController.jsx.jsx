import axios from "axios"
import { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { Store } from "../../App"
import apiUrl from "../../common/apiUrl"
import { getAuthToken, getUserUuid, removeFirstQuizAttempt, removeFreeTrialToken, removeRefreshToken, removeToken, removeUserAddressDetails, removeUserUuid, resetToken, setAuthToken, setFreeTrialToken, setRefereshToken, setUserUuid } from "../../common/helper"
import SignInWithUsername from "../../pages/auth/SignInWithUsername"
import SignInWithUserNamePopUp from "../../pages/auth/SignInWithUserNamePopUp"

const SignInWithUserNameController = (props) => {

    const [inputs, setinputs] = useState({
        username: '',
        password: '',
        err: "",
    })
    const [loading, setLoading] = useState(false)
    const handleInputs = (method = "set", field, value = "") => {

        if (method == "set") {
            const temp = { ...inputs }
            temp[field] = value
            if (field != "err") {
                temp['err'] = ''
            }
            setinputs(temp)
        }
        return inputs[field]
    }
    const store = useContext(Store);
    const history = useHistory();

    const handleResponse = async (response) => {
        if (response.code == 200 || response.code == 201) {

            if (response.status == true) {
                setUserUuid(response.data.uuid);

                const userData = response.data;


                if (userData.subject_list && userData.subject_list != null) {
                    userData.subject_list.includes("News") ? userData['has_news_access'] = true : userData['has_news_access'] = false
                } else {
                    userData['has_news_access'] = false
                }
                store.user.setUserData(userData);

                if (response.data.associated_subscription) {

                    if (new Date(response.data.subscription_endtime).getTime() < new Date().getTime()) {
                        setFreeTrialToken();

                    } else {

                        removeFreeTrialToken();
                    }
                } else {

                    setFreeTrialToken();
                }

                store.user.setLogin(true);
                setLoading(false);
            }
            setLoading(false)
        } else {
            if (response.code && response.code == 401) {

                await resetToken(async () => {
                    const res = await store.user.getUserData(); handleResponse(res);
                },
                    async () => {
                        store.user.setLogin(false);

                        removeToken();
                        removeFreeTrialToken();
                        removeUserUuid();
                        removeUserAddressDetails();
                        removeRefreshToken();
                        removeFirstQuizAttempt();
                        setLoading(false);
                        history.push("/signin");


                    })
            } else if (response.code && response.code == 403) {
                store.user.setLogin(false);

                removeToken();
                removeFreeTrialToken();
                removeUserUuid();
                removeUserAddressDetails();
                removeRefreshToken();
                removeFirstQuizAttempt();
                setLoading(false);
                history.push("/signin");
            }
            else {
                history.replace("/signin");
            }


        }
    }
    const setAuth = async () => {
        if (getAuthToken() && getAuthToken() != "") {
            if (getUserUuid()) {

                setLoading(true)

                const response = await Promise.all([
                    store.user.getUserData(),
                    store.subject.getData()
                    // newsletter.getData(),
                ])
                //  = await store.user.getUserData();
                handleResponse(response[0]);

            } else {
                removeToken()
                setLoading(false);
                store.user.setLogin(false);
                history.replace("/signin");
            }

        } else {
            // if (isFreeTrial()) {
            // store.user.setLogin(true);
            // } else {

            store.user.setLogin(false);
            // history.replace("/signin")
            // }

            setLoading(false);
        }
    }
    const signIn = async (e) => {
        e.preventDefault()
        if (inputs.username.trim() == "") {
            handleInputs('set', 'err', 'Please enter username')
            return 0
        }
        if (inputs.password.trim() == "") {
            handleInputs('set', 'err', 'Please enter password')
            return 0
        }
        setLoading(true)
        await axios({
            url: apiUrl.loginWithPassword,
            method: 'POST',
            data: {
                username: inputs.username,
                password: inputs.password
            }
        }).then(async (res) => {
            if (res) {
                const data = res.data
                setAuthToken(data.idToken);
                setRefereshToken(data.refreshToken)
                setUserUuid(data['user-uuid'])
                await setAuth()


            }
        })
            .catch((err) => {
                if (err.response.status == 400) {
                    handleInputs('set', 'err', err.response.data.description)
                    return 0;
                }
                handleInputs('set', 'err', 'Something went wrong')
                return 0;
            })
        setLoading(false)
    }
    if (props.from && props.from === "pricing") {
        return (
            <>
                <SignInWithUserNamePopUp
                    handleInputs={handleInputs}
                    {...props}
                    loading={loading}
                    signIn={signIn}
                    inputs={inputs}

                />
            </>)
    }
    else {
        return (
            <>
                <SignInWithUsername
                    handleInputs={handleInputs}
                    {...props}
                    loading={loading}
                    signIn={signIn}
                    inputs={inputs}

                />
            </>
        )
    }

}
export default SignInWithUserNameController