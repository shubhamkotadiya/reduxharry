import { useEffect, useState } from "react";
import TestimonialCard from "../common/TestimonialCard";
import testiMonial_aditi_trivedi from "../../../assets/images/landing_page_new/testimonial/aditi_trivedi.jpeg";
import testiMonial_ananya_shukla from "../../../assets/images/landing_page_new/testimonial/ananya_shukla.jpg";
import testiMonial3_vikram_pande from "../../../assets/images/landing_page_new/testimonial/vikram_pande.jpeg";
import testiMonial4_sundareswaran_iyer from "../../../assets/images/landing_page_new/testimonial/sundareswaran_iyer.jpg";
import testiMonial_rajat_ubhaykar from "../../../assets/images/landing_page_new/testimonial/rajat_ubhaykar.jpeg";
import testiMonial_het_kapadnekar from "../../../assets/images/landing_page_new/testimonial/het_kapadnekar.jpg";

const Testimonial = () => {
    const max_tile = 3;
    const getTileNumber = () => {
        if (window.innerWidth < 800) {
            return 1;
        } else if (window.innerWidth > 800 && window.innerWidth < 960) {
            return 1;
        } else {
            return max_tile;
        }
    };
    const [tileNumber, setTileNumber] = useState(getTileNumber());
    const [currentTile, setCurrentTile] = useState(0);

    const dataList = [
        {
            id: "1",
            profile_img: testiMonial_het_kapadnekar,
            name: "Het Kapadnekar",
            sub_details: "Std 11th Humanities, Udgam School",
            content:
                "With Pathshala, studies are not just long paragraphs and boring descriptions. Pathshala has now become my perfect tool to learn, practice and revise all of my subjects. The doubt solving feature has been quite handy. I have now been able to not only understand and visualise all the concepts of the Humanities stream but also gotten guidance regarding my career.",
        },
        {
            id: "2",
            profile_img: testiMonial_ananya_shukla,
            name: "Ananya Shukla",
            sub_details: "Std 11th Humanities, Sheth C.N. English Medium School",
            content:
                "I never knew there existed a platform to learn Arts and that too this good. I am in complete awe of Pathshala. In fact I have never opened my textbooks again. Everything is available already and that too in a crisp and interactive format.",
        },
        {
            id: "3",
            profile_img: testiMonial_rajat_ubhaykar,
            name: "Rajat Ubhaykar",
            sub_details: "All India Rank 49, UPSC CSE 2020",
            content:
                "Pathshala has quickly become my go-to knowledge portal for their succinct, context-rich and well-researched coverage of national and international developments. I especially enjoy their superb explainers on foreign affairs and scientific research, something that's often missing elsewhere. I highly recommend the Pathshala app not only for the curious, discerning reader, but also as a supplementary resource for UPSC aspirants",
        },
        {
            id: "4",
            profile_img: testiMonial_aditi_trivedi,
            name: "Aditi Trivedi",
            sub_details: "Std 11th Humanities, Gnyan Dham School",
            content:
                "I was skeptical about taking up Arts as the studies tend to be boring and the text way too cumbersome. I was looking for tips and tricks to make it more interesting, that’s where I came across Pathshala. Pathshala very well explained the academics, and it also gave me the proper career guidance that I was so in need of. The Graphics are super neat, the text is adequate and the videos make it immersive. Playing and excelling quizzes has quickly become my new hobby, the user interface is just too good.              ",
        },
        {
            id: "5",
            profile_img: testiMonial4_sundareswaran_iyer,
            name: "Sundareswaran Iyer",
            sub_details: " Father of Radha Iyer, Std 11th Humanities, Cosmos Castle International School            ",
            content:
                "As a parent, I would always want my daughter to enjoy what she studies along with the expectation of good results. Summachar Pathshala has not only been informative, but it has also proven to be engaging as a platform. My daughter understands concepts in a better and effective way, and enjoys the learning experience even more now.",
        },
        {
            id: "6",
            profile_img: testiMonial3_vikram_pande,
            name: "Vikrant Pande",
            sub_details: "Faculty (Political Science), Ramnurain Ruia College",
            content:
                "Pathshala provides necessary evidence and information in a crisp and succinct manner and still enough to eliminate any obscurity related to a vast array of issues and themes. The topics covered by Pathshala range from national politics to trade and from international relations to science. Pathshala has not only been a source of news but also a good repository of information.             ",
        },
    ];
    const onResize = () => {
        setTileNumber(getTileNumber());
    };
    useEffect(() => {
        onResize();
        window.addEventListener("resize", onResize);
        return () => {
            return window.removeEventListener("resize", onResize);
        };
    }, []);
    return (
        <div className="landing_page_container">
            <div className="df row landing_page_card_grid">
                {dataList &&
                    dataList.length > 0 &&
                    dataList.slice(currentTile, currentTile + tileNumber).map((data, index) => {
                        return (
                            <TestimonialCard
                                content={data.content}
                                margin_h={(index + 1) % 2 === 0}
                                profile_img={data.profile_img}
                                name={data.name}
                                sub_details={data.sub_details}
                                key={data.id + "/" + index}
                                cardColor={data.id % 3 == 0 ? "#6699CC" : data.id % 3 == 1 ? "#F44174" : "#339989"}
                            />
                        );
                    })}
            </div>

            {dataList.length / tileNumber > 0 && (
                <div className="row df row center  m-v-primary">
                    <button
                        className="df center"
                        style={{ height: "30px", width: "50px" }}
                        onClick={() => {
                            if (currentTile > 0) {
                                setCurrentTile(currentTile - 1);
                            }
                        }}
                    >
                        {/* right arrow */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="14" viewBox="0 0 10 14" fill="none">
                            <path
                                d="M1.22674 6.0531L6.88008 0.399769C7.00403 0.274798 7.15149 0.175605 7.31397 0.107913C7.47645 0.0402218 7.65073 0.00537109 7.82674 0.00537109C8.00276 0.00537109 8.17703 0.0402218 8.33951 0.107913C8.50199 0.175605 8.64946 0.274798 8.77341 0.399769C9.02174 0.649585 9.16113 0.987521 9.16113 1.33977C9.16113 1.69202 9.02174 2.02995 8.77341 2.27977L4.05341 6.99977L8.77341 11.7198C9.02174 11.9696 9.16113 12.3075 9.16113 12.6598C9.16113 13.012 9.02174 13.35 8.77341 13.5998C8.64882 13.7233 8.50107 13.8211 8.33862 13.8875C8.17617 13.9538 8.00222 13.9874 7.82674 13.9864C7.65127 13.9874 7.47732 13.9538 7.31487 13.8875C7.15242 13.8211 7.00466 13.7233 6.88008 13.5998L1.22674 7.94644C1.10177 7.82248 1.00258 7.67502 0.934888 7.51254C0.867196 7.35006 0.832345 7.17578 0.832345 6.99977C0.832345 6.82375 0.867196 6.64948 0.934888 6.487C1.00258 6.32452 1.10177 6.17705 1.22674 6.0531Z"
                                fill={dataList && dataList.length > 0 && currentTile > 0 ? "#5C56D4" : "#B8B8B9"}
                            />
                        </svg>
                    </button>
                    <button
                        className="df center"
                        style={{ height: "30px", width: "50px" }}
                        onClick={() => {
                            if (currentTile + tileNumber < dataList.length) {
                                setCurrentTile(currentTile + 1);
                            }
                        }}
                    >
                        {/* {currentTile + ( tileNumber-1 )}""{dataList.length} */}
                        {/* Left arrow */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="14" viewBox="0 0 10 14" fill="none">
                            <path
                                d="M8.77326 6.0531L3.11992 0.399769C2.99597 0.274798 2.84851 0.175605 2.68603 0.107913C2.52355 0.0402218 2.34927 0.00537109 2.17326 0.00537109C1.99724 0.00537109 1.82297 0.0402218 1.66049 0.107913C1.49801 0.175605 1.35054 0.274798 1.22659 0.399769C0.978256 0.649585 0.838867 0.987521 0.838867 1.33977C0.838867 1.69202 0.978256 2.02995 1.22659 2.27977L5.94659 6.99977L1.22659 11.7198C0.978256 11.9696 0.838867 12.3075 0.838867 12.6598C0.838867 13.012 0.978256 13.35 1.22659 13.5998C1.35118 13.7233 1.49893 13.8211 1.66138 13.8875C1.82383 13.9538 1.99778 13.9874 2.17326 13.9864C2.34873 13.9874 2.52268 13.9538 2.68513 13.8875C2.84758 13.8211 2.99534 13.7233 3.11992 13.5998L8.77326 7.94644C8.89823 7.82248 8.99742 7.67502 9.06511 7.51254C9.1328 7.35006 9.16765 7.17578 9.16765 6.99977C9.16765 6.82375 9.1328 6.64948 9.06511 6.487C8.99742 6.32452 8.89823 6.17705 8.77326 6.0531Z"
                                fill={dataList && dataList.length > 0 && currentTile + tileNumber < dataList.length ? "#5C56D4" : "#B8B8B9"}
                            />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};
export default Testimonial;
