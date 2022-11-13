import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import CloseBtnImage from '../../../assets/images/common/close_btn_simple.svg'
const CloseBtn = (Props) => {
    const [popUpVisiblity, setPopUpVisiblity] = useState(false)
    const [isSmallLoading, setSmallLoading] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,

    });
    const params = useParams()
    const onResize = () => {
        let height = window.innerHeight;
        let width = window.innerWidth;

        setWindowSize({ width: width, height: height });

    };
    useEffect(() => {

        window.addEventListener("resize", onResize);
        return () => {
            return window.removeEventListener("resize", onResize);
        };
    }, []);
    const history = useHistory();
    const exit_quiz = async () => {

        if (!Props.hasAttempted) {
            if (Props.isSubmited) {
                setPopUpVisiblity(false)

                if (params.from_notification && params.from_notification == 'true') {
                    history.push("/activities")
                } else {
                    history.goBack()
                }
            } else {
                setSmallLoading(true)
                const response = await Props.submitQuiz();
                if (response) {
                    setSmallLoading(false)
                }

            }

        } else {
            setPopUpVisiblity(false)


            if (params.from_notification && params.from_notification == 'true') {
                history.push("/activities")
            } else {
                history.goBack()
            }
        }

    }
    return (
        <>
            <button className="main_quiz_close_btn" onClick={() => {
                if (!Props.hasAttempted) {
                    if (Props.isSubmited) {

                        if (params.from_notification && params.from_notification == 'true') {
                            history.push("/activities")
                        } else {
                            history.goBack()
                        }
                    } else {
                        setPopUpVisiblity(true);
                    }

                } else {
                    // history.push("/academics",{fromQuiz:true})                    

                    if (params.from_notification && params.from_notification == 'true') {
                        history.push("/activities")
                    } else {
                        history.goBack()
                    }
                }
            }}>
                {!Props.hide && <img src={CloseBtnImage} alt="" />}
            </button>
            {popUpVisiblity &&
                <div className="inner_pop_up_container row df center" style={{ height: windowSize.height + 'px', position: "fixed" }}>
                    <div className="pop_up_box df quiz_popUp radius-primary" style={{ border: "1px solid lightgray" }}>

                        <h1 className="typo-pop-up-primary" style={{ color: "#000" }}>If you leave the activity now, you won't be able to reattempt.</h1>
                        <div className="row df ">


                            {!isSmallLoading && <button className=" btn-secondary typo-btn-primary" onClick={() => { exit_quiz() }} style={{ marginBottom: "0px" }}>Leave</button>}
                            {isSmallLoading && <button className=" btn-secondary typo-btn-primary" style={{ marginBottom: "0px" }}>laoding</button>}
                            <button className="btn-primary typo-btn-primary" onClick={() => { setPopUpVisiblity(false) }} style={{ marginBottom: "0px" }}>Resume</button>
                        </div>
                    </div>
                </div>}
        </>
    )
}
export default CloseBtn;