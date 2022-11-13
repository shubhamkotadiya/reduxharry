import React, { useEffect } from "react";
import "../assets/css/Loader.css";
import loader from "../assets/images/common/Quick.gif";
import { isApp } from "../common/helper";
const Loader = () => {
    useEffect(() => {

        if (isApp()) {
            // window.flutter_inappwebview.callHandler('loader', {
            //     show: true
            // }).then(function (result) {
            //     console.log(result);
            // });
        }



        return () => {
            // if (isApp()) {
            //     window.flutter_inappwebview.callHandler('loader', {
            //         show: false
            //     }).then(function (result) {
            //         // get result from Flutter side. It will be the number 64.
            //         console.log(result);
            //     });
            // }

        }
    }, [])
    if (!isApp()) {
        return (
            <div className="outer-container">
                {/* <div className="load">
                <span>
                    <b>Loading...</b>
                </span>
                <span className="sentense">Loading content, please wait</span>
            </div> */}
                <div className="load-img">
                    <img src={loader} />
                </div>
            </div>
        );
    } else {

        return (<>
            <div className="outer-container">
                {/* <div className="load">
                <span>
                    <b>Loading...</b>
                </span>
                <span className="sentense">Loading content, please wait</span>
            </div> */}
                <div className="load-img">
                    <img src={loader} />
                </div>
            </div>
        </>)
    }
};
export default Loader;
