import { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import { isApp } from '../../common/helper';
import PremiumPopUp from '../premiumPop'
import QuizStartTimeAndTimePopUp from '../QuizStartTimeAndTimePopUp';

export const LockingSystemContext = createContext(null)
const LockingSysytemPopUp = props => {


    const [popUp, setPopUpData] = useState({ visiblity: false, heading: "OOPS! Something went wrong!", description: "----" });
    const location = useLocation();
    useEffect(() => {
        contextVal.closePopUp()
    }, [location])
    const getHeadingAndDescByType = (type, additional = "") => {
        switch (type) {
            case "CONTACT_SUMMACHAR": return {
                heading: "",
                description: isApp() ? "This content is available only for exclusive members." : "This content is for our premium users. You may contact us on +91 9880678169 or namaskar@summachar.in"
            };
            case "NOT_STARTED_QUIZ": return {
                heading: "NOT_STARTED_QUIZ",
                description: additional
            }
            case "QUIZ_ENDED": return {
                heading: "QUIZ_ENDED",
                description: additional
            }
            // case "CONTACT_SUMMACHAR_IN_APP" : return {
            //     heading: "",
            //     description: "This content is available only for exclusive members."
            // };
            case "SUBJECT_CHAPTER_WILL_LIVE": return {
                heading: "",
                description: "Chapter will be unlocked once you finish previous chapters. "
            };
            case "SUBJECT_WILL_LIVE": return {
                heading: "",
                description: "Subject will live on " + additional
            };
            case "ONLY_TEXT":return {
                heading: "ONLY_TEXT",
                description: additional
            };
            case "ENQ_ACAD": return {
                heading: "",
                description: isApp() ? "This content is available only for exclusive members." : "This content is for our premium users. You may contact us on +91 9880678169 or namaskar@summachar.in"

            }
            default: return {
                heading: "",
                description: isApp() ? "This content is available only for exclusive members." : "This content is for our premium users. You may contact us on +91 9880678169 or namaskar@summachar.in"

            }

        }
    }

    const contextVal = {
        visiblity: popUp.visiblity,
        openPopUp: (type, additional = "") => {
            setPopUpData({ visiblity: true, heading: getHeadingAndDescByType(type, additional).heading, description: getHeadingAndDescByType(type, additional).description })
        },
        closePopUp: () => {
            setPopUpData({ visiblity: false, heading: getHeadingAndDescByType('').heading, description: getHeadingAndDescByType('').description })
        }
    }
    return (
        <LockingSystemContext.Provider value={contextVal}>
            {popUp.visiblity && (popUp.heading !== "NOT_STARTED_QUIZ" && popUp.heading !== "QUIZ_ENDED" ? <PremiumPopUp onClosePopUp={() => { contextVal.closePopUp() }} heading={popUp.heading} description={popUp.description} /> : <QuizStartTimeAndTimePopUp onClosePopUp={() => { contextVal.closePopUp() }} heading={popUp.heading} description={popUp.description} />)}


            {props.children}
        </LockingSystemContext.Provider>
    )
}
export default LockingSysytemPopUp
