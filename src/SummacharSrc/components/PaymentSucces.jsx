import { useHistory } from "react-router-dom"
import SuccessImg from '../assets/images/payment_success.gif'
const PaymentSucces = () => {
    const history = useHistory()
    return (
        <>

            {/* <Header> */}
                <div className="fit-content scrollable" >

                    <div className="df row">
                        <div className="landing_page_container df row center m-v-primary">
                            <div className="contact_us_form border-primary radius-primary p-primary">
                                <h1 className="landing_section_header txt-primary">Payment Successful</h1>
                                <img src={SuccessImg} alt="" className="row" style={{width:"80%", height: "auto" }} />
                                <p className=" m-v-primary landing_section_sub_header">
                                Congratulations!<br /> You are now a premium user.
                                </p>
                                <button className="btn-primary df btn row center login_btn" onClick={() => { history.push("/home") }}>Continue</button>
                            </div>
                        </div>
                    </div>                    
                </div>
            {/* </Header> */}
        </>
    )
}
export default PaymentSucces