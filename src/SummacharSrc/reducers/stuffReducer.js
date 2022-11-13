const stuffReducer = (state, action) => {
    if (action.type === "SET_DATA") {
        return action.value;
    }
    return state;
}
export default stuffReducer