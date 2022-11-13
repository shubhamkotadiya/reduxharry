import { useEffect, useState } from "react";

import perks_1 from '../../../assets/images/landing_page_new/playandwin/1.png';
import perks_2 from '../../../assets/images/landing_page_new/playandwin/2.png';
import perks_3 from '../../../assets/images/landing_page_new/playandwin/3.png';
import { useHistory } from "react-router";
import Grid from '@mui/material/Grid';
import PlayAndWinCard from "../common/PlayAndWinCard";
import { Link } from "react-router-dom";
const PlayParticipateAndWin = () => {
    const history = useHistory()
    const getTileNumber = () => {
        if (window.innerWidth <= 400) {
            return 1
        } else if (window.innerWidth > 400 && window.innerWidth < 960) {
            return 1
        } else {
            return 3
        }
    }
    const [tileNumber, setTileNumber] = useState(getTileNumber())
    const [currentTile, setCurrentTile] = useState(0)

    const dataList = [
        {
            id: "1",
            img: perks_1,
            heading: "Fun Activities",
            description: "Daily quizzes, word-finder, sudoku and other games to sharpen minds! Participate and win certificates and fun prizes!",
            type: "story"
        },
        // {
        //     id: "2",
        //     img: perks_2,
        //     heading: "Kids’ Corner",
        //     description: "A dedicated hall of fame that showcases the talents of all our budding artists, authors, poets and designers across India! Send us your creative submissions to get featured and win certificates and prizes!",
        //     type: "quiz"
        // },
        // {
        //     id: "3",
        //     img: perks_3,
        //     heading: "Campus Buzz",
        //     description: "Relive the memories of fun events from your school. See what other children across the country are upto in their schools. This is a place for schools to show off their achievements and events.",
        //     type: "competition"
        // },

         {
            id: "2",
            img: perks_2,
            heading: "Games",
            description: "Non-stop entertainment with mind games like Sudoku and Word Finder.",
            type: "quiz"
        },
        {
            id: "3",
            img: perks_3,
            heading: "Stuff of the Day",
            description: "Start your day the Pathshala way with daily thoughts, facts,  jokes and question.",
            type: "competition"
        },
    ]
    const onResize = () => {
        setTileNumber(getTileNumber())
    }
    useEffect(() => {
        onResize();
        window.addEventListener('resize', onResize)
        return () => { return window.removeEventListener('resize', onResize) }
    }, [])
    return (
        <div className="landing_page_container">
            <div className="df row landing_page_card_grid">
                <Grid container spacing={2}>

                    {dataList && dataList.length > 0 && dataList.splice(currentTile, tileNumber).map((data, index) => {
                        return (
                            <Grid key={index + "/" + data.id} item xs={12 / tileNumber}>
                                <PlayAndWinCard

                                    img={data.img}
                                    heading={data.heading}
                                    description={data.description}
                                    onClick={() => { history.push('/home') }}
                                    margin_h={(index + 1) % 2 === 0}
                                    btn_txt={data.type === "quiz" ? "Play Now" : data.type === "story" ? "Read More" : "Join Now"}
                                />
                            </Grid>
                        )
                    })}
                </Grid>

            </div>
            {dataList.length / tileNumber > 0 && <div className="row df row center  m-v-primary">
                <button className="df center" style={{ height: "30px", width: "50px" }} onClick={() => {
                    if (currentTile > 0) {
                        setCurrentTile(currentTile - 1)
                    }
                }}>
                    {/* right arrow */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="14" viewBox="0 0 10 14" fill="none">
                        <path d="M1.22674 6.0531L6.88008 0.399769C7.00403 0.274798 7.15149 0.175605 7.31397 0.107913C7.47645 0.0402218 7.65073 0.00537109 7.82674 0.00537109C8.00276 0.00537109 8.17703 0.0402218 8.33951 0.107913C8.50199 0.175605 8.64946 0.274798 8.77341 0.399769C9.02174 0.649585 9.16113 0.987521 9.16113 1.33977C9.16113 1.69202 9.02174 2.02995 8.77341 2.27977L4.05341 6.99977L8.77341 11.7198C9.02174 11.9696 9.16113 12.3075 9.16113 12.6598C9.16113 13.012 9.02174 13.35 8.77341 13.5998C8.64882 13.7233 8.50107 13.8211 8.33862 13.8875C8.17617 13.9538 8.00222 13.9874 7.82674 13.9864C7.65127 13.9874 7.47732 13.9538 7.31487 13.8875C7.15242 13.8211 7.00466 13.7233 6.88008 13.5998L1.22674 7.94644C1.10177 7.82248 1.00258 7.67502 0.934888 7.51254C0.867196 7.35006 0.832345 7.17578 0.832345 6.99977C0.832345 6.82375 0.867196 6.64948 0.934888 6.487C1.00258 6.32452 1.10177 6.17705 1.22674 6.0531Z" fill={dataList && dataList.length > 0 && currentTile > 0 ? "#5C56D4" : "#B8B8B9"} />
                    </svg>
                </button>
                <button className="df center" style={{ height: "30px", width: "50px" }} onClick={() => {
                    if (currentTile < (dataList.length / tileNumber)) {
                        setCurrentTile(currentTile + 1)
                    }
                }}>
                    {/* Left arrow */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="14" viewBox="0 0 10 14" fill="none">
                        <path d="M8.77326 6.0531L3.11992 0.399769C2.99597 0.274798 2.84851 0.175605 2.68603 0.107913C2.52355 0.0402218 2.34927 0.00537109 2.17326 0.00537109C1.99724 0.00537109 1.82297 0.0402218 1.66049 0.107913C1.49801 0.175605 1.35054 0.274798 1.22659 0.399769C0.978256 0.649585 0.838867 0.987521 0.838867 1.33977C0.838867 1.69202 0.978256 2.02995 1.22659 2.27977L5.94659 6.99977L1.22659 11.7198C0.978256 11.9696 0.838867 12.3075 0.838867 12.6598C0.838867 13.012 0.978256 13.35 1.22659 13.5998C1.35118 13.7233 1.49893 13.8211 1.66138 13.8875C1.82383 13.9538 1.99778 13.9874 2.17326 13.9864C2.34873 13.9874 2.52268 13.9538 2.68513 13.8875C2.84758 13.8211 2.99534 13.7233 3.11992 13.5998L8.77326 7.94644C8.89823 7.82248 8.99742 7.67502 9.06511 7.51254C9.1328 7.35006 9.16765 7.17578 9.16765 6.99977C9.16765 6.82375 9.1328 6.64948 9.06511 6.487C8.99742 6.32452 8.89823 6.17705 8.77326 6.0531Z" fill={dataList && dataList.length > 0 && currentTile < (dataList.length / tileNumber) ? "#5C56D4" : "#B8B8B9"} />
                    </svg>
                </button>

            </div>}

            <div className="contact_us_form m-v-primary" style={{marginLeft:'auto',marginRight:"auto"}}>
                <Link to="/signin" className="line-margin-small row df center btn btn-primary landing_page_btn_priamry radius-primary">
                Play, Participate and Win!
                </Link>
            </div>


        </div>
    )
}
export default PlayParticipateAndWin