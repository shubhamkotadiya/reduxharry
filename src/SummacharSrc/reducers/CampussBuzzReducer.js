const CampussBuzzReducer = (state, action) => {
    if (action.type === "SET_DATA") {
        return { ...state, data: action.value };
    }
    if (action.type === "SET_DATA_AND_NEXT_LINK") {
        return { ...state, data: action.value.data, next: action.value.next };
    }
    return state;
}
export default CampussBuzzReducer