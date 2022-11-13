import { Grid } from "@mui/material"
import { useContext } from "react"
import { GridContext } from "../../../common/GridConfig"
import NoCertificateScreen from "./NoCertificateScreen"

const Certificate = (props) => {

    const GridConfig = useContext(GridContext)
    console.log(props.data)
    return (
        <>
            <div className="body df flex-1" style={{justifyContent:"flex-start",alignItems:"flex-start"}}>
                <div className="outer_bookmarks" >
                    <div className="common_container_inner common-grid-outer" style={{ cursor: "default" }}>
                        <div className="container centered_outer_container">
                            <div className="df flex-1 m-h-primary p-relative" >
                                <Grid className="row  radius-primary " container spacing={GridConfig.spacing}>
                                    {!props.loading && props.data && props.data.length > 0 && props.data.map((data, index) => {
                                        return (
                                            <Grid container item xs={GridConfig.tiles_at_xs} key={index} sm={GridConfig.tiles_at_sm} md={GridConfig.tiles_at_md}>
                                                <img className="row radius-primary border-primary pointer" onClick={() => { props.onClick(data) }} src={data.certificate} alt="" />
                                            </Grid>
                                        )
                                    })}
                                    {
                                        props.loading && [1, 2, 3, 4].map((val, index) => {
                                            return (
                                                <Grid container item xs={GridConfig.tiles_at_xs} key={index} sm={GridConfig.tiles_at_sm} md={GridConfig.tiles_at_md}>
                                                    <div className="df row splash-loader radius-primary" style={{ paddingTop: "56%" }}>

                                                    </div>
                                                </Grid>
                                            )
                                        })
                                    }
                                    {!props.loading && props.data && props.data.length <= 0 && <NoCertificateScreen />}
                                </Grid>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Certificate