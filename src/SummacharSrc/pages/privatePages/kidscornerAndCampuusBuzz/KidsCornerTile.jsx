import { useEffect, useState } from "react"

const KidsCornerTile = (props) => {
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

        if (props.showStatus) {
            if (props.data.status == "Review") {
                colors['status'] = "orange"
            } else if (props.data.status == "Rejected") {
                colors['status'] = "red"
            }else{
                colors['status'] = "green"
            }
        } else {
            colors['status'] = colors.tile
        }
        return colors
    }
    const [color, setColor] = useState(getColors(props.data.competition_type ? props.data.competition_type : 'Essay'))
    return (
        <div className="radius-primary p-relative row pointer" style={{ paddingTop: "125%", overflow: "hidden", backgroundColor: color.tile }}>
            <div className="fit-content df fit-absolute p-primary column" onClick={() => { props.onClick(props.data) }} style={{ objectFit: "contain" }}>
                <div className="df row space-between" >
                    <span className="df p-h-primary typo-meta-data txt-white" style={{ color: "white", backgroundColor: color.status, borderRadius: "50px", lineHeight: "100%", paddingTop: '4px', paddingBottom: "4px" }}>
                        {props.data.status}
                    </span>
                    <span className="df p-h-primary typo-meta-data txt-white" style={{ color: "white", backgroundColor: color.text_and_type_color, borderRadius: "50px", lineHeight: "100%", paddingTop: '4px', paddingBottom: "4px" }}>
                        {props.data.competition_type}
                    </span>
                </div>
                <span className=" row center typo-sub-headings m-v-primary " style={{ fontWeight: 500 }}>{props.data.title ? props.data.title.length > 35 ? props.data.title.slice(0, 33) + "..." : props.data.title : <>&nbsp;</>}</span>
                <span className=" row center typo-Description " style={{ color: color.text_and_type_color }}>By : {props.data.user && props.data.user.full_name ? props.data.user.full_name : "Summachar"} </span>

                <span className="typo-meta-data row center">{props.data.user && props.data.user.grade ? props.data.user.grade + "th" : "10th"} Grade</span>
                <span className="typo-meta-data row center">{props.data.user && props.data.user.associated_school ? props.data.user.associated_school : "Summachar Pathshala"}</span>
            </div>

        </div>
    )

}
export default KidsCornerTile