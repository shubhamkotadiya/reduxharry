import react from "react";
import React, { useContext, useEffect, useState } from "react"
import { Store } from "../App";
import "../assets/css/welcome.css"
import cloud from "../assets/images/common/welcome_cloud.png"
import jet from "../assets/images/common/welcome_boy.svg"
import logo from "../assets/images/common/summachar_blue_logo.svg"
import news_welcome from "../assets/images/common/news_welcome.svg";
import { isFreeTrial, isApp } from "../common/helper";
import { Link } from "react-router-dom";

const Welcome = (props) => {

    const user = useContext(Store).user;
    const [isFree, changeFree] = useState(false);
    const [inApp, changeApp] = useState(false);

    

    useEffect(async () => {
        changeFree(isFreeTrial());
        changeApp(isApp());
    }, [])
    
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })

    const onResize = () => {
        let height = window.innerHeight;
        let width = window.innerWidth;

        setWindowSize({ width: width, height: height })

    }
    useEffect(() => {
        onResize();
        window.addEventListener('resize', onResize)
        return () => { return window.removeEventListener('resize', onResize) }
    }, [])
    return (
        <>
            <div className="welcome_container" style={{ height: windowSize.height, maxHeight: windowSize.height, width: windowSize.innerWidth, position: 'fixed', top: 0, left: 0, width: '100%', overflowY: 'scroll', overflowX: 'hidden' }} >

                <div className="welcome_details">
                    <img className="Summachar_logo_welcome" src={logo} />

                    {

                        !inApp && !isFree && user.data.subject_list &&
                            user.data.subject_list[0] === 'News' &&
                            user.data.subject_list.length === 1 &&


                        <>
                            <div className="welcome_title_news welcome_title_news_web">
                                Thank you for joining Summachar Pathshala!
                            </div>
                            <div className="welcome_title_news welcome_title_news_mobile">
                                Welcome to Pathshala family! 
                            </div>
                            <div className="welcome_notes">
                                

                            </div>
                            <div className="welcome_svg_news">
                                <img src={news_welcome} alt="Welcome Image for News users" />
                            </div>
                            <Link to="/home" className="btn-primary center btn welcome_btn_news"> Start Learning</Link>
                        </>
                    }
                    
                    {

                        !inApp && !isFree && user.data.subject_list  &&
                            user.data.subject_list.length > 1 &&


                        <>
                            <div className="welcome_title">
                                Welcome to Summachar Pathshala family!
                            </div>
                            <div className="welcome_notes">
                                Enjoy:

                            </div>
                            <div className="welcome_benefits">
                                <div className="welcome_benefit">
                                    <svg width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0)">
                                            <rect y="0.5" width="20" height="20" rx="10" fill="#ECC249" />
                                            <path d="M15.5917 7.00834C15.5142 6.93023 15.4221 6.86824 15.3205 6.82593C15.219 6.78362 15.1101 6.76184 15 6.76184C14.89 6.76184 14.7811 6.78362 14.6796 6.82593C14.578 6.86824 14.4858 6.93023 14.4084 7.00834L8.20004 13.225L5.59171 10.6083C5.51127 10.5306 5.41632 10.4695 5.31227 10.4285C5.20823 10.3875 5.09713 10.3674 4.98531 10.3694C4.87349 10.3713 4.76315 10.3952 4.66058 10.4398C4.55802 10.4844 4.46524 10.5487 4.38754 10.6292C4.30984 10.7096 4.24875 10.8046 4.20774 10.9086C4.16674 11.0127 4.14663 11.1238 4.14856 11.2356C4.1505 11.3474 4.17444 11.4577 4.21902 11.5603C4.2636 11.6629 4.32794 11.7556 4.40837 11.8333L7.60837 15.0333C7.68584 15.1114 7.77801 15.1734 7.87956 15.2157C7.98111 15.2581 8.09003 15.2798 8.20004 15.2798C8.31005 15.2798 8.41897 15.2581 8.52052 15.2157C8.62207 15.1734 8.71424 15.1114 8.79171 15.0333L15.5917 8.23334C15.6763 8.1553 15.7438 8.06059 15.79 7.95518C15.8361 7.84976 15.86 7.73592 15.86 7.62084C15.86 7.50575 15.8361 7.39192 15.79 7.2865C15.7438 7.18108 15.6763 7.08637 15.5917 7.00834Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect y="0.5" width="20" height="20" rx="10" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span>Monthly Masterclasses</span>
                                </div>
                                <div className="welcome_benefit">
                                    <svg width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0)">
                                            <rect y="0.5" width="20" height="20" rx="10" fill="#ECC249" />
                                            <path d="M15.5917 7.00834C15.5142 6.93023 15.4221 6.86824 15.3205 6.82593C15.219 6.78362 15.1101 6.76184 15 6.76184C14.89 6.76184 14.7811 6.78362 14.6796 6.82593C14.578 6.86824 14.4858 6.93023 14.4084 7.00834L8.20004 13.225L5.59171 10.6083C5.51127 10.5306 5.41632 10.4695 5.31227 10.4285C5.20823 10.3875 5.09713 10.3674 4.98531 10.3694C4.87349 10.3713 4.76315 10.3952 4.66058 10.4398C4.55802 10.4844 4.46524 10.5487 4.38754 10.6292C4.30984 10.7096 4.24875 10.8046 4.20774 10.9086C4.16674 11.0127 4.14663 11.1238 4.14856 11.2356C4.1505 11.3474 4.17444 11.4577 4.21902 11.5603C4.2636 11.6629 4.32794 11.7556 4.40837 11.8333L7.60837 15.0333C7.68584 15.1114 7.77801 15.1734 7.87956 15.2157C7.98111 15.2581 8.09003 15.2798 8.20004 15.2798C8.31005 15.2798 8.41897 15.2581 8.52052 15.2157C8.62207 15.1734 8.71424 15.1114 8.79171 15.0333L15.5917 8.23334C15.6763 8.1553 15.7438 8.06059 15.79 7.95518C15.8361 7.84976 15.86 7.73592 15.86 7.62084C15.86 7.50575 15.8361 7.39192 15.79 7.2865C15.7438 7.18108 15.6763 7.08637 15.5917 7.00834Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect y="0.5" width="20" height="20" rx="10" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span> Weekly Competitions
                                    </span>

                                </div>
                                <div className="welcome_benefit">
                                    <svg width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0)">
                                            <rect y="0.5" width="20" height="20" rx="10" fill="#ECC249" />
                                            <path d="M15.5917 7.00834C15.5142 6.93023 15.4221 6.86824 15.3205 6.82593C15.219 6.78362 15.1101 6.76184 15 6.76184C14.89 6.76184 14.7811 6.78362 14.6796 6.82593C14.578 6.86824 14.4858 6.93023 14.4084 7.00834L8.20004 13.225L5.59171 10.6083C5.51127 10.5306 5.41632 10.4695 5.31227 10.4285C5.20823 10.3875 5.09713 10.3674 4.98531 10.3694C4.87349 10.3713 4.76315 10.3952 4.66058 10.4398C4.55802 10.4844 4.46524 10.5487 4.38754 10.6292C4.30984 10.7096 4.24875 10.8046 4.20774 10.9086C4.16674 11.0127 4.14663 11.1238 4.14856 11.2356C4.1505 11.3474 4.17444 11.4577 4.21902 11.5603C4.2636 11.6629 4.32794 11.7556 4.40837 11.8333L7.60837 15.0333C7.68584 15.1114 7.77801 15.1734 7.87956 15.2157C7.98111 15.2581 8.09003 15.2798 8.20004 15.2798C8.31005 15.2798 8.41897 15.2581 8.52052 15.2157C8.62207 15.1734 8.71424 15.1114 8.79171 15.0333L15.5917 8.23334C15.6763 8.1553 15.7438 8.06059 15.79 7.95518C15.8361 7.84976 15.86 7.73592 15.86 7.62084C15.86 7.50575 15.8361 7.39192 15.79 7.2865C15.7438 7.18108 15.6763 7.08637 15.5917 7.00834Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect y="0.5" width="20" height="20" rx="10" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span>   Daily News in beautiful infographics!
                                    </span>
                                </div>
                            </div>
                        </>
                    }

                    {
                        inApp && isFree &&

                        <>
                            <div className="welcome_title">
                                Thank you for joining!

                            </div>
                            <div className="welcome_notes">
                                Summachar Pathshala offers you:

                            </div>
                            <div className="welcome_benefits">
                                <div className="welcome_benefit">
                                    <svg width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0)">
                                            <rect y="0.5" width="20" height="20" rx="10" fill="#ECC249" />
                                            <path d="M15.5917 7.00834C15.5142 6.93023 15.4221 6.86824 15.3205 6.82593C15.219 6.78362 15.1101 6.76184 15 6.76184C14.89 6.76184 14.7811 6.78362 14.6796 6.82593C14.578 6.86824 14.4858 6.93023 14.4084 7.00834L8.20004 13.225L5.59171 10.6083C5.51127 10.5306 5.41632 10.4695 5.31227 10.4285C5.20823 10.3875 5.09713 10.3674 4.98531 10.3694C4.87349 10.3713 4.76315 10.3952 4.66058 10.4398C4.55802 10.4844 4.46524 10.5487 4.38754 10.6292C4.30984 10.7096 4.24875 10.8046 4.20774 10.9086C4.16674 11.0127 4.14663 11.1238 4.14856 11.2356C4.1505 11.3474 4.17444 11.4577 4.21902 11.5603C4.2636 11.6629 4.32794 11.7556 4.40837 11.8333L7.60837 15.0333C7.68584 15.1114 7.77801 15.1734 7.87956 15.2157C7.98111 15.2581 8.09003 15.2798 8.20004 15.2798C8.31005 15.2798 8.41897 15.2581 8.52052 15.2157C8.62207 15.1734 8.71424 15.1114 8.79171 15.0333L15.5917 8.23334C15.6763 8.1553 15.7438 8.06059 15.79 7.95518C15.8361 7.84976 15.86 7.73592 15.86 7.62084C15.86 7.50575 15.8361 7.39192 15.79 7.2865C15.7438 7.18108 15.6763 7.08637 15.5917 7.00834Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect y="0.5" width="20" height="20" rx="10" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span>Daily news in beautiful infographics</span>
                                </div>
                                <div className="welcome_benefit">
                                    <svg width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0)">
                                            <rect y="0.5" width="20" height="20" rx="10" fill="#ECC249" />
                                            <path d="M15.5917 7.00834C15.5142 6.93023 15.4221 6.86824 15.3205 6.82593C15.219 6.78362 15.1101 6.76184 15 6.76184C14.89 6.76184 14.7811 6.78362 14.6796 6.82593C14.578 6.86824 14.4858 6.93023 14.4084 7.00834L8.20004 13.225L5.59171 10.6083C5.51127 10.5306 5.41632 10.4695 5.31227 10.4285C5.20823 10.3875 5.09713 10.3674 4.98531 10.3694C4.87349 10.3713 4.76315 10.3952 4.66058 10.4398C4.55802 10.4844 4.46524 10.5487 4.38754 10.6292C4.30984 10.7096 4.24875 10.8046 4.20774 10.9086C4.16674 11.0127 4.14663 11.1238 4.14856 11.2356C4.1505 11.3474 4.17444 11.4577 4.21902 11.5603C4.2636 11.6629 4.32794 11.7556 4.40837 11.8333L7.60837 15.0333C7.68584 15.1114 7.77801 15.1734 7.87956 15.2157C7.98111 15.2581 8.09003 15.2798 8.20004 15.2798C8.31005 15.2798 8.41897 15.2581 8.52052 15.2157C8.62207 15.1734 8.71424 15.1114 8.79171 15.0333L15.5917 8.23334C15.6763 8.1553 15.7438 8.06059 15.79 7.95518C15.8361 7.84976 15.86 7.73592 15.86 7.62084C15.86 7.50575 15.8361 7.39192 15.79 7.2865C15.7438 7.18108 15.6763 7.08637 15.5917 7.00834Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect y="0.5" width="20" height="20" rx="10" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span> Fun quizzes and competitions
                                    </span>

                                </div>
                                <div className="welcome_benefit">
                                    <svg width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0)">
                                            <rect y="0.5" width="20" height="20" rx="10" fill="#ECC249" />
                                            <path d="M15.5917 7.00834C15.5142 6.93023 15.4221 6.86824 15.3205 6.82593C15.219 6.78362 15.1101 6.76184 15 6.76184C14.89 6.76184 14.7811 6.78362 14.6796 6.82593C14.578 6.86824 14.4858 6.93023 14.4084 7.00834L8.20004 13.225L5.59171 10.6083C5.51127 10.5306 5.41632 10.4695 5.31227 10.4285C5.20823 10.3875 5.09713 10.3674 4.98531 10.3694C4.87349 10.3713 4.76315 10.3952 4.66058 10.4398C4.55802 10.4844 4.46524 10.5487 4.38754 10.6292C4.30984 10.7096 4.24875 10.8046 4.20774 10.9086C4.16674 11.0127 4.14663 11.1238 4.14856 11.2356C4.1505 11.3474 4.17444 11.4577 4.21902 11.5603C4.2636 11.6629 4.32794 11.7556 4.40837 11.8333L7.60837 15.0333C7.68584 15.1114 7.77801 15.1734 7.87956 15.2157C7.98111 15.2581 8.09003 15.2798 8.20004 15.2798C8.31005 15.2798 8.41897 15.2581 8.52052 15.2157C8.62207 15.1734 8.71424 15.1114 8.79171 15.0333L15.5917 8.23334C15.6763 8.1553 15.7438 8.06059 15.79 7.95518C15.8361 7.84976 15.86 7.73592 15.86 7.62084C15.86 7.50575 15.8361 7.39192 15.79 7.2865C15.7438 7.18108 15.6763 7.08637 15.5917 7.00834Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect y="0.5" width="20" height="20" rx="10" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span>   Interactive masterclasses and workshops
                                    </span>

                                </div>
                            </div>
                        </>
                    }


                    {
                        !inApp && isFree &&

                        <>
                            <div className="welcome_title">
                                Thank you for joining Summachar Pathshala!
                            </div>
                            <div className="welcome_notes">
                               Get full access to:

                            </div>
                            <div className="welcome_benefits">
                                <div className="welcome_benefit">
                                    <svg width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0)">
                                            <rect y="0.5" width="20" height="20" rx="10" fill="#ECC249" />
                                            <path d="M15.5917 7.00834C15.5142 6.93023 15.4221 6.86824 15.3205 6.82593C15.219 6.78362 15.1101 6.76184 15 6.76184C14.89 6.76184 14.7811 6.78362 14.6796 6.82593C14.578 6.86824 14.4858 6.93023 14.4084 7.00834L8.20004 13.225L5.59171 10.6083C5.51127 10.5306 5.41632 10.4695 5.31227 10.4285C5.20823 10.3875 5.09713 10.3674 4.98531 10.3694C4.87349 10.3713 4.76315 10.3952 4.66058 10.4398C4.55802 10.4844 4.46524 10.5487 4.38754 10.6292C4.30984 10.7096 4.24875 10.8046 4.20774 10.9086C4.16674 11.0127 4.14663 11.1238 4.14856 11.2356C4.1505 11.3474 4.17444 11.4577 4.21902 11.5603C4.2636 11.6629 4.32794 11.7556 4.40837 11.8333L7.60837 15.0333C7.68584 15.1114 7.77801 15.1734 7.87956 15.2157C7.98111 15.2581 8.09003 15.2798 8.20004 15.2798C8.31005 15.2798 8.41897 15.2581 8.52052 15.2157C8.62207 15.1734 8.71424 15.1114 8.79171 15.0333L15.5917 8.23334C15.6763 8.1553 15.7438 8.06059 15.79 7.95518C15.8361 7.84976 15.86 7.73592 15.86 7.62084C15.86 7.50575 15.8361 7.39192 15.79 7.2865C15.7438 7.18108 15.6763 7.08637 15.5917 7.00834Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect y="0.5" width="20" height="20" rx="10" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span>Daily news in beautiful infographics</span>
                                </div>
                                <div className="welcome_benefit">
                                    <svg width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0)">
                                            <rect y="0.5" width="20" height="20" rx="10" fill="#ECC249" />
                                            <path d="M15.5917 7.00834C15.5142 6.93023 15.4221 6.86824 15.3205 6.82593C15.219 6.78362 15.1101 6.76184 15 6.76184C14.89 6.76184 14.7811 6.78362 14.6796 6.82593C14.578 6.86824 14.4858 6.93023 14.4084 7.00834L8.20004 13.225L5.59171 10.6083C5.51127 10.5306 5.41632 10.4695 5.31227 10.4285C5.20823 10.3875 5.09713 10.3674 4.98531 10.3694C4.87349 10.3713 4.76315 10.3952 4.66058 10.4398C4.55802 10.4844 4.46524 10.5487 4.38754 10.6292C4.30984 10.7096 4.24875 10.8046 4.20774 10.9086C4.16674 11.0127 4.14663 11.1238 4.14856 11.2356C4.1505 11.3474 4.17444 11.4577 4.21902 11.5603C4.2636 11.6629 4.32794 11.7556 4.40837 11.8333L7.60837 15.0333C7.68584 15.1114 7.77801 15.1734 7.87956 15.2157C7.98111 15.2581 8.09003 15.2798 8.20004 15.2798C8.31005 15.2798 8.41897 15.2581 8.52052 15.2157C8.62207 15.1734 8.71424 15.1114 8.79171 15.0333L15.5917 8.23334C15.6763 8.1553 15.7438 8.06059 15.79 7.95518C15.8361 7.84976 15.86 7.73592 15.86 7.62084C15.86 7.50575 15.8361 7.39192 15.79 7.2865C15.7438 7.18108 15.6763 7.08637 15.5917 7.00834Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect y="0.5" width="20" height="20" rx="10" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span> Fun quizzes and competitions
                                    </span>

                                </div>
                                <div className="welcome_benefit">
                                    <svg width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0)">
                                            <rect y="0.5" width="20" height="20" rx="10" fill="#ECC249" />
                                            <path d="M15.5917 7.00834C15.5142 6.93023 15.4221 6.86824 15.3205 6.82593C15.219 6.78362 15.1101 6.76184 15 6.76184C14.89 6.76184 14.7811 6.78362 14.6796 6.82593C14.578 6.86824 14.4858 6.93023 14.4084 7.00834L8.20004 13.225L5.59171 10.6083C5.51127 10.5306 5.41632 10.4695 5.31227 10.4285C5.20823 10.3875 5.09713 10.3674 4.98531 10.3694C4.87349 10.3713 4.76315 10.3952 4.66058 10.4398C4.55802 10.4844 4.46524 10.5487 4.38754 10.6292C4.30984 10.7096 4.24875 10.8046 4.20774 10.9086C4.16674 11.0127 4.14663 11.1238 4.14856 11.2356C4.1505 11.3474 4.17444 11.4577 4.21902 11.5603C4.2636 11.6629 4.32794 11.7556 4.40837 11.8333L7.60837 15.0333C7.68584 15.1114 7.77801 15.1734 7.87956 15.2157C7.98111 15.2581 8.09003 15.2798 8.20004 15.2798C8.31005 15.2798 8.41897 15.2581 8.52052 15.2157C8.62207 15.1734 8.71424 15.1114 8.79171 15.0333L15.5917 8.23334C15.6763 8.1553 15.7438 8.06059 15.79 7.95518C15.8361 7.84976 15.86 7.73592 15.86 7.62084C15.86 7.50575 15.8361 7.39192 15.79 7.2865C15.7438 7.18108 15.6763 7.08637 15.5917 7.00834Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect y="0.5" width="20" height="20" rx="10" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span>   Interactive masterclasses and workshops
                                    </span>

                                </div>
                            </div>
                        </>
                    }







                </div>
                
                {
                    ((!inApp && !isFree && user.data.subject_list  &&
                    user.data.subject_list.length > 1) || (isFree)) &&
                    <>
                    <Link to="/home" className="btn-primary center welcome_button btn"> Start Learning</Link>
                    <img className="jet" src={jet} />


                    <div className="welcome_bottom_image">

                        <img src={cloud} />

                    </div>
                    </>
                }
            </div>
        </>
    )
}

export default Welcome;