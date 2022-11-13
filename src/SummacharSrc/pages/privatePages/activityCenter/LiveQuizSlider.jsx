import React, { useContext, useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import styleSheet from "../../../common/stylesheet";
import LiveQuizComponent from "./LiveQuizComponent";
import { PulltoRefreshWork } from "../../../routes/PrivateRoute";
// import styleSheet, { focusStyle } from "../common/stylesheet";



const Indicator = (Props) => {
    return (
        <button className="live-quiz-indicator" style={Props.isSelected ? { backgroundColor: styleSheet.primaryColor } : {}} onClick={Props.onClick}>

        </button>
    )
}


const LiveQuizSlider = (Props) => {

    const data = Props.data ? Props.data : []
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth });
    const [index, setIndex] = useState(0)


    const handleChange = (selectedIndex) => {
        setIndex(selectedIndex);

    }

    const onResize = () => {
        setWindowSize({ width: window.innerWidth })
    }

    useEffect(() => {
        onResize();
        window.addEventListener('resize', onResize)
        return () => { return window.removeEventListener('resize', onResize) }
    }, [])

    const pullTorefreshContext = useContext(PulltoRefreshWork);


    return (
        <div className="live-quiz-slider" style={{ width: "100%", margin: "0px" }}>
            <Carousel
                swipeScrollTolerance={100}
                // preventMovementUntilSwipeScrollTolerance={true}
                onChange={handleChange}
                onSwipeStart={()=>{
                    pullTorefreshContext.set(false)

                }}
                onSwipeEnd={()=>{
                    pullTorefreshContext.set(true)

                }}
                labels={{ leftArrow: 'previous slide / item', rightArrow: 'next slide / item' }}
                renderIndicator={
                    (fun, selected, index, labels) => {
                        if (data.length > 0) {
                            return <Indicator isSelected={selected}
                                onClick={() => {
                                    fun();
                                    // selectedFound = slides.length;
                                    // if (!storyHasQuestion && index == slides.length - 1) { Props.onRead() }
                                }
                                }

                            />
                        } else {
                            return <></>
                        }
                    }}
                renderArrowNext={
                    (next, hasNext) => {
                        if (windowSize.width > 960 && index < data.length - 1) {

                            return (
                                <button className="next-btn-live-slider" onClick={() => { next(); }}>
                                    <div className="round-circle center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 32 32" fill="none">
                                            <path d="M12.3866 21.1733L17.5599 16L12.3866 10.8266C11.8666 10.3066 11.8666 9.46664 12.3866 8.94664C12.9066 8.42664 13.7466 8.42664 14.2666 8.94664L20.3866 15.0666C20.9066 15.5866 20.9066 16.4266 20.3866 16.9466L14.2666 23.0666C13.7466 23.5866 12.9066 23.5866 12.3866 23.0666C11.8799 22.5466 11.8666 21.6933 12.3866 21.1733Z" fill="#5C56D4" />

                                        </svg>
                                    </div>
                                </button>
                            )
                        } else {
                            return (<></>)
                        }

                    }
                }
                renderArrowPrev={
                    (previous) => {
                        if (windowSize.width > 960 && index > 0) {
                            return (
                                <button className="previous-btn-live-slider" onClick={previous}>
                                    <div className="round-circle center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 32 32" fill="none" >
                                            <path d="M19.6134 21.1733L14.4401 16L19.6134 10.8266C20.1334 10.3066 20.1334 9.46664 19.6134 8.94664C19.0934 8.42664 18.2534 8.42664 17.7334 8.94664L11.6134 15.0666C11.0934 15.5866 11.0934 16.4266 11.6134 16.9466L17.7334 23.0666C18.2534 23.5866 19.0934 23.5866 19.6134 23.0666C20.1201 22.5466 20.1334 21.6933 19.6134 21.1733Z" fill="#5C56D4" />
                                        </svg>
                                    </div>
                                </button>

                            )
                        } else {
                            return (<></>)
                        }
                    }
                }
                onClickItem={
                    () => { }
                }
                showIndicators={data.length > 1}
                showArrows={true}
                showThumbs={false}
                interval={10000000}

                // stopOnHover={false}
                autoPlay={false}
                showStatus={false}

            >

                {data && data.length > 0 &&
                    data.map((val, index) => {
                        return <LiveQuizComponent openRestrictionPopUp={(data, quizData) => { Props.setRestrictionPopup(data, quizData, "Live") }} openPopUp={Props.openPopUp} key={val.uuid + "-" + index} data={val} />
                    })
                }
            </Carousel>
        </div>
    );
}
export default LiveQuizSlider;

