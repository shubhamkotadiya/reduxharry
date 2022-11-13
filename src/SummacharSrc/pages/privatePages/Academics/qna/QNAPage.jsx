
import { useRef } from 'react';
import NoData from '../../../../components/NoData';
import LaoderSmall from "../../../../assets/images/common/loader_small.gif";
import QNAComponent from './QNAComponent';
const QNAPage = (props) => {
    const ref = useRef(null)
    return (
        <>
            <div className="wrapper_container news_container enter_animation acad_info" ref={ref} id="acadInfo_container" style={{ height: "100%", padding: "0px", paddingTop: "20px" }} onScroll={() => { props.onScroll(ref) }}>

                <div className='common-grid-outer'>
                    <div className="centered_outer_container">

                        <div className="outer-main-container concepts-outer">
                            <div className="inner-main-container concepts-inner" style={{ marginBottom: "10px", maxWidth: "100%", width: "100%" }}>
                                <div className="chapters-list-grid column" style={{ display: "flex", gridGap: "0px" }}>
                                    {props.data && props.data.length > 0 ?
                                        props.data.map((data, index) => {
                                            return <QNAComponent data={data} key={index} />
                                        })
                                        :
                                        <NoData />}
                                    {props.scrollLoading && (
                                        <div className="df row center loader-box">
                                            <img src={LaoderSmall} style={{ width: "40px" }} alt="" />
                                        </div>
                                    )}

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default QNAPage;