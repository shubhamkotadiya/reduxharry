import React, { useEffect, useState } from 'react'
import {
    useHistory,
    useLocation,
    useRouteMatch,
    useParams,
} from "react-router";


const EnquirePopUp = Props => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,

    });
    const onResize = () => {
        let height = window.innerHeight;
        let width = window.innerWidth;

        setWindowSize({ width: width, height: height });

    };

   

    useEffect(() => {
        onResize();
        window.addEventListener("resize", onResize);
        return () => {
            return window.removeEventListener("resize", onResize);
        };
    }, []);
    return (

        <div
            className='inner_pop_up_container row center df'
            style={{ zIndex: 999999, height: windowSize.height + 'px' }}
        >

            <div
                className='grayArea fit-content'
                onClick={() => {
                    if (Props.changeVisibility) {
                        Props.changeVisibility(false)
                    }
                   
                }}
            ></div>

            <div className='p-relative radius-primary df row innerPopUp pop-up-animation'>
               
                <p className='txt-medium txt-secondary' style={{ margin: '5px 0px' }}>
                    {Props.desc}
                </p>
                
            </div>
        </div>
    )
}
export default EnquirePopUp
