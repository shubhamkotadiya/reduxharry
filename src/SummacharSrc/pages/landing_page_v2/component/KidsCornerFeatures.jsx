import image1 from "../../../assets/images/landing_page_new/slider/1.png";
import image2 from "../../../assets/images/landing_page_new/slider/2.png";
import image3 from "../../../assets/images/landing_page_new/slider/3.png";
import image4 from "../../../assets/images/landing_page_new/slider/4.png";
import image5 from "../../../assets/images/landing_page_new/slider/5.png";

import { useEffect, useState } from "react";

import LandingPageSlider from "../common/LandingPageSlider";

const KidsCornerFeatures = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,

    });

    const data = {
        slides: [
            {
                "uuid": "a9b0f65d-8667-4e38-aac0-d835ef4570d7",
                "title": "Ever Wondered How A QR Code Generates Movie Tickets?-10",
                "media": image1,
                "categories": {},
                "grade_range": "{\"bounds\": \"()\", \"lower\": null, \"upper\": null}",
                "slide_type": "Media"
            },
            {
                "uuid": "fd1a5dc1-08e5-4475-b357-16e2e49e5f58",
                "title": "How Nintendo Evolved-0",
                "media": image2,
                "categories": {},
                "grade_range": "{\"bounds\": \"()\", \"lower\": null, \"upper\": null}",
                "slide_type": "Media"
            },
            {
                "uuid": "fd1a5dc1-08e5-4475-b357-16e2e49e5f58",
                "title": "How Nintendo Evolved-0",
                "media": image3,
                "categories": {},
                "grade_range": "{\"bounds\": \"()\", \"lower\": null, \"upper\": null}",
                "slide_type": "Media"
            },
            {
                "uuid": "fd1a5dc1-08e5-4475-b357-16e2e49e5f58",
                "title": "How Nintendo Evolved-0",
                "media": image4,
                "categories": {},
                "grade_range": "{\"bounds\": \"()\", \"lower\": null, \"upper\": null}",
                "slide_type": "Media"
            },
            {
                "uuid": "fd1a5dc1-08e5-4475-b357-16e2e49e5f58",
                "title": "How Nintendo Evolved-0",
                "media": image5,
                "categories": {},
                "grade_range": "{\"bounds\": \"()\", \"lower\": null, \"upper\": null}",
                "slide_type": "Media"
            },
        ]
    }
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
        <div className="landing_page_container features_component df">
            <div className="df custom-row space-between row" style={{ justifyContent: "center" }}>
                <div className="dg landing_about_us_outer_grid  landing_about_us_outer_grid_acad">
                    <ul className="flex-1 df column landing_about_us_left  landing_about_us_left_acad">
                        <li className="df row row-center line-margin-small landing_page_content">
                        We passionately dig through news from across the world to find positive and informative news for young minds and design them as attractive, easy to consume info-cards.

                        </li>


                        <li className="df row  line-margin-small">
                            <div className="" style={{ marginRight: "15px" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 22 16" fill="none">
                                    <path
                                        d="M21.0647 0.814791C20.9252 0.674199 20.7593 0.562607 20.5765 0.486454C20.3938 0.410301 20.1977 0.371094 19.9997 0.371094C19.8017 0.371094 19.6056 0.410301 19.4228 0.486454C19.24 0.562607 19.0741 0.674199 18.9347 0.814791L7.75968 12.0048L3.06468 7.29479C2.9199 7.15493 2.74899 7.04496 2.5617 6.97116C2.37442 6.89735 2.17444 6.86116 1.97316 6.86464C1.77189 6.86812 1.57328 6.91121 1.38866 6.99145C1.20404 7.07169 1.03704 7.18751 0.89718 7.33229C0.757323 7.47707 0.647352 7.64799 0.573546 7.83527C0.49974 8.02255 0.463544 8.22254 0.467026 8.42381C0.470508 8.62508 0.5136 8.82369 0.59384 9.00831C0.674081 9.19293 0.789898 9.35993 0.934681 9.49979L6.69468 15.2598C6.83413 15.4004 7.00003 15.512 7.18282 15.5881C7.36561 15.6643 7.56166 15.7035 7.75968 15.7035C7.9577 15.7035 8.15376 15.6643 8.33655 15.5881C8.51934 15.512 8.68524 15.4004 8.82468 15.2598L21.0647 3.01979C21.2169 2.87933 21.3385 2.70885 21.4216 2.5191C21.5047 2.32935 21.5476 2.12444 21.5476 1.91729C21.5476 1.71014 21.5047 1.50523 21.4216 1.31548C21.3385 1.12573 21.2169 0.955255 21.0647 0.814791Z"
                                        fill="#ECC249"
                                    />
                                </svg>
                            </div>
                            <span className="landing_page_content df row">All news in simple and easy-to-read infographics</span>
                        </li>
                        <li className="df row  line-margin-small">
                            <div className="" style={{ marginRight: "15px" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 22 16" fill="none">
                                    <path
                                        d="M21.0647 0.814791C20.9252 0.674199 20.7593 0.562607 20.5765 0.486454C20.3938 0.410301 20.1977 0.371094 19.9997 0.371094C19.8017 0.371094 19.6056 0.410301 19.4228 0.486454C19.24 0.562607 19.0741 0.674199 18.9347 0.814791L7.75968 12.0048L3.06468 7.29479C2.9199 7.15493 2.74899 7.04496 2.5617 6.97116C2.37442 6.89735 2.17444 6.86116 1.97316 6.86464C1.77189 6.86812 1.57328 6.91121 1.38866 6.99145C1.20404 7.07169 1.03704 7.18751 0.89718 7.33229C0.757323 7.47707 0.647352 7.64799 0.573546 7.83527C0.49974 8.02255 0.463544 8.22254 0.467026 8.42381C0.470508 8.62508 0.5136 8.82369 0.59384 9.00831C0.674081 9.19293 0.789898 9.35993 0.934681 9.49979L6.69468 15.2598C6.83413 15.4004 7.00003 15.512 7.18282 15.5881C7.36561 15.6643 7.56166 15.7035 7.75968 15.7035C7.9577 15.7035 8.15376 15.6643 8.33655 15.5881C8.51934 15.512 8.68524 15.4004 8.82468 15.2598L21.0647 3.01979C21.2169 2.87933 21.3385 2.70885 21.4216 2.5191C21.5047 2.32935 21.5476 2.12444 21.5476 1.91729C21.5476 1.71014 21.5047 1.50523 21.4216 1.31548C21.3385 1.12573 21.2169 0.955255 21.0647 0.814791Z"
                                        fill="#ECC249"
                                    />
                                </svg>
                            </div>
                            <span className="landing_page_content df row">Stories curated for the growth of curious young minds</span>
                        </li>
                        <li className="df row  line-margin-small">
                            <div className="" style={{ marginRight: "15px" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 22 16" fill="none">
                                    <path
                                        d="M21.0647 0.814791C20.9252 0.674199 20.7593 0.562607 20.5765 0.486454C20.3938 0.410301 20.1977 0.371094 19.9997 0.371094C19.8017 0.371094 19.6056 0.410301 19.4228 0.486454C19.24 0.562607 19.0741 0.674199 18.9347 0.814791L7.75968 12.0048L3.06468 7.29479C2.9199 7.15493 2.74899 7.04496 2.5617 6.97116C2.37442 6.89735 2.17444 6.86116 1.97316 6.86464C1.77189 6.86812 1.57328 6.91121 1.38866 6.99145C1.20404 7.07169 1.03704 7.18751 0.89718 7.33229C0.757323 7.47707 0.647352 7.64799 0.573546 7.83527C0.49974 8.02255 0.463544 8.22254 0.467026 8.42381C0.470508 8.62508 0.5136 8.82369 0.59384 9.00831C0.674081 9.19293 0.789898 9.35993 0.934681 9.49979L6.69468 15.2598C6.83413 15.4004 7.00003 15.512 7.18282 15.5881C7.36561 15.6643 7.56166 15.7035 7.75968 15.7035C7.9577 15.7035 8.15376 15.6643 8.33655 15.5881C8.51934 15.512 8.68524 15.4004 8.82468 15.2598L21.0647 3.01979C21.2169 2.87933 21.3385 2.70885 21.4216 2.5191C21.5047 2.32935 21.5476 2.12444 21.5476 1.91729C21.5476 1.71014 21.5047 1.50523 21.4216 1.31548C21.3385 1.12573 21.2169 0.955255 21.0647 0.814791Z"
                                        fill="#ECC249"
                                    />
                                </svg>
                            </div>
                            <span className="landing_page_content df row">
                            Future-oriented topics such as science & tech, financial literacy, important national & global events, renewable energy, tech industry, inspiring stories about personalities and much more

                            </span>
                        </li>
                        
                        <li className="df row row-center line-margin-small landing_page_content">Read Pathshala news for 2 minutes everyday and see your general knowledge grow extensively!</li>
                        

                        {/*<li className="df row row-center line-margin-small">*/}
                        {/*    <div className="" style={{ marginRight: "15px" }}>*/}
                        {/*        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 22 16" fill="none">*/}
                        {/*            <path*/}
                        {/*                d="M21.0647 0.814791C20.9252 0.674199 20.7593 0.562607 20.5765 0.486454C20.3938 0.410301 20.1977 0.371094 19.9997 0.371094C19.8017 0.371094 19.6056 0.410301 19.4228 0.486454C19.24 0.562607 19.0741 0.674199 18.9347 0.814791L7.75968 12.0048L3.06468 7.29479C2.9199 7.15493 2.74899 7.04496 2.5617 6.97116C2.37442 6.89735 2.17444 6.86116 1.97316 6.86464C1.77189 6.86812 1.57328 6.91121 1.38866 6.99145C1.20404 7.07169 1.03704 7.18751 0.89718 7.33229C0.757323 7.47707 0.647352 7.64799 0.573546 7.83527C0.49974 8.02255 0.463544 8.22254 0.467026 8.42381C0.470508 8.62508 0.5136 8.82369 0.59384 9.00831C0.674081 9.19293 0.789898 9.35993 0.934681 9.49979L6.69468 15.2598C6.83413 15.4004 7.00003 15.512 7.18282 15.5881C7.36561 15.6643 7.56166 15.7035 7.75968 15.7035C7.9577 15.7035 8.15376 15.6643 8.33655 15.5881C8.51934 15.512 8.68524 15.4004 8.82468 15.2598L21.0647 3.01979C21.2169 2.87933 21.3385 2.70885 21.4216 2.5191C21.5047 2.32935 21.5476 2.12444 21.5476 1.91729C21.5476 1.71014 21.5047 1.50523 21.4216 1.31548C21.3385 1.12573 21.2169 0.955255 21.0647 0.814791Z"*/}
                        {/*                fill="#ECC249"*/}
                        {/*            />*/}
                        {/*        </svg>*/}
                        {/*    </div>*/}
                        {/*    <span className="landing_page_content df row">Vast Question Banks to Help Excel in Exams</span>*/}
                        {/*</li>*/}
                        {/*<li className="df row row-center line-margin-small">*/}
                        {/*    <div className="" style={{ marginRight: "15px" }}>*/}
                        {/*        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 22 16" fill="none">*/}
                        {/*            <path*/}
                        {/*                d="M21.0647 0.814791C20.9252 0.674199 20.7593 0.562607 20.5765 0.486454C20.3938 0.410301 20.1977 0.371094 19.9997 0.371094C19.8017 0.371094 19.6056 0.410301 19.4228 0.486454C19.24 0.562607 19.0741 0.674199 18.9347 0.814791L7.75968 12.0048L3.06468 7.29479C2.9199 7.15493 2.74899 7.04496 2.5617 6.97116C2.37442 6.89735 2.17444 6.86116 1.97316 6.86464C1.77189 6.86812 1.57328 6.91121 1.38866 6.99145C1.20404 7.07169 1.03704 7.18751 0.89718 7.33229C0.757323 7.47707 0.647352 7.64799 0.573546 7.83527C0.49974 8.02255 0.463544 8.22254 0.467026 8.42381C0.470508 8.62508 0.5136 8.82369 0.59384 9.00831C0.674081 9.19293 0.789898 9.35993 0.934681 9.49979L6.69468 15.2598C6.83413 15.4004 7.00003 15.512 7.18282 15.5881C7.36561 15.6643 7.56166 15.7035 7.75968 15.7035C7.9577 15.7035 8.15376 15.6643 8.33655 15.5881C8.51934 15.512 8.68524 15.4004 8.82468 15.2598L21.0647 3.01979C21.2169 2.87933 21.3385 2.70885 21.4216 2.5191C21.5047 2.32935 21.5476 2.12444 21.5476 1.91729C21.5476 1.71014 21.5047 1.50523 21.4216 1.31548C21.3385 1.12573 21.2169 0.955255 21.0647 0.814791Z"*/}
                        {/*                fill="#ECC249"*/}
                        {/*            />*/}
                        {/*        </svg>*/}
                        {/*    </div>*/}
                        {/*    <span className="landing_page_content df row">Expert Doubt Solving</span>*/}
                        {/*</li>*/}
                    </ul>
                    <div className="about-img flex-1" id="kids_corner_features">
                        {/* <embed src={features_img} alt="" className="about-us-img" /> */}
                        <div className="kids-corner-features">
                            <LandingPageSlider
                                onRead={() => {

                                }}
                                onClick={(answer, data, index) => {

                                }}
                                storyHasQuestion={false}
                                data={data}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default KidsCornerFeatures