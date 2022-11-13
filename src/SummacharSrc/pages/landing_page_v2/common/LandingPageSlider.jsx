import React, { useContext, useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
// import styleSheet, { focusStyle } from "../common/stylesheet";
// import InStoryQuiz from "./InStoryQuiz";
import styleSheet from "../../../common/stylesheet";
import InStoryQuiz from "../../../components/InStoryQuiz";


const ImageComponent = (Props) => {
    return (
        <div className="carousal_image fit-content radius-primary">
            <img className="row radius-primary" src={Props.image} alt="" />
        </div>
    )
}
const LandingPageSlider = (Props) => {

    const [slides, setSlides] = useState(Props.data.slides ? Props.data.slides : [])
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth });
    const storyHasQuestion = Props.storyHasQuestion && Props.storyHasQuestion == true ? true : false;
    const [index, setIndex] = useState(0);

    const handleChange = (selectedIndex) => {
        setIndex(selectedIndex);
        if (!storyHasQuestion && selectedIndex === slides.length - 1) { Props.onRead() }
    }

    const onResize = () => {
        setWindowSize({ width: window.innerWidth })
    }
    useEffect(() => {
        if (Props.data.slides) {
            setSlides(Props.data.slides)
        }

    }, [Props.data.slides])
    useEffect(() => {
        onResize();
        window.addEventListener('resize', onResize)
        return () => { return window.removeEventListener('resize', onResize) }
    }, [])

    let selectedFound = slides.length;
    return (
        <div style={{ width: "100%", margin: "0px" }}>
            <Carousel
                swipeScrollTolerance={100}
                preventMovementUntilSwipeScrollTolerance={true}
                onChange={handleChange}
                labels={{ leftArrow: 'previous slide / item', rightArrow: 'next slide / item' }}
                renderIndicator={
                    (fun, selected, index, labels) => {


                        if (selected) {
                            selectedFound = index
                        }
                        // if(index==slides.length-1 && !storyHasQuestion){
                        //      Props.onRead()
                        // }
                        return <></>
                    }}
                renderArrowNext={
                    (next, hasNext) => {
                        if ( index < slides.length - 1) {

                            return (
                                <button className="next-btn" onClick={() => { next(); }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                        <path d="M12.3866 21.1733L17.5599 16L12.3866 10.8266C11.8666 10.3066 11.8666 9.46664 12.3866 8.94664C12.9066 8.42664 13.7466 8.42664 14.2666 8.94664L20.3866 15.0666C20.9066 15.5866 20.9066 16.4266 20.3866 16.9466L14.2666 23.0666C13.7466 23.5866 12.9066 23.5866 12.3866 23.0666C11.8799 22.5466 11.8666 21.6933 12.3866 21.1733Z" fill="#5C56D4" />
                                    </svg>
                                </button>
                            )
                        } else {
                            return (<></>)
                        }

                    }
                }
                renderArrowPrev={
                    (previous) => {
                        if ( index > 0) {
                            return (
                                <button className="previous-btn" onClick={previous}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" >
                                        <path d="M19.6134 21.1733L14.4401 16L19.6134 10.8266C20.1334 10.3066 20.1334 9.46664 19.6134 8.94664C19.0934 8.42664 18.2534 8.42664 17.7334 8.94664L11.6134 15.0666C11.0934 15.5866 11.0934 16.4266 11.6134 16.9466L17.7334 23.0666C18.2534 23.5866 19.0934 23.5866 19.6134 23.0666C20.1201 22.5466 20.1334 21.6933 19.6134 21.1733Z" fill="#5C56D4" />
                                    </svg>
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
                showArrows={true}
                showThumbs={false}
                interval={10000000}
                stopOnHover={false}
                autoPlay={false}
                showStatus={false}

            >
                {slides && slides.length > 0 &&
                    slides.map((data, index) => {
                        return data.slide_type == "Media" ? <ImageComponent key={index} image={data.media} />
                            :
                            <InStoryQuiz onClick={(option) => {
                                Props.onClick(option, data, index);

                            }}
                                key={index}
                                windowSize={windowSize}
                                data={data} />
                    })
                }
            </Carousel>
        </div>
    );
}
export default LandingPageSlider;
