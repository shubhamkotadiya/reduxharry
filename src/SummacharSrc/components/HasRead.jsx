import { useState } from "react";
import ReadTickAnimation from "./icons/ReadTickAnimation";
import ReadTickFilled from "./icons/ReadTickFilled";
import ReadTickUnFilled from "./icons/ReadTickUnFilled";

const HasRead = (props) => {

    const [initial, setInitial] = useState(props.hasRead)
    if (props.hasRead) {
        return (
            <>
                {
                    initial ?

                        <ReadTickFilled onClick={props.onClick ? () => { props.onClick() } : () => { }} />
                        // <div className="readTickAnimation">
                        //     <ReadTickAnimation onClick={props.onClick ? () => { props.onClick() } : () => { }} />
                        // </div>
                        : <div className="readTickAnimation">
                            <ReadTickAnimation onClick={props.onClick ? () => { props.onClick() } : () => { }} />
                        </div>
                }
            </>
            
        );
    } else {
        return (
            <ReadTickUnFilled onClick={props.onClick ? () => { props.onClick() } : () => { }} />
        );
    }

}
export default HasRead