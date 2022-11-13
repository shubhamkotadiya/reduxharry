
const AcademicRevisionReducer = (state, action) => {
    switch (action.type) {
        case "SET_STATE": return { ...state, data: action.value.data, next: action.value.next };
        
    }
}
export default AcademicRevisionReducer;