
import { createContext, useReducer, useState } from 'react';
import { setData } from './actions/newsAction';

import './App.css';
import './assets/css/landing_page_common.css'
import LockingSysytemPopUp from './components/lockingsystem/LockingSysytemPopUp';
import useActivityQuiz from './customHooks/useActivityQuiz';
import useNews from './customHooks/useNews';
import useNewsLetter from './customHooks/useNewsLetter';
import useSubjectList from './customHooks/useSubjectList';
import useStuff from './customHooks/useStuff';
import useUser from './customHooks/useUser';
import userDefault from './defaultValues/userDefault';
import activityQuizReducer from './reducers/activityQuizReducer';
import newsLetterReducer from './reducers/newsLetterReducer';
import newsReducer from './reducers/newsReducer';
import stuffReducer from './reducers/stuffReducer';
import subjectListReducer from './reducers/subjectListReducer';
import userReducer from './reducers/userReducer';
import MainRoute from './routes/MainRoute';
import './assets/css/typography.css'
import GridConfig from './common/GridConfig';
import StuffGridConfig from "./common/StuffGridConfig";

import usePlans from './customHooks/usePlans';
import { ToastContainer } from 'react-toastify';
import KidsCornerReducer from './reducers/KidsCornerReducer'
import { useLocation } from "react-router";
import { Link } from 'react-router-dom';
import useKidsCorner from './customHooks/useKidsCorner';
import CampussBuzzReducer from './reducers/CampussBuzzReducer';
import useStoryCampussBuzzAndKidsCorner from './customHooks/useStoryCampussBuzzAndKidsCorner';
import { Detector, Offline } from 'react-detect-offline';
import OfflinePage from './pages/errors/Offline';
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export const Store = createContext({});
export const BreadCrumbContext = createContext({});
function App() {
  const [search, setSearch] = useState('');

  const location = useLocation();
  const [user, dispatchUser] = useReducer(userReducer, userDefault);
  const [news, dispatchNews] = useReducer(newsReducer, { next: "", data: {}, pageNo: 1, currentTarget: "" });
  const [subject, dispatchSubject] = useReducer(subjectListReducer, { data: [] });

  /*//not in useconst*/const [newsLetter, dispatchNewsLetter] = useReducer(newsLetterReducer, { next: "", data: {}, pageNo: 1, currentTarget: "" });
  const [plans, setPlans] = useState([]);
  const [liveQuiz, dispatcLiveQuiz] = useReducer(activityQuizReducer, { loading: false, data: [], count: 0, pageSize: 4, page: 1, currentPage: 1 })
  const [popularQuiz, dispatchPopularQuiz] = useReducer(activityQuizReducer, { loading: false, data: [], count: 0, pageSize: 4, page: 1, currentPage: 1 })//not in use now
  const [upcomingQuiz, dispatchUpcomingQuiz] = useReducer(activityQuizReducer, { loading: false, data: [], count: 0, pageSize: 4, page: 1, currentPage: 1 })
  const [practiceQuiz, dispatchPracticeQuiz] = useReducer(activityQuizReducer, { loading: false, data: [], count: 0, pageSize: 4, page: 1, currentPage: 1 })//not in use now

  const [newestFirstQuiz, dispatchnewestFirstQuiz] = useReducer(activityQuizReducer, { loading: false, data: [], count: 0, pageSize: 12, page: 1, currentPage: 1 })
  const [UnattemptedQuiz, dispatchUnattemptedQuiz] = useReducer(activityQuizReducer, { loading: false, data: [], count: 0, pageSize: 12, page: 1, currentPage: 1 })
  const [attempted_firstQuiz, dispatchattempted_firstQuiz] = useReducer(activityQuizReducer, { loading: false, data: [], count: 0, pageSize: 12, page: 1, currentPage: 1 })

  const [recentQuiz, dispatchRecent] = useReducer(activityQuizReducer, { loading: false, data: [], count: 0, pageSize: 4, page: 1, currentPage: 1 })
  const [freeQuiz, dispatchFreeQuiz] = useReducer(activityQuizReducer, { loading: false, data: [], count: 0, pageSize: 4, page: 1, currentPage: 1 })


  const [kidsCorner, dispatchkidsCorner] = useReducer(KidsCornerReducer, { data: [], next: "" });


  const [StorykidsCorner, dispatchStorykidsCorner] = useReducer(CampussBuzzReducer, { data: [], next: "" });
  const [campusBuzz, dispatchCampusBuzz] = useReducer(CampussBuzzReducer, { data: [], next: "" });


  const [stuff, dispatchStuff] = useReducer(stuffReducer, { loading: false, data: [] })
  const [breadCrumb, setBreadCrumb] = useState({ string: [''], redirect: [''] });
  
  const logOutCallback = () => {
    data.subject.setData({ data: [] });
    data.news.setData({ next: "", data: {}, pageNo: 1, currentTarget: "" });
    data.liveQuiz.setData({ loading: false, data: [], count: 0, pageSize: 4, page: 1, currentPage: 1 })
    data.popularQuiz.setData({ loading: false, data: [], count: 0, pageSize: 4, page: 1, currentPage: 1 })
    data.practiceQuiz.setData({ loading: false, data: [], count: 0, pageSize: 4, page: 1, currentPage: 1 })
    data.recentQuiz.setData({ loading: false, data: [], count: 0, pageSize: 4, page: 1, currentPage: 1 })
    data.upcomingQuiz.setData({ loading: false, data: [], count: 0, pageSize: 4, page: 1, currentPage: 1 })
    data.newsletter.setData({ next: "", data: {}, pageNo: 1, currentTarget: "" });
  }
  const data = {
    
    search: {get:search , set: (val)=>{setSearch(val)}},
    user: useUser(user, dispatchUser, logOutCallback),
    news: useNews(news, dispatchNews),
    newsletter: useNewsLetter(newsLetter, dispatchNewsLetter),
    liveQuiz: useActivityQuiz(liveQuiz, dispatcLiveQuiz),
    freeQuiz: useActivityQuiz(freeQuiz, dispatchFreeQuiz),
    popularQuiz: useActivityQuiz(popularQuiz, dispatchPopularQuiz),
    upcomingQuiz: useActivityQuiz(upcomingQuiz, dispatchUpcomingQuiz),
    practiceQuiz: useActivityQuiz(practiceQuiz, dispatchPracticeQuiz),
    recentQuiz: useActivityQuiz(recentQuiz, dispatchRecent),

    newestFirst: useActivityQuiz(newestFirstQuiz, dispatchnewestFirstQuiz),
    attemptedFirst: useActivityQuiz(attempted_firstQuiz, dispatchattempted_firstQuiz),
    unAttemptedFirst: useActivityQuiz(UnattemptedQuiz, dispatchUnattemptedQuiz),

    subject: useSubjectList(subject, dispatchSubject),
    plans: usePlans(plans, setPlans),

    stuff: useStuff(stuff, dispatchStuff),
    kidsCorner: useKidsCorner(kidsCorner, dispatchkidsCorner),
    campussBuzz: useStoryCampussBuzzAndKidsCorner(campusBuzz, dispatchCampusBuzz, "campus_buzz"),
    storykidsCorner: useStoryCampussBuzzAndKidsCorner(StorykidsCorner, dispatchStorykidsCorner, "kidscorner_competition")
  }

  const breadCrumbVal = {
    set: (breadCrumbString = [''], breadCrumbRedirect = ['']) => {
      setBreadCrumb({ string: breadCrumbString, redirect: breadCrumbRedirect })
    },
    get: () => {
      let str = []
      let i = 0;
      for (let substr of breadCrumb.string) {
        
        

          if (breadCrumb.redirect.length >= 1) {
            
            str[i] = (<Link className=' header_title ' style={{ cursor: "pointer" }} to={breadCrumb.redirect[i]}>{substr}</Link>);
          }
          else if (location.pathname.search("/concepts") !== -1 && i <= 0) {
            str[i] = (<Link className=' header_title ' style={{ cursor: "pointer", color: "#5C56D4" }} to={breadCrumb.redirect[i]}>{substr}</Link>);
          }
          else {
            str[i] = <span className='header_title '>{substr}</span>;
          }

        
        i++
      }
      return str;
    }


  }
  return (
    <>
      <BreadCrumbContext.Provider value={breadCrumbVal}>
        <Store.Provider value={data}>
          <StuffGridConfig>
            <GridConfig >
              <LockingSysytemPopUp>
                {/* <Online> */}
                <Detector

                  render={({ online }) => {
                    if (online) {
                      return (
                        <MainRoute />
                      )
                    }else{
                    return( <OfflinePage />)
                    }
                  }} />



                <ToastContainer
                  autoClose={2500}
                  // closeOnClick
                  pauseOnFocusLoss={true}
                />
                
              </LockingSysytemPopUp>
            </GridConfig>
          </StuffGridConfig>
        </Store.Provider>
      </BreadCrumbContext.Provider>
    </>
  );
}

export default App;

