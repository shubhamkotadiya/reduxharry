import React, { useLayoutEffect, useState } from 'react';
import "../../assets/css/PageNotFound.css"






const PageNotFound = () => {
    // var width=661;
    // var height=321;

    // const setWidth=()=>{
    //     if(window.innerWidth <650){
    //       width = window.innerWidth *0.9;
    //       height = window.innerWidth *0.48;
    //     }
    // }
    const [{ width, height }, setSize] = useState({width:300,height: 300});

    function Updates() {
        useLayoutEffect(() => {
            function updateSize() {
                if (window.innerWidth < 650) {
                    setSize({ width: window.innerWidth * 0.8, height: window.innerWidth * 0.40 })
                }
            }
            window.addEventListener('resize', updateSize);
            updateSize();

        })
    }
    return (

        <>

            <div className="err-box" style={{ width: { width }, height: { height } }}>
                <svg xmlns="http://www.w3.org/2000/svg" width={width+"px"} height={height+"px"} viewBox="0 0 661 321" fill="none">
                    <path d="M330.5 320.563C513.03 320.563 661 312.478 661 302.505C661 292.531 513.03 284.446 330.5 284.446C147.97 284.446 0 292.531 0 302.505C0 312.478 147.97 320.563 330.5 320.563Z" fill="#EFF2FA" />
                    <path d="M350.853 6.32076C350.853 2.8299 348.023 0 344.532 0C341.041 0 338.211 2.8299 338.211 6.32076V27.9947C338.211 31.4855 341.041 34.3154 344.532 34.3154C348.023 34.3154 350.853 31.4855 350.853 27.9947V6.32076Z" fill="#545D79" />
                    <path d="M389.177 32.0236C391.645 29.5552 391.645 25.5531 389.177 23.0847C386.709 20.6163 382.706 20.6163 380.238 23.0847L364.912 38.4105C362.444 40.8789 362.444 44.8809 364.912 47.3494C367.381 49.8178 371.383 49.8178 373.851 47.3494L389.177 32.0236Z" fill="#545D79" />
                    <path d="M315.223 47.3464C317.692 49.8148 321.694 49.8148 324.162 47.3464C326.631 44.878 326.631 40.8759 324.162 38.4075L308.837 23.0817C306.368 20.6133 302.366 20.6133 299.898 23.0817C297.429 25.5501 297.429 29.5522 299.898 32.0206L315.223 47.3464Z" fill="#545D79" />
                    <path d="M265.972 86.6895L146.615 206.047L133.14 192.431L264.382 61.1885L265.972 86.6895Z" fill="url(#paint0_linear)" />
                    <path d="M303.903 121.005L182.718 242.182L166.263 225.534L297.486 94.292L303.903 121.005Z" fill="url(#paint1_linear)" />
                    <path d="M297.486 94.2923L166.263 225.535L148.403 207.867L146.615 206.047L265.972 86.6895L297.486 94.2923Z" fill="#FFB537" />
                    <path d="M336.5 133.318L205.277 264.542L182.719 242.182L303.903 121.004L336.5 133.318Z" fill="#FFB537" />
                    <path d="M187.232 282.581L172.064 297.755C168.73 301.094 164.771 303.742 160.412 305.549C156.053 307.357 151.381 308.287 146.663 308.287C141.944 308.287 137.272 307.357 132.914 305.549C128.555 303.742 124.595 301.094 121.261 297.755L99.9334 276.427C96.5975 273.093 93.9513 269.135 92.1459 264.778C90.3404 260.421 89.4111 255.751 89.4111 251.035C89.4111 246.319 90.3404 241.649 92.1459 237.292C93.9513 232.935 96.5975 228.977 99.9334 225.643L115.12 210.45L187.232 282.581Z" fill="#5C56D4" />
                    <path d="M205.277 264.542L187.231 282.582L115.12 210.451L133.14 192.431L146.614 206.047L148.403 207.867L166.263 225.535L182.718 242.183L205.277 264.542Z" fill="url(#paint2_linear)" />
                    <path d="M544.803 211.483L528.745 226.65L526.995 228.515L396.009 97.5231L424.702 91.3818L544.803 211.483Z" fill="#FFB537" />
                    <path d="M511.699 244.587L490.859 264.614L358.078 131.839L391.599 124.486L511.699 244.587Z" fill="#FFB537" />
                    <path d="M526.995 228.515L511.699 244.586L391.599 124.485L396.009 97.5225L526.995 228.515Z" fill="#FFC947" />
                    <path d="M490.859 264.612L489.013 266.382L472.673 283.575L352.572 163.493L358.078 131.838L490.859 264.612Z" fill="#FFC947" />
                    <path d="M559.086 306.589L473.647 284.556L472.672 283.595L489.013 266.402L490.859 264.632L511.699 244.606L526.995 228.535L528.745 226.669L544.803 211.502L545.758 212.457L570.195 295.101C570.652 296.66 570.687 298.311 570.298 299.887C569.91 301.464 569.11 302.909 567.981 304.076C566.853 305.243 565.435 306.09 563.873 306.532C562.31 306.973 560.659 306.993 559.086 306.589Z" fill="url(#paint3_linear)" />
                    <path d="M565.266 278.626L571.176 295.082C571.637 296.641 571.676 298.295 571.289 299.874C570.902 301.453 570.103 302.902 568.974 304.072C567.844 305.241 566.425 306.091 564.86 306.533C563.295 306.975 561.641 306.994 560.067 306.589L542.246 301.992" fill="black" />
                    <defs>
                        <linearGradient id="paint0_linear" x1="160.621" y1="176.738" x2="256.401" y2="84.7022" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#FFB336" />
                            <stop offset="1" stop-color="#FFD755" />
                        </linearGradient>
                        <linearGradient id="paint1_linear" x1="35864.6" y1="38906.6" x2="65417.2" y2="38906.6" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#FFCF4E" />
                            <stop offset="1" stop-color="#FFD755" />
                        </linearGradient>
                        <linearGradient id="paint2_linear" x1="115.12" y1="237.509" x2="205.277" y2="237.509" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#F2F1FA" />
                            <stop offset="1" stop-color="#B8B7CF" />
                        </linearGradient>
                        <linearGradient id="paint3_linear" x1="506.68" y1="307.698" x2="574.894" y2="237.465" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#FCE7DC" />
                            <stop offset="1" stop-color="#F9CCB0" />
                        </linearGradient>
                    </defs>
                </svg>
                <h1 className="txt-secondary">Looks like you are in no man's land!</h1>
                <h3 className="txt-secondary">Sorry, this page doesn't exist. Click the button below to go to Home Page. </h3>
                <a href="/home">
                    Back To Home
                </a>
            </div>
        </>
    )
}
export default PageNotFound;