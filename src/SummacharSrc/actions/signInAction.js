export const setPhoneNo = (val) => {
    return {
        type: "SET_PHONE_NO",
        value: val
    }
}
export const setOTP = (val) => {
    return {
        type: "SET_OTP",
        value: val
    }
}
export const setPathshala = (val) => {
    return {
        type: "SET_PATHSHALA",
        value: val
    }
}
export const setLoading = (val) => {
    return {
        type: "SET_LOADING",
        value: val
    }
}
export const setSelctedUser = (uuid, name, username, pathshala) => {
    return {
        type: "SET_SELECTED_USER",
        value: { uuid: uuid, name: name + " " + "(" + username + ")", pathshala: pathshala }
    }
}
export const setStep = (val) => {
    return {
        type: "SET_STEP",
        value: val
    }
}
export const increaseStep = () => {
    return {
        type: "SET_STEP_INCREASE",
    }
}
export const refresh_sign_in_data = () => {
    return {
        type: "REFRESH",
    }
}