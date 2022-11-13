import NoDataImg from "../assets/images/common/nodata.gif"
const NoData = (props) => {
    return (
        <>
            <div className="row col_center border-primary radius-primary">
                <div className="no-book">
                    <img src={NoDataImg} style={{ userSelect: "none",maxWidth:"100%", MozWindowDragging: "no-drag" }} />
                    <p className="typo-heading font-bold" style={{ color: "#000" }}>{props.text??'No Data'}</p>
                </div>
            </div>
        </>
    )
}
export default NoData;