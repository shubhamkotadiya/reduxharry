import { useContext, useEffect, useReducer, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Store } from '../../../App'
import {
  getCurrentTimeString,
  getFirstQuizAttempt,
  isFreeTrial,
  resetToken
} from '../../../common/helper'
import useQuiz from '../../../customHooks/useQuiz'
import quizReducer from '../../../reducers/quizReducer'
import QuizComepititionComponent from './QuizComepititionComponent'

const QuizComepititionController = () => {
  const [isLoading, setLoading] = useState(true)
  const [quizData, dispatchQuiz] = useReducer(quizReducer, {
    data: [],
    hasAttempted: false,
    score: 0,
    totalScore: 0,
    quizStartedTime: getCurrentTimeString()
  })
  const [showResult, setShowResult] = useState({
    status: false,
    data: {
      correct_count: 0,
      incorrect_count: 0,
      score: 0,
      total_score: 0,
      unattempted_count: 0
    }
  })
  const [time, setTime] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const params = useParams()
  const history = useHistory()
  const quiz = useQuiz(quizData, dispatchQuiz)
  const liveQuizData = useContext(Store).liveQuiz
  const popularQuizData = useContext(Store).popularQuiz
  const upcomingQuizData = useContext(Store).upcomingQuiz
  const practiceQuizData = useContext(Store).practiceQuiz
  const recentQuizData = useContext(Store).recentQuiz
  const newestFirstQuizData = useContext(Store).newestFirst
  const unattemptedFirstData = useContext(Store).unAttemptedFirst
  const attemptedQuizFirstData = useContext(Store).attemptedFirst
  useEffect(async () => {
    if (params.slug) {
      setLoading(true)
      const response = await quiz.getData(params.slug)
      if (response.status) {
        if (
          !isFreeTrial() ||
          (response.data.has_attempted && !getFirstQuizAttempt())
        ) {
        }
        let time = []
        let i = 0
        for (let question of response.data) {
          if (question.attempt && question.attempt.attempt_time) {
            time[i] = question.time_per_question - question.attempt.attempt_time
          } else {
            time[i] = question.time_per_question
          }

          i++
        }
        setTime(time)
      }
      setLoading(false)
    } else {
      history.push('/home')
    }
  }, [])
  const submitAnswer = (submitedAnswer, optionIndex) => {
    quiz.submitAnswer(
      submitedAnswer,
      optionIndex,
      currentQuestion,
      quiz.data[currentQuestion].time_per_question - time[currentQuestion]
    )
  }
  const findAndUpdate = (context, slug,onlyUpdate=false) => {
    const temp = { ...context.data }
    const data = temp.data
    if (data && data.length > 0) {
      let i = 0
      for (let row of data) {
        if (row.slug === slug) {
          if(!onlyUpdate){
            temp.count = temp.count - 1
            temp.currentPage = 1
            const poppedData = temp.data.splice(i, 1)
            poppedData[0].has_attempted = true
            context.setData(temp)
            return poppedData[0]
          }else{
            temp.data[i].has_attempted = true
            context.setData(temp)
            return true;
          }
         
        }
        i++
      }
    }
    return false
  }
  
  const submitQuiz = async () => {
    setLoading(true)
    const response = await quiz.submitQuiz(params.slug)
    if (response.status == true) {
      setShowResult({ ...showResult, status: true, data: response.data })
      let hasRecentAdded = false
      let recentData = {}
      const liveQuizRemoved = findAndUpdate(liveQuizData, params.slug)
      if (!hasRecentAdded && liveQuizRemoved) {
        hasRecentAdded = true
        recentData = liveQuizRemoved
      }
      const upcomingQuizRemoved = findAndUpdate(upcomingQuizData, params.slug)
      if (!hasRecentAdded && upcomingQuizRemoved) {
        hasRecentAdded = true
        recentData = upcomingQuizRemoved
      }
      const popularQuizRemoved = findAndUpdate(popularQuizData, params.slug)
      if (!hasRecentAdded && popularQuizRemoved) {
        hasRecentAdded = true
        recentData = popularQuizRemoved
      }
      const PracticeQuizRemoved = findAndUpdate(practiceQuizData, params.slug)
      if (!hasRecentAdded && PracticeQuizRemoved) {
        hasRecentAdded = true
        recentData = PracticeQuizRemoved
      }

      findAndUpdate(newestFirstQuizData, params.slug,true)
      findAndUpdate(unattemptedFirstData, params.slug,true)
      findAndUpdate(attemptedQuizFirstData, params.slug,true)
      if (hasRecentAdded) {
        const recent = { ...recentQuizData.data }
        recent.count += 1
        recent.currentPage = 1
        recent.data.unshift(recentData)
        recentQuizData.setData(recent)
      }
      setLoading(false)
    } else {
      if (response.code == 401) {
        await resetToken(() => {
          submitQuiz()
          setLoading(false)
        })
      } else {
        alert('something went wrong')
        setLoading(false)
      }
    }
  }

  return (
    <QuizComepititionComponent
      isLoading={isLoading}
      data={quiz.data}
      score={quiz.score}
      totalScore={quiz.totalScore}
      submitAnswer={submitAnswer}
      showResult={showResult}
      submitQuiz={submitQuiz}
      hasAttempted={quiz.hasAttempted}
      currentQuestion={currentQuestion}
      setCurrentQuestion={setCurrentQuestion}
      time={time}
      setTime={setTime}
      goBack={() => {
        if(params.from_notification && params.from_notification=='true'){
          history.push("/activities")
        }else{
          history.goBack()
        }
        
      }}
    />
  )
}
export default QuizComepititionController
