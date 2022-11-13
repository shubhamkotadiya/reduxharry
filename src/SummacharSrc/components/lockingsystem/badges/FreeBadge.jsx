import { useEffect, useState } from "react";

const FreeBadge = () => {
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
    return (
        <>
            <div className="right-top-badge free-badge"  >
                <svg xmlns="http://www.w3.org/2000/svg" width={windowSize.width < 650 ? "42" : "60"} height={windowSize.width < 650 ? "25" : "35"} viewBox="0 0 79 48" fill="none">
                    <rect x="1" y="1" width="77" height="46" rx="23" fill="#5C56D4" />
                    <path d="M27.1465 17.04V19.3H21.3265V22.88H25.7865V25.1H21.3265V31H18.5265V17.04H27.1465ZM36.332 31L33.252 25.56H31.932V31H29.132V17.04H34.372C35.452 17.04 36.372 17.2333 37.132 17.62C37.892 17.9933 38.4586 18.5067 38.832 19.16C39.2186 19.8 39.412 20.52 39.412 21.32C39.412 22.24 39.1453 23.0733 38.612 23.82C38.0786 24.5533 37.2853 25.06 36.232 25.34L39.572 31H36.332ZM31.932 23.46H34.272C35.032 23.46 35.5986 23.28 35.972 22.92C36.3453 22.5467 36.532 22.0333 36.532 21.38C36.532 20.74 36.3453 20.2467 35.972 19.9C35.5986 19.54 35.032 19.36 34.272 19.36H31.932V23.46ZM44.7445 19.3V22.8H49.4445V25.02H44.7445V28.72H50.0445V31H41.9445V17.02H50.0445V19.3H44.7445ZM55.389 19.3V22.8H60.089V25.02H55.389V28.72H60.689V31H52.589V17.02H60.689V19.3H55.389Z" fill="white" />
                    <rect x="1" y="1" width="77" height="46" rx="23" stroke="white" strokeWidth="2" />
                </svg>
            </div>
        </>
    )
}
export default FreeBadge;