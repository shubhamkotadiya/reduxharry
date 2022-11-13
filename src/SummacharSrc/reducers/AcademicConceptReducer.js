
const AcademicConceptReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA': return { ...state, data: action.value };
        
        case 'SET_STATE': return { ...state, next: action.value.next, data: action.value.data };
    }
}
export default AcademicConceptReducer;