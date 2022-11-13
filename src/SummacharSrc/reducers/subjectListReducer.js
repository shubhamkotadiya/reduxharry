const subjectListReducer = (state,action) =>{
    if(action.type==="SET_DATA"){
        return {...state,data:action.value};
    }
    return state;
}
export default subjectListReducer