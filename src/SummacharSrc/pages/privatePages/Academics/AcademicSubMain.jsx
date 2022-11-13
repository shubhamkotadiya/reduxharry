import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Boy from '../../../assets/images/avtar/boy.svg'
import { useRouteMatch } from 'react-router'
import PremiumPopUp from '../../../components/premiumPop'
import { isApp, premiumInt, setDateToAppFormat } from '../../../common/helper'
import ActivityCard from '../activityCenter/ActivityCard'
import SplashScreen from '../activityCenter/SplashScreen'
import AccessBadges from '../../../components/lockingsystem/access_badges_component/AccessBadges'
import { Store } from '../../../App'
import ActivityCardQuizList from '../activityCenter/ActivityCardQuizList'
import BarSplashScreen from '../../../components/BarSplashScreen'
import CustomInput from '../../../components/CustomInput'
import { GridContext } from '../../../common/GridConfig'
import { Grid } from '@mui/material'

const AcadSubMainPage = props => {
  let [isVisible, changeVisibility] = useState(false)
  let [popupContent, setContent] = useState('')
  const GridConfig = useContext(GridContext)
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth })
  const targetRef = useRef(null)
  const user = useContext(Store).user.data;
  const scrollToTarget = () => {
    setTimeout(() => {
      if (targetRef) {
        targetRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }, 200)
  }
  useEffect(() => {
    if (props.location.state && props.location.state.fromQuiz) {

      scrollToTarget()
    }
  }, [])

  const contactUsData = props.contactUsData;
  const setContactUsData = props.setContactUsData;
  const loading = props.form_loading;
  const set_form_loading = props.set_form_loading;
  const submitForm = props.submitForm;
  const onResize = () => {
    setWindowSize({ width: window.innerWidth })
  }

  useEffect(() => {
    onResize()
    window.addEventListener('resize', onResize)
    return () => {
      return window.removeEventListener('resize', onResize)
    }
  }, [])


  const { path, url } = useRouteMatch()
  return (
    <>
      {isVisible && (
        <PremiumPopUp
          changeVisibility={changeVisibility}
          description={popupContent}
        ></PremiumPopUp>
      )}
      <div
        className='wrapper_container enter_animation subMain_container news_container'
        id='news_container'
      >
        <div className='common-grid-outer'>
          <div className="centered_outer_container">

            <div className="title-div p-h-secondary" style={{ marginBottom: "0px" }} >
              <div className="title heading-text"  ><b>Subjects</b></div>
            </div>

            {props.subList.length > 0 && (
              <div className="df flex-1 m-h-primary" style={{ overflowX: "hidden" }}>
                <Grid className="row grid-top-padding" container spacing={GridConfig.spacing}>
                  {props.subList.map(function (sub, keyIndex) {
                    return (
                      <Grid container key={keyIndex} item xs={GridConfig.tiles_at_xs} sm={GridConfig.tiles_at_sm} md={GridConfig.tiles_at_md}>
                        <div className='df row p-relative' key={sub.uuid}>
                          <AccessBadges live_date={"\" " + setDateToAppFormat(sub.live_date) + " \" "} premium_intrest_string={"academics/" + sub.subject_name} calledFrom="SUBJECT" data={sub} subject_has_access={user.subject_list && user.subject_list.indexOf(sub.subject_name) !== -1} />
                          <Link
                            to={path + sub.subject_name }
                            className="df row radius-primary info-tile"

                          >
                            <div className="hover-tile radius-primary fit-content pointer" >

                            </div>
                            <img
                              className='df row radius-primary'
                              src={sub.cover_image}
                              alt=''
                              style={{
                                height: "100%",
                                borderRadius: "12px"
                              }}
                            />
                          </Link>
                        </div>
                      </Grid>
                    )

                  })}
                </Grid>
              </div>
            )}
            <div className="df row" ref={targetRef}></div>
            {((props.freeQuizList.data && props.freeQuizList.data.length > 0) ||
              props.freeQuizLoading) && (

                <div className="title-div m-v-primary p-h-secondary" style={{ marginBottom: "0px" }} >
                  <div className="title heading-text"  ><b>Quizzes</b></div>
                </div>
              )}


            <div className="outer-main-container grid-top-padding">
              <div className="quiz-list-inner  df" style={{
                // paddingBottom: "30px" 
              }}>

                <div className="quiz-list-grid df row" style={{ flexWrap: "wrap", position: "relative" }}>
                  {props.freeQuizList.data &&
                    props.freeQuizList.data.length > 0 &&
                    !props.freeQuizLoading &&
                    props.freeQuizList.data.map((data, index) => {
                      return (

                        <ActivityCardQuizList hide_attempt_quiz={true} openPopUp={(type, slug, img) => { props.quizPopUpOpen(slug) }} called_from="FREE_QUIZ" key={index} is_free_Activity={true} data={data} />
                      )
                    })}
                  {props.freeQuizLoading && <BarSplashScreen />}
                </div>

              </div>

            </div>



            <div className='title column df row'
              style={{
                alignItems: "flex-start",
                marginLeft: (windowSize.width >= 600) ? 32 : 16,
                cursor: "default"
              }}
            >
              <b className="heading-text df row"
                style={{
                  color: "#777777",
                  lineHeight: "100%",
                  margin: (windowSize.width >= 600) ? "32px auto 12px auto" : "16px auto 6px auto"
                }}>Doubts Solving</b>
              <p className="df row description-text heading-sub" style={{ lineHeight: "24px" }}>Want to get your doubt solved?</p>
              <p className="df row description-text heading-sub" style={{ lineHeight: "24px" }}>Or Want us to make an infographic on a specific concept?</p>
              <p className="df row description-text heading-sub" style={{ lineHeight: "24px" }}>Or Just say hello?</p>
              <p className="df row description-text heading-sub line-margin">Write to us and we will get back to you within 24 hours!</p>
              {/* <div className="grayline"></div> */}
            </div>

            <div className="outer-main-container" style={{ cursor: "default" }}>
              <div className="quiz-list-inner  df" style={{ paddingBottom: "30px" }}>

                <div className="quiz-list-grid df row" style={{ flexWrap: "wrap", position: "relative" }}>
                  <form onSubmit={submitForm} className="row column df ">
                    <div className="custom-row df column doubts_input">
                      <CustomInput
                        disabled={false}
                        type='text'
                        value={contactUsData.name}
                        // error= {props.signin.numbererr}
                        placeholder={"Enter Your Name"}
                        name=' Name'
                        title=' Name'
                        onChange={e => {
                          setContactUsData({ ...contactUsData, name: e.target.value })
                        }}
                        onBlur={e => {
                          // props.setLoginDetails({...props.loginDetails,emailErr:props.validate(e.target.value,{required:true,email:true},"Email").message})
                        }}
                      />


                    </div>
                    <div className="custom-row df column doubts_input">
                      <CustomInput
                        disabled={false}
                        type='email'
                        value={contactUsData.email}
                        // error= {props.signin.numbererr}
                        // placeHolder="jsbfisdf"
                        placeholder={"Enter Email Address"}
                        name='Email'
                        title='Email'
                        onChange={e => {
                          setContactUsData({ ...contactUsData, email: e.target.value })
                        }}
                        onBlur={e => {
                          // props.setLoginDetails({...props.loginDetails,emailErr:props.validate(e.target.value,{required:true,email:true},"Email").message})
                        }}
                      />
                    </div>



                    <div className="custom-row df column doubts_input">
                      <CustomInput
                        disabled={false}
                        type='textarea'
                        rows={7}
                        value={contactUsData.message}
                        // error= {props.signin.numbererr}
                        name='Message'
                        title='Message'
                        placeholder={"Enter Your Message"}
                        onChange={e => {
                          setContactUsData({ ...contactUsData, message: e.target.value })
                        }}
                        onBlur={e => {
                          // props.setLoginDetails({...props.loginDetails,emailErr:props.validate(e.target.value,{required:true,email:true},"Email").message})
                        }}
                      />
                    </div>
                    <div className=" row " style={{ justifyContent: "flex-start" }}>
                      {!loading && <button className="btn  btn-primary line-margin  df center    radius-primary" style={{ width: "100px", marginRight: "0px", marginLeft: "0px" }}>
                        Send
                      </button>}
                      {loading && <button disabled className="btn disabled   btn-primary line-margin df center   radius-primary" style={{ width: "100px", marginRight: "0px", marginLeft: "0px" }}>
                        Send
                      </button>}
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
export default AcadSubMainPage
