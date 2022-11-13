export const setData = (data) => {
    return{
        type:"SET_DATA",
        value:data
    }
}
// export const setLoading = (status)=>{
//     return{
//         type:"SET_LOADING",
//         value:status
//     }
// }
export const setState = (data,next) => {
    return{
        type:"SET_STATE",
        value:{
            data:data,          
            next:next  
        }
    }
}
export const submitQuiz = (attempted_answer,chapter,subchapter,storyIndex,quizIndex) => {
    return{
        type:"SUBMIT_QUIZ",
        value:{
            attempted_answer:attempted_answer,
            chapter:chapter,
            subchapter:subchapter,
            storyIndex:storyIndex,
            quizIndex:quizIndex
        }
    }
}
export const setBookMark = (status,chapter,subchapter,storyIndex) => {
    return{
        type:"BOOKMARK",
        value:{
            status:status,
            chapter:chapter,
            subchapter:subchapter,
            storyIndex:storyIndex
        }
    }
}
export const readStory = (chapter,subchapter,storyIndex)=>{
    return{
        type:"BOOKMARK",
        value:{       
            chapter:chapter,     
            subchapter:subchapter,
            storyIndex:storyIndex
        }
    }
}