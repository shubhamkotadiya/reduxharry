// import "../../../assets/css/NewsPage.css";
// import "../../../assets/css/commonImgDivs.css";
import "../../../assets/css/Bookmarks.css"
import close from "../../../assets/images/common/close_book.svg"
import { Link } from "react-router-dom"
import { GridContext } from "../../../common/GridConfig"
import { useContext } from "react"
import { Grid } from "@mui/material"
import AccessBadges from "../../../components/lockingsystem/access_badges_component/AccessBadges"

const BookmarksPage = (props) => {
    const GridConfig = useContext(GridContext)

    return (
        <>
            <div className="outer_bookmarks" >
                <div className="common_container_inner common-grid-outer" style={{ cursor: "default" }}>
                    <div className="container centered_outer_container">
                        <div className="df flex-1 m-h-primary p-relative" >
                            <Grid className="row  radius-primary " container spacing={GridConfig.spacing}>
                                {
                                    props.data.map((data, keyIndex) => {
                                        return (
                                            <Grid container key={keyIndex} item xs={GridConfig.tiles_at_xs} sm={GridConfig.tiles_at_sm} md={GridConfig.tiles_at_md}>
                                                <div className="common-grid-item df row " key={keyIndex} >
                                                <AccessBadges data={data} calledFrom="NEWS" />
                                                    <div className="row p-relative hover-zoom">
                                                        
                                                        <img className="common-grid-item df row radius-primary" src={data.slides[0].media} alt="" />
                                                        {/* <div className="close_book" onClick={(e) => { props.bookMark(data, false, keyIndex) }}>
                                                        <img src={close} />
                                                    </div> */}

                                                        <div className="hover pointer">
                                                            <div className=" fit-content" onClick={(e) => { props.openPopUp(data, keyIndex) }}>
                                                                {/* //ane na hatavti */}
                                                            </div>
                                                            <div className="bottom" onClick={(e) => { props.bookMark(data, false, keyIndex) }}>
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  >
                                                                    <path d="M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3ZM17 18L12 15.82L7 18L6.5 19C6.5 18.45 10.45 17.5 11 17.5L17 18C17.55 18 17 5.45 17 6V18Z" fill="white" />
                                                                </svg>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default BookmarksPage;