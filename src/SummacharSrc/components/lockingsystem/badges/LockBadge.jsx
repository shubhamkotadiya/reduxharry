import { useContext, useEffect, useState } from "react";
import { premiumInt } from "../../../common/helper";
import { LockingSystemContext } from "../LockingSysytemPopUp";
const LockBadge = (props) => {

    const lockSystem = useContext(LockingSystemContext)

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,

    });
    const onResize = () => {
        let height = window.innerHeight;
        let width = window.innerWidth;
        if (width <= 600) {

            setWindowSize({ width: width, height: height });
        } else if (width > 1920) {

            setWindowSize({ width: width, height: height });
        } else {

            setWindowSize({ width: width, height: height });
        }
    };
    useEffect(() => {
        onResize();
        window.addEventListener("resize", onResize);
        return () => {
            return window.removeEventListener("resize", onResize);
        };
    }, []);
    const onClickCallback = () => {
        lockSystem.openPopUp(props.popUpType && props.popUpType ? props.popUpType : "CONTACT_SUMMACHAR", props.additional && props.additional != "" ? props.additional : "");
        if (props.premium_intrest_string && props.premium_intrest_string != "") {
            premiumInt(props.premium_intrest_string)
        }
    }

    return (
        <>
            <div className="block-container pointer" onClick={() => { onClickCallback() }}>
                <div className="block-container p-relative">
                    {!props.hide_lock && !props.hide_badge && <div className="right-top-badge">
                        <svg xmlns="http://www.w3.org/2000/svg" width={windowSize.width < 650 ? "22" : "48"} height={windowSize.width < 650 ? "22" : "48"} viewBox="0 0 48 48" fill="none">
                            <rect x="1" y="1" width="46" height="46" rx="23" fill="#5C56D4" />
                            <path d="M29 21V19C29 16.2 26.8 14 24 14C21.2 14 19 16.2 19 19V21C17.3 21 16 22.3 16 24V31C16 32.7 17.3 34 19 34H29C30.7 34 32 32.7 32 31V24C32 22.3 30.7 21 29 21ZM21 19C21 17.3 22.3 16 24 16C25.7 16 27 17.3 27 19V21H21V19Z" fill="white" />
                            <path d="M28 22H29C30.1477 22 31 22.8523 31 24V31C31 32.1477 30.1477 33 29 33H19C17.8523 33 17 32.1477 17 31V24C17 22.8523 17.8523 22 19 22H20H21H27H28Z" fill="white" stroke="white" strokeWidth="2" />
                            <rect x="1" y="1" width="46" height="46" rx="23" stroke="white" strokeWidth="2" />
                        </svg>
                    </div>}
                </div>
            </div>
        </>
    )
}
export default LockBadge;