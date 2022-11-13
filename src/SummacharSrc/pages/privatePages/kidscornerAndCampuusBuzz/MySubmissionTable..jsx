import { useEffect, useState } from "react";
import '../../../assets/css/kidscorner.css'
import { setDateToAppFormat } from "../../../common/helper";
import Modal from '@mui/material/Modal';
const MySubmissionTable = (props) => {
    const getColors = (type) => {
        let colors = {
            text_and_type_color: "#1B7742",
            tile: "#BEF5D5"
        }
        if (type === "Essay") {
            colors = {
                text_and_type_color: "#1B7742",
                tile: "#BEF5D5",
            }
        } else if (type === "Story") {
            let colors = {
                text_and_type_color: "#1B7742",
                tile: "#BEF5D5"
            }
        } else if (type === "Poem") {
            colors = {
                text_and_type_color: "#C0900C",
                tile: "#FCF0CF"
            }
        } else if (type === "Drawing") {
            colors = {
                text_and_type_color: "#0376C9",
                tile: "#C0E4FE"
            }
        }
        return colors
    }
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,

    });
    const onResize = () => {
        let height = window.innerHeight;
        let width = window.innerWidth;

        setWindowSize({ width: width, height: height });

    };

    const [modal, setModal] = useState({ visiblity: false, data: {} })

    useEffect(() => {
        onResize();
        window.addEventListener("resize", onResize);
        return () => {
            return window.removeEventListener("resize", onResize);
        };
    }, []);


    return (
        <>
            <Modal
                open={modal.visiblity}
                onClose={() => { setModal({ visiblity: false, data: {} }) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div
                    className='fit-content row center df '

                >

                    <div
                        className=' fit-content '
                        style={{ position: "absolute", top: "0px", left: "0px", zIndex: 0 }}
                        onClick={() => {
                            setModal({ visiblity: false, data: {} })
                        }}
                    ></div>

                    <div className='p-relative radius-primary df row innerPopUp pop-up-animation'>

                        <p className='txt-medium txt-secondary' style={{ margin: '5px 0px' }}>
                            Are you sure to delete Your submission?
                        </p>
                        <div className="df row center">



                            <button className="typo-btn-primary btn-secondary radius-primary m-v-primary" style={{ marginBottom: "0px" }} onClick={async() => { await props.onDltBtnClick(modal.data); setModal({ visiblity: false, data: {} }) }} >
                                Delete
                            </button>
                            <button className="typo-btn-primary btn-primary radius-primary m-v-primary" style={{ marginBottom: "0px" }} onClick={() => { setModal({ visiblity: false, data: {} }) }}>
                                Go Back
                            </button>



                        </div>
                    </div>
                </div>

            </Modal>
            <div className="row df  kids-corner-table radius-primary column" style={{ overflow: "hidden" }}>
                <div className="df  row row-center thead-row">
                    <div className="df flex-1 p-primary">
                        <span className="typo-sub-headings">Title</span>
                    </div>
                    {windowSize.width > 960 &&
                        <>
                            <div className="df center kidscorner-cell p-primary">
                                <span className="typo-sub-headings">Type</span>
                            </div>
                            <div className="df center kidscorner-cell p-primary">
                                <span className="typo-sub-headings">Date</span>
                            </div>
                            <div className="df center kidscorner-cell p-primary">
                                <span className="typo-sub-headings">Status</span>
                            </div>
                        </>}
                    <div className="df center kidscorner-action-cell p-primary">
                        <span className="typo-sub-headings">Actions</span>
                    </div>
                </div>
                {

                    props.data && props.data.map((data, index) => {
                        const color = getColors(data.competition_type)
                        return (
                            <div className="df  row row-center thead-row" style={{ background: index % 2 == 0 ? "white" : "#F5F5F5" }} key={index}>
                                <div className="df flex-1 column p-primary">
                                    <span className="typo-sub-headings">{data.title && data.title.length > 40 ? data.title.slice(0, 38) + "..." : data.title}</span>
                                    {windowSize.width <= 960 &&
                                        <div className="row df" style={{ flexWrap: "wrap" }}>
                                            <div className="df  kidscorner-cell p-primary" style={{ paddingLeft: "0px" }}>

                                                <span className="df p-h-primary typo-meta-data txt-white" style={{ color: "white", backgroundColor: color.text_and_type_color, borderRadius: "50px", lineHeight: "100%", paddingTop: '4px', paddingBottom: "4px" }}>
                                                    {data.competition_type}
                                                </span>
                                            </div>
                                            <div className="df  kidscorner-cell p-primary">
                                                <span className="typo-meta-data kidscorner-date-cell" style={{ color: "#000" }}>{setDateToAppFormat(data.created)}</span>
                                            </div>
                                            <div className="df  kidscorner-cell p-primary">
                                                <span className="typo-meta-data" style={{ color: "#000" }}>{data.status}</span>
                                            </div>
                                        </div>}
                                </div>
                                {windowSize.width > 960 &&
                                    <>
                                        <div className="df center kidscorner-cell p-primary">
                                            <span className="typo-sub-headings">{ }</span>
                                            <span className="df p-h-primary typo-meta-data txt-white" style={{ color: "white", backgroundColor: color.text_and_type_color, borderRadius: "50px", lineHeight: "100%", paddingTop: '4px', paddingBottom: "4px" }}>
                                                {data.competition_type}
                                            </span>
                                        </div>
                                        <div className="df center kidscorner-cell p-primary">
                                            <span className="typo-sub-headings">{setDateToAppFormat(data.created)}</span>
                                        </div>
                                        <div className="df center kidscorner-cell p-primary">
                                            <span className="typo-sub-headings">{data.status}</span>
                                        </div>
                                    </>}
                                <div className="df center kidscorner-action-cell p-primary">

                                    <button className="typo-sub-headings pointer " style={{ marginRight: "10px" }} onClick={() => { setModal({ visiblity: true, data: data }) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="pointer" width="20" height="21" viewBox="0 0 14 17" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 0.5C5.81434 0.500099 5.63237 0.551883 5.47447 0.649552C5.31658 0.747222 5.18899 0.886919 5.106 1.053L4.382 2.5H1C0.734784 2.5 0.48043 2.60536 0.292893 2.79289C0.105357 2.98043 0 3.23478 0 3.5C0 3.76522 0.105357 4.01957 0.292893 4.20711C0.48043 4.39464 0.734784 4.5 1 4.5V14.5C1 15.0304 1.21071 15.5391 1.58579 15.9142C1.96086 16.2893 2.46957 16.5 3 16.5H11C11.5304 16.5 12.0391 16.2893 12.4142 15.9142C12.7893 15.5391 13 15.0304 13 14.5V4.5C13.2652 4.5 13.5196 4.39464 13.7071 4.20711C13.8946 4.01957 14 3.76522 14 3.5C14 3.23478 13.8946 2.98043 13.7071 2.79289C13.5196 2.60536 13.2652 2.5 13 2.5H9.618L8.894 1.053C8.81101 0.886919 8.68342 0.747222 8.52553 0.649552C8.36763 0.551883 8.18566 0.500099 8 0.5H6ZM4 6.5C4 6.23478 4.10536 5.98043 4.29289 5.79289C4.48043 5.60536 4.73478 5.5 5 5.5C5.26522 5.5 5.51957 5.60536 5.70711 5.79289C5.89464 5.98043 6 6.23478 6 6.5V12.5C6 12.7652 5.89464 13.0196 5.70711 13.2071C5.51957 13.3946 5.26522 13.5 5 13.5C4.73478 13.5 4.48043 13.3946 4.29289 13.2071C4.10536 13.0196 4 12.7652 4 12.5V6.5ZM9 5.5C8.73478 5.5 8.48043 5.60536 8.29289 5.79289C8.10536 5.98043 8 6.23478 8 6.5V12.5C8 12.7652 8.10536 13.0196 8.29289 13.2071C8.48043 13.3946 8.73478 13.5 9 13.5C9.26522 13.5 9.51957 13.3946 9.70711 13.2071C9.89464 13.0196 10 12.7652 10 12.5V6.5C10 6.23478 9.89464 5.98043 9.70711 5.79289C9.51957 5.60536 9.26522 5.5 9 5.5Z" fill="#FF6D6D" />
                                        </svg>
                                    </button>

                                    <button className="typo-sub-headings pointer" onClick={() => { props.onClick(data) }}>
                                        <svg className="pointer" xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                            <path d="M10 12.5C10.5304 12.5 11.0391 12.2893 11.4142 11.9142C11.7893 11.5391 12 11.0304 12 10.5C12 9.96957 11.7893 9.46086 11.4142 9.08579C11.0391 8.71071 10.5304 8.5 10 8.5C9.46957 8.5 8.96086 8.71071 8.58579 9.08579C8.21071 9.46086 8 9.96957 8 10.5C8 11.0304 8.21071 11.5391 8.58579 11.9142C8.96086 12.2893 9.46957 12.5 10 12.5Z" fill="#5C56D4" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.458008 10.5C1.73201 6.443 5.52201 3.5 10 3.5C14.478 3.5 18.268 6.443 19.542 10.5C18.268 14.557 14.478 17.5 10 17.5C5.52201 17.5 1.73201 14.557 0.458008 10.5ZM14 10.5C14 11.5609 13.5786 12.5783 12.8284 13.3284C12.0783 14.0786 11.0609 14.5 10 14.5C8.93914 14.5 7.92173 14.0786 7.17158 13.3284C6.42143 12.5783 6.00001 11.5609 6.00001 10.5C6.00001 9.43913 6.42143 8.42172 7.17158 7.67157C7.92173 6.92143 8.93914 6.5 10 6.5C11.0609 6.5 12.0783 6.92143 12.8284 7.67157C13.5786 8.42172 14 9.43913 14 10.5Z" fill="#5C56D4" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default MySubmissionTable