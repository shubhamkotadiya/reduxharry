import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { Grid } from "@mui/material";
import { setDateToAppFormat } from "../../../common/helper";
import { LockingSystemContext } from "../../../components/lockingsystem/LockingSysytemPopUp";
const KidsCornerAndCampusBuzzPopUp = (props) => {
    const history = useHistory();

    const data = props.data;

    const lockSystem = useContext(LockingSystemContext)
    const [iframeLoading, setIframeLoading] = useState(true)
    if (data && Object.keys(data).length > 0) {
        const format = data.file.split(".").pop()

        return (
            <>
                <div className="infographic-main-container centered_outer_container flex-1 p-h-primary "
                    style={{ marginLeft: "auto",overflowY:"hidden", marginRight: "auto" }}
                >
                    <div className="df fit-content column p-h-primary ">
                        <Grid className="row   radius-primary p-v-primary" container columnSpacing={1} rowSpacing={1}>
                            <Grid container item xs={4} md={2}>
                                <span className="typo-sub-headings  font-bold" style={{ color: "#000" }}>Title : </span>
                            </Grid>
                            <Grid container item xs={8} md={10}>
                                <span className="typo-sub-headings " style={{ color: "#000" }}> &nbsp;{data.title ? data.title : ""}</span>
                            </Grid>


                            <Grid container item xs={4} md={2}>
                                <span className="typo-sub-headings  font-bold" style={{ color: "#000" }}>By : </span>
                            </Grid>
                            <Grid container item xs={8} md={10}>
                                <span className="typo-sub-headings " style={{ color: "#000" }}> &nbsp;{data.user && data.user.name ? data.user.name : "Summachar"}</span>
                            </Grid>


                            <Grid container item xs={4} md={2}>
                                <span className="typo-sub-headings  font-bold" style={{ color: "#000" }}>Type : </span>
                            </Grid>
                            <Grid container item xs={8} md={10}>
                                <span className="typo-sub-headings " style={{ color: "#000" }}> &nbsp;{data.competition_type}</span>
                            </Grid>


                            <Grid container item xs={4} md={2}>
                                <span className="typo-sub-headings  font-bold" style={{ color: "#000" }}>Date of Submission : </span>
                            </Grid>
                            <Grid container item xs={8} md={10}>
                                <span className="typo-sub-headings " style={{ color: "#000" }}> &nbsp;{setDateToAppFormat(data.created)}</span>
                            </Grid>
                        </Grid>





                        <div className="df p-relative flex-1 column" style={{ overflowY: "hidden", flexWrap: "nowrap", paddingBottom: "10px" }}>
                            {iframeLoading && <div className="df row splash-loader flex-1 fit-absolute">

                            </div>}
                            {(format === "jpeg" || format === "jpg" || format === "png" || format === "gif") ?



                                <>
                                    <img src={data.file} onLoad={() => { setIframeLoading(false) }} className="df fit-content border-primary" style={{objectFit:"contain",background:"lightGray"}} alt="" />
                                </>

                                :

                                <iframe
                                    loading={"lazy"}

                                    onLoad={() => { setIframeLoading(false) }}
                                    onAbort={() => { lockSystem.openPopUp("ONLY_TEXT", "Oops, file cant be loaded "); setIframeLoading(false) }}
                                    src={"https://docs.google.com/gview?url=" + data.file + "&embedded=true"}
                                    style={{ minHeight: "0px" }}
                                    className="df fit-content"
                                    frameBorder={"0"}>

                                </iframe>}
                        </div>


                    </div>

                </div>
            </>
        )
    } else {
        return <></>
    }
};
export default KidsCornerAndCampusBuzzPopUp;
