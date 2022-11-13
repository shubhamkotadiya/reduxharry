import { useEffect, useState } from "react";
import { setDateToAppFormat } from "../../../common/helper"
import ReactTooltip from 'react-tooltip';
const ReadBadge = (props) => {
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
    useEffect(() => {
        ReactTooltip.rebuild();

    })
    var toolData = props.sentence + setDateToAppFormat(props.data.read_timestamp ? props.data.read_timestamp : props.data.attempt_timestamp) + "!"
    return (
        <>
            <ReactTooltip backgroundColor="#e5e5e5" textColor="#18181b" id={props.data.uuid} place="bottom" type="dark" effect="float">
                {toolData}
            </ReactTooltip>
            {!props.hide_badge && <div className="right-top-badge" data-tip data-for={props.data.uuid}>
                <svg xmlns="http://www.w3.org/2000/svg" width={windowSize.width < 650 ? "22" : "48"} height={windowSize.width < 650 ? "22" : "48"} viewBox="0 0 48 48" fill="none">
                    <rect x="1" y="1" width="46" height="46" rx="23" fill="#5C56D4" />
                    <path d="M32.9464 17.6131C32.8225 17.4882 32.675 17.389 32.5125 17.3213C32.3501 17.2536 32.1758 17.2188 31.9998 17.2188C31.8238 17.2188 31.6495 17.2536 31.487 17.3213C31.3245 17.389 31.1771 17.4882 31.0531 17.6131L21.1198 27.5598L16.9464 23.3731C16.8177 23.2488 16.6658 23.1511 16.4993 23.0855C16.3329 23.0199 16.1551 22.9877 15.9762 22.9908C15.7973 22.9939 15.6207 23.0322 15.4566 23.1035C15.2925 23.1748 15.1441 23.2778 15.0198 23.4065C14.8955 23.5352 14.7977 23.6871 14.7321 23.8536C14.6665 24.02 14.6343 24.1978 14.6374 24.3767C14.6405 24.5556 14.6788 24.7322 14.7501 24.8963C14.8215 25.0604 14.9244 25.2088 15.0531 25.3331L20.1731 30.4531C20.2971 30.5781 20.4445 30.6773 20.607 30.745C20.7695 30.8127 20.9438 30.8475 21.1198 30.8475C21.2958 30.8475 21.4701 30.8127 21.6325 30.745C21.795 30.6773 21.9425 30.5781 22.0664 30.4531L32.9464 19.5731C33.0818 19.4483 33.1898 19.2968 33.2637 19.1281C33.3375 18.9594 33.3757 18.7773 33.3757 18.5931C33.3757 18.409 33.3375 18.2269 33.2637 18.0582C33.1898 17.8895 33.0818 17.738 32.9464 17.6131Z" fill="white" />
                    <rect x="1" y="1" width="46" height="46" rx="23" stroke="white" strokeWidth="2" />
                </svg>
            </div>}

        </>
    )
}
export default ReadBadge;