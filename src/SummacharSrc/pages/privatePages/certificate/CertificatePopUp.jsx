import { useEffect } from "react";
import ShareButton from "../../../components/ShareButton";


const CertificatePopUp = (props) => {

    const data = props.data
    useEffect(async () => {
        return () => {
            props.onClosePopUp()
        }
    }, []);

    const onPopState = () => {
        props.onClosePopUp()
    }
    useEffect(() => {
        window.addEventListener('popstate', onPopState)
        return () => {
            return window.removeEventListener('popstate', onPopState)
        }
    }, [])

    return (
        <>
            <div className="fit-content df flex-1 p-h-primary">
                <div className="df flex-1 p-h-primary column">
                    <div className="row df " style={{ justifyContent: "flex-end" }}>                
                        <ShareButton url={data.certificate} />
                    </div>

                    <div className="df flex-1 border-primary center p-relative" style={{ overflow: "hidden" }}>
                        <img src={data.certificate} className="df fit-absolute" style={{ left:"50%",height: "100%",transform:"translateX(-50%)", maxWidth: "100%", objectFit: "contain" }} alt="" />
                    </div>
                </div>

            </div>
        </>
    )
}
export default CertificatePopUp