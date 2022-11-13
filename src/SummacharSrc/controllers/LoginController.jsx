import axios from "axios";
import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { Store } from "../App";
import apiUrl from "../common/apiUrl";
import { removeToken, resetToken, setAuthToken } from "../common/helper";
import Login from "../pages/auth/Login";
const LoginController = () => {
    const user = useContext(Store).user;
    const history = useHistory();
    const [loginDetails, setLoginDetails] = useState({ email: "", password: "", emailErr: "", passwordErr: "" });
    const [isLoading, setLoading] = useState(false);

    const validate = (value, validationType = { required: true, email: false, password: false }, fieldName) => {
        if (validationType.required && value.trim() == "") {
            return { status: false, message: fieldName + " is Required" }
        }
        if (validationType.email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            return { status: false, message: "Please Enter valid Email address" }
        }
        return { status: true, message: "" };
    }
    const login = async () => {
        let emailValidation = validate(loginDetails.email, { required: true, email: true }, "Email").message;
        let passwordValidation = validate(loginDetails.password, { required: true }, "Password").message;
        if (emailValidation == "" && passwordValidation == "") {
            const loginResponse = await user.login(loginDetails.email, loginDetails.password);
            if (loginResponse.status) {
                localStorage.setItem("AuthToken", loginResponse.data.accessToken);
                localStorage.setItem("refreshToken", loginResponse.data.refreshToken);
                const accessToken = await loginResponse.data.getIdToken().then(
                    (token) => {
                        setAuthToken(token);
                        
                        return token;

                    }
                )
                if (!loginResponse.data.emailVerified) {

                    //redirect to sign up
                } else {
                    const userdataResponse = await user.getUserData();
                    if (!userdataResponse.status) {
                        if (userdataResponse.code == 401) {
                            await resetToken();
                            await user.getUserData();
                        }
                    } else {
                        if (userdataResponse.data.associated_subscription == null || (userdataResponse.data.first_name == "" && userdataResponse.data.last_name == "") || userdataResponse.data.parent_phone == null) {
                            history.push('/signin');
                            user.setLogin(false);
                            removeToken();
                            ////redirect to signup  page
                        } else {
                            user.setLogin(true);
                            history.replace('/home');
                        }


                    }

                }

            } else {
                // case "auth/user-not-found" : return "User is not registered.";
                if (loginResponse.code === "auth/wrong-password") {
                    setLoginDetails({ ...loginDetails, passwordErr: loginResponse.message })
                } else {
                    setLoginDetails({ ...loginDetails, emailErr: loginResponse.message })
                }
            }
        } else {
            setLoginDetails({ email: loginDetails.email, emailErr: emailValidation, password: loginDetails.password, passwordErr: passwordValidation })
        }
    }


    return (
        <>
            <Login loginDetails={loginDetails} login={login} validate={validate} isLoading={isLoading} setLoginDetails={setLoginDetails} />
        </>
    );
}
export default LoginController;