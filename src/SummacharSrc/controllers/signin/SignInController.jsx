import { RecaptchaVerifier, signInWithPhoneNumber } from '@firebase/auth'
import React, { useContext, useReducer, useState } from 'react'
import {
  increaseStep,
  setLoading,
  setSelctedUser,
  setStep
} from '../../actions/signInAction'
// import { auth } from '../../common/firebaseConfig'
import { toast } from 'react-toastify'
import Register from '../../pages/auth/Register'

import signInReducer from '../../reducers/signInReducer'
import axios from 'axios'
// import apiUrl from '../../common/apiUrl'
import {
  getHeaders,
  isApp,
  isFreeTrial,
  removeFreeTrialToken,
  setAuthToken,
  setFreeTrialToken,
  setRefereshToken,
  setUserUuid
} from '../../common/helper'
import { Store } from '../../App'
import { useHistory } from 'react-router'
import RegisterPopUp from '../../pages/auth/RegisterPopUp'
import { auth } from '../../common/firebaseConfig'
import apiUrl from '../../common/apiUrl'
export const signInDefaultData = {
  selctedUser: { uuid: '', name: '', pathshala: '' },
  phoneNo: '',
  otp: '',
  pathshala: '',
  step: 0,
  loading: false
}
const SignInController = (props) => {
  const user = useContext(Store).user
  const subjects = useContext(Store).subject
  const history = useHistory()
  const [showDrop, changeDrop] = useState(0)
  const [elementRefreshKey, setElementRefreshKey] = useState(0)
  const [newUser, setnewUser] = useState('')
  const [errors, seterror] = useState("x")
  const [iserr, iserror] = useState(false);
  const [dropDownData, setDropDownData] = useState([])
  const [PathShalDropDownData, setPathShalDropDownData] = useState([])
  const MobilePrefix = '+91'

  const [signInDetails, dispatchSignInDetails] = useReducer(signInReducer, signInDefaultData)
  const setCaptcha = async () => {
    if (signInDetails.phoneNo != '') {
      dispatchSignInDetails(setLoading(true))
      window.recaptchaVerifier = new RecaptchaVerifier(
        'sign-in-button',
        {
          size: 'invisible',
          callback: response => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // await onSignInSubmit();
          },
          'expired-callback': () => {
            iserror(true);
            seterror('Captcha has expired! Please refresh the page')
          }
        },
        auth
      )
    }
  }
  const onSignInSubmit = async e => {
    if (e) {
      e.preventDefault()
    }

    // alert(appVerifier.verify())
    if (signInDetails.phoneNo != '') {
      //setCaptcha()
      //if (window.recaptchaVerifier) {
      //  dispatchSignInDetails(setLoading(true))
      //  return await signInWithPhoneNumber(
      //    auth,
      //    MobilePrefix + signInDetails.phoneNo,
      //    window.recaptchaVerifier
      //  )
      //    .then(confirmationResult => {
      //      window.confirmationResult = confirmationResult
      dispatchSignInDetails(setLoading(true))
      await axios({
        url: apiUrl.createOtpUrl,
        method: 'POST',
        data: {
          "phone_number": "+91" + signInDetails.phoneNo
        }
      })
        .then(res => {
          iserror(false);
          if (signInDetails.step == 1) {
            setElementRefreshKey(elementRefreshKey == 0 ? 1 : 0)
          } else {
            dispatchSignInDetails(increaseStep())
          }
          dispatchSignInDetails(setLoading(false))
          return { status: true }
        })
        .catch(err => {
          iserror(true);

          dispatchSignInDetails(setLoading(false))
          if (err.response) {
            if (err.code === 'auth/too-many-requests') {
              seterror('Too many login attempts have been made. Please try after sometime.')
            } else {
              seterror("SMS can't be sent on " + signInDetails.phoneNo);
            }
          } else if (err.request) {
            seterror("Please check your internet");
          }
          else {
            seterror("Unknown error occured. Please contact the developers.");
          }
        })
    }
  }

  const verifyOTP = async () => {
    dispatchSignInDetails(setLoading(true))
    if (signInDetails.otp != '' && signInDetails.otp.length == 4) {
      await axios({
        url: apiUrl.verifyOtpUrl,
        method: 'POST',
        data: {
          "phone_number": "+91" + signInDetails.phoneNo,
          "otp": signInDetails.otp
        }
      }).then(async result => {

        setAuthToken(result.data.idToken)
        setRefereshToken(result.data.refreshToken)
        await getUserList()

        dispatchSignInDetails(increaseStep())
        dispatchSignInDetails(setLoading(false))

      }).catch(err => {
        iserror(true);
        if (err.response.status == 403) {
          seterror('OTP is wrong')
        } else if (err.response.status == 402) {
          seterror('OTP has expired, request again')
        } else {
          seterror('Oops! Something went wrong')
        }

        dispatchSignInDetails(setLoading(false))

      })
    }
  }
  let getPartnerList = async () => {
    await axios({
      url: apiUrl.partnerListUrl,
      method: "get",
      // headers: getHeaders(),
    }).then((res) => {
      setPathShalDropDownData(res.data)
      // for (let i = 0; i < res.data.length; i++) partners.push(res.data[i].school_name);

    });

  };
  const getUserList = async () => {
    dispatchSignInDetails(setLoading(true))

    getPartnerList()
    await axios({
      url: apiUrl.usernameListUrl,
      method: 'GET',
      headers: getHeaders(false)
    })
      .then(res => {
        iserror(false);
        setDropDownData(res.data)
        if (res.data.length > 0) {
          const firstuser = res.data[0];
          dispatchSignInDetails(
            setSelctedUser(
              firstuser.uuid,
              firstuser.full_name,
              firstuser.username,
              firstuser.associated_school
            )
          )
        }
        dispatchSignInDetails(setLoading(false))
      })
      .catch(() => {
        dispatchSignInDetails(setLoading(false))
        // toast.error("Something went wrong");
      })
  }
  const addUser = async () => {
    dispatchSignInDetails(setLoading(true))
    await axios({
      url: apiUrl.profileUrl + '?create-new-user=true',
      method: 'PATCH',
      headers: getHeaders(),
      data: {
        full_name: newUser
      }
    })
      .then(res => {
        iserror(false);
        setDropDownData([...dropDownData, res.data])
        setnewUser('')
        dispatchSignInDetails(
          setSelctedUser(res.data.uuid, res.data.full_name, res.data.username, res.data.associated_school)
        )
        changeDrop(0)
        dispatchSignInDetails(setLoading(false))
      })
      .catch(() => {
        iserror(true);
        dispatchSignInDetails(setLoading(false))
        seterror('Something went wrong')
      })
  }

  const signIn = async () => {
    for (let data of dropDownData) {
      if (data.uuid === signInDetails.selctedUser.uuid) {
        if (data.subject_list && data.subject_list != null) {
          data.subject_list.includes('News')
            ? (data['has_news_access'] = true)
            : (data['has_news_access'] = false)
        } else {
          data['has_news_access'] = false
        }
        data['associated_school'] = signInDetails.pathshala
        user.setUserData(data)
        setUserUuid(data.uuid)

        dispatchSignInDetails(setLoading(true))
        await subjects.getData()
        dispatchSignInDetails(setLoading(false))
        if (data.associated_subscription) {
          user.setLogin(true)
          if (
            new Date(data.subscription_endtime).getTime() < new Date().getTime()
          ) {
            setFreeTrialToken()
          } else {
            removeFreeTrialToken()
          }
          if (props.from && props.from === "pricing") {
            props.onLogin();
          } else {
            if (isApp() && !isFreeTrial()) {
              history.replace('/home')
            } else {
              history.replace('/home')
            }
          }
        } else {
          user.setLogin(true)
          if (props.from && props.from === "pricing") {
            props.onLogin();
          } else {
            onselectSubscriptionOption()
          }
          /*dispatchSignInDetails(setStep(3))*/

        }
      }
    }
    
    if (!(signInDetails.selctedUser.pathshala && signInDetails.selctedUser.pathshala != '') && signInDetails.pathshala != '') {
      await axios({
        url: apiUrl.profileUrl + "?user-uuid=" + signInDetails.selctedUser.uuid,
        method: "PATCH",
        headers: getHeaders(),
        data: { associated_school: signInDetails.pathshala },
      })
    }

  }

  const onselectSubscriptionOption = async (isFreeTrial = true) => {
    if (isFreeTrial) {
      // user.setLogin(true)
      await setFreeTrialToken()
      history.push('/home')
    } else {
      history.push('/home')
    }
  }
  const showDrops = () => {
    changeDrop(!showDrop)
  }
  const createUserAndSignIn = async () => {
    dispatchSignInDetails(setLoading(true))
    const response = await axios({
      url: apiUrl.profileUrl + '?create-new-user=true',
      method: 'PATCH',
      headers: getHeaders(),
      data: {
        full_name: newUser
      }
    })
      .then(async res => {
        // setDropDownData([...dropDownData, res.data])
        iserror(false);
        setnewUser('')
        const data = res.data
        if (data.subject_list && data.subject_list != null) {
          data.subject_list.includes('News')
            ? (data['has_news_access'] = true)
            : (data['has_news_access'] = false)
        } else {
          data['has_news_access'] = false
        }
        user.setUserData(data)
        user.setUserData(data)
        setUserUuid(data.uuid)

        await subjects.getData()

        if (data.associated_subscription) {
          user.setLogin(true)
          if (
            new Date(data.subscription_endtime).getTime() < new Date().getTime()
          ) {
            setFreeTrialToken()
          } else {
            removeFreeTrialToken()
          }
          if (props.from && props.from === "pricing") {
            props.onLogin();
          } else {
            if (isApp() && !isFreeTrial()) {
              history.replace('/home')
            } else {
              history.replace('/home')
            }
          }
        } else {
          if (props.from && props.from === "pricing") {
            props.onLogin();
          } else {
            user.setLogin(true)
            onselectSubscriptionOption()
          }

        }

        dispatchSignInDetails(
          setSelctedUser(data.uuid, data.full_name, data.username, data.associated_school)
        )
        dispatchSignInDetails(setLoading(false))
        return { status: true }
      })
      .catch(() => {
        iserror(true);
        dispatchSignInDetails(setLoading(false))
        seterror('Something went wrong')
        return { status: false }
      })
  }
  if (props.from && props.from === "pricing") {
    return (

      <RegisterPopUp
        {...props}
        onClosePopUp={props.onClosePopUp}
        signInDetails={signInDetails}
        dispatchSignInDetails={dispatchSignInDetails}
        showDrop={showDrop}
        createUserAndSignIn={createUserAndSignIn}
        signIn={signIn}
        addUser={addUser}
        dropDownData={dropDownData}
        verifyOTP={verifyOTP}
        setCaptcha={setCaptcha}
        onSignInSubmit={onSignInSubmit}
        showDrops={showDrops}
        onselectSubscriptionOption={onselectSubscriptionOption}
        newUser={newUser}
        setnewUser={setnewUser}
        elementRefreshKey={elementRefreshKey}
        setDropDownData={setDropDownData}
        errors={errors}
        iserr={iserr}
        PathShalDropDownData={PathShalDropDownData}
      />

    );
  } else {
    return (
      <Register
        {...props}
        signInDetails={signInDetails}
        dispatchSignInDetails={dispatchSignInDetails}
        showDrop={showDrop}
        createUserAndSignIn={createUserAndSignIn}
        signIn={signIn}
        addUser={addUser}
        dropDownData={dropDownData}
        verifyOTP={verifyOTP}
        setCaptcha={setCaptcha}
        onSignInSubmit={onSignInSubmit}
        showDrops={showDrops}
        onselectSubscriptionOption={onselectSubscriptionOption}
        newUser={newUser}
        setnewUser={setnewUser}
        elementRefreshKey={elementRefreshKey}
        setDropDownData={setDropDownData}
        errors={errors}
        iserr={iserr}
        PathShalDropDownData={PathShalDropDownData}
      />
    )
  }
}
export default SignInController
