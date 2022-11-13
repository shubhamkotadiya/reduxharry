export const changeCountryName = (val) => {
    return {
        type: "CHANGE_COUNTRY_NAME",
        value: val
    }
}
export const changeApartmentName = (val) => {
    return {
        type: "CHANGE_APARTMENT_NAME",
        value: val
    }
}
export const changeLandmarkName = (val) => {
    return {
        type: "CHANGE_LAND_MARK_NAME",
        value: val
    }
}
export const changeCityName = (val) => {
    return {
        type: "CHANGE_CITY_NAME",
        value: val
    }
}
export const changeStateName = (val) => {
    return {
        type: "CHANGE_STATE_NAME",
        value: val
    }
}
export const changePincode = (val) => {
    return {
        type: "CHANGE_PINCODE",
        value: val
    }
}
export const setAddressData = (data) => {
    return {
        type: "SET_ADDRESS_DATA",
        data: data
    }
}