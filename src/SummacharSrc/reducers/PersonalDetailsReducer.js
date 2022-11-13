

const PersonalDetailsReducer = (state, action) => {
    let val = ""
    if (action.type !== "SET_ADDRESS_DATA") {
        val = action.value.charAt(0).toUpperCase() + action.value.slice(1)
    }

    switch (action.type) {
        case 'CHANGE_COUNTRY_NAME': return { ...state, country: val };
        case 'CHANGE_APARTMENT_NAME': return { ...state, apartment: val };
        case 'CHANGE_LAND_MARK_NAME': return { ...state, landmark: val };
        case 'CHANGE_CITY_NAME': return { ...state, city: val };
        case 'CHANGE_STATE_NAME': return { ...state, state: val };
        case 'CHANGE_PINCODE': return { ...state, pincode: val };
        case "SET_ADDRESS_DATA": return { ...action.data }
        case 'RESET_FORM': return {
            country: "",
            apartment: "",
            landmark: "",
            city: "-",
            state: "-",
            pincode: ""
        }



        default: return { ...state }
    }
}
export default PersonalDetailsReducer;