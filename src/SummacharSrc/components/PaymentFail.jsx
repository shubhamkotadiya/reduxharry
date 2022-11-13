import { useHistory } from "react-router-dom"
import failImg from '../assets/images/payment_fail.gif'
import { isApp, openLink } from "../common/helper"
const PaymentFail = () => {
    const history = useHistory()
    return (
        <>
            <div className="fit-content scrollable" >

                <div className="df row">
                    <div className="landing_page_container df row center m-v-primary">
                        <div className="contact_us_form border-primary radius-primary p-primary">
                            <h1 className="landing_section_header" style={{ color: "orange" }}>Payment Failed</h1>
                            <img src={failImg} alt="" className="row m-v-primary" style={{ height: "auto", width: "30%" }} />
                            <p className="landing_section_sub_header  m-v-primary">For any query you can contact us at
                                {isApp() ? <a onClick={() => { openLink() }} className="txt-primary">+91&nbsp;98806&nbsp;78169</a> : <a href={"tel:+919880678169"} target={"_blank"} className="txt-primary">+91&nbsp;98806&nbsp;78169</a>}
                                or {isApp() ? <a onClick={() => { openLink("mail") }} className="txt-primary">namaskar@summachar.in</a> : <a href={"mailto:namaskar@summachar.in"} target={"_blank"} className="txt-primary">namaskar@summachar.in</a>}
                            </p>
                            <button className="btn-primary df btn row center login_btn" onClick={() => { history.push("/home") }}>Try Later</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PaymentFail