import React, { useContext, useEffect, useState } from 'react'
import { BreadCrumbContext, Store } from '../App'
import {
  isFreeTrial,
  getHeaders,
  resetToken,
  getUserUuid,
  handleError
} from '../common/helper'
import Loader from '../components/Loader'
import apiUrl from '../common/apiUrl'
import axios from 'axios'
import { toast } from 'react-toastify'
import AcadSubMainPage from '../pages/privatePages/Academics/AcademicSubMain'
import { Route, Switch, useHistory, useRouteMatch } from 'react-router'
import AcademicController from './AcademicController'
import AcademicStatic from '../pages/privatePages/Academics/AcademicStatic'

const AcadSubController = props => {
  const history = useHistory()
  const subContextData = useContext(Store).subject
  const user = useContext(Store).user.data;
  const [loading, setLoading] = useState(false)
  const [subList, setSubjects] = useState([])
  const [freeQuizList, setFreeQuizList] = useState({ data: [] })
  const [freeQuizLoading, setFreeQuizLoading] = useState(false)

  const [form_loading, set_form_loading] = useState(false)
  const defaultVal = {
    name: "",
    email: "",
    message: ""
  }
  const [contactUsData, setContactUsData] = useState(defaultVal);

  useEffect(async () => {
    if (user.user_type !== "NEWS_USER" && user.user_type !== "FREE_USER") {
      if (subContextData.data && subContextData.data.length > 0) {
        setLoading(true)
        setSubjects(subContextData.data)
        setLoading(false)
      } else {
        setLoading(true)
        await getSubjectList()
        setLoading(false)
      }
    }

  }, [subContextData.data])
  const breadCrumb = useContext(BreadCrumbContext);
  useEffect(() => {
    breadCrumb.set(['Academics'])
  }, [])
  useEffect(async () => {
    if (user.user_type !== "NEWS_USER" && user.user_type !== "FREE_USER") {
      setFreeQuizLoading(true)
      await getFreeQuizes()
      setFreeQuizLoading(false)
    }
  }, [])
  const getFreeQuizes = async () => {
    return await axios({
      url: apiUrl.acadFreeQuiz + '?user-uuid=' + getUserUuid(),
      method: 'GET',
      headers: getHeaders()
    })
      .then(res => {
        if (res.data && res.data.results) {
          setFreeQuizList({ ...freeQuizList, data: res.data.results })
        }
      })
      .catch(async err => {
        if (err.response.status == 401) {
          await resetToken(async () => {
            getFreeQuizes()
          })
        }
        handleError(err)
      })
  }
  // useEffect(async () => {
  //     //console.log(subList)
  // }, [subList])

  const getSubjectList = async () => {
    return await axios({
      url: apiUrl.subjectList + '?user-uuid=' + getUserUuid(),
      method: 'GET',
      headers: getHeaders()
    })
      .then(res => {
        setSubjects(res.data)
        return { status: true }
      })
      .catch(async error => {
        // if (error.length > 0) {
        if (error.response.status == 401) {
          await resetToken()
          await getSubjectList()
        } else {
        }
        handleError(error)
        return { status: false }
        // }
      })
  }
  const quizPopUpOpen = slug => {
    history.push('/activity/' + slug)
  }


  const submitForm = async (e) => {
    e.preventDefault();
    set_form_loading(true)
    if (contactUsData.name === "") {
      toast.error("Please Enter  Name.")
      set_form_loading(false)
      return 0;
    }
    if (contactUsData.email === "" || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(contactUsData.email)) {
      toast.error("Please Enter valid Email")
      set_form_loading(false)
      return 0;
    }
    if (contactUsData.message === "") {
      toast.error("Please Enter small message.")
      set_form_loading(false)
      return 0;
    }
    await axios({
      url: apiUrl.contactUsUrl,
      method: "post",
      data: {
        name: contactUsData.name,
        email: contactUsData.email,
        message: contactUsData.message
      }
    }).then(() => {
      toast.success("We have received your message and will revert within 24 hours");
      setContactUsData(defaultVal)

    }).catch((error) => {
      handleError(error)
      toast.error("OOPS! Something Went Wrong!")
    })

    set_form_loading(false)
    return 1;
  }

  if (!loading) {
    if (user.user_type !== "NEWS_USER" && user.user_type !== "FREE_USER") {
      return (
        <AcadSubMainPage
          location={props.location}
          quizPopUpOpen={quizPopUpOpen}
          freeQuizLoading={freeQuizLoading}
          freeQuizList={freeQuizList}
          contactUsData={contactUsData}
          setContactUsData={setContactUsData}
          form_loading={form_loading}
          set_form_loading={set_form_loading}
          subList={subList}
          submitForm={submitForm}
        ></AcadSubMainPage>
      )
    } else {
      return (<><AcademicStatic /></>)
    }
  } else {
    return <Loader></Loader>
  }
}

export default AcadSubController
