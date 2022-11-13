import { Grid } from "@mui/material"
import { useEffect, useState } from "react"
import Logo from "../../components/Logo"

const BillinPage = (props) => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    const onResize = () => {
        let height = window.innerHeight
        let width = window.innerWidth

        setWindowSize({ width: width, height: height })
    }
    useEffect(() => {
        onResize()
        window.addEventListener('resize', onResize)
        return () => {
            return window.removeEventListener('resize', onResize)
        }
    }, [])
    return <>
        <div className=' row center df flex-1' style={{ overflowY: "scroll"}}>
            {/* <div className='fit-content' onClick={() => { props.onClosePopUp() }} style={{ position: "fixed", left: "0px", top: "0px" }}>

            </div> */}
            <div className='innerPopUp billing-page radius-primary pop-up-animation border-primary' style={{ boxShadow: "none", zIndex: 11, height: "auto" }}>

                <>
                    <div className="df row center line-margin-small" style={{ marginTop: "0px" }}>
                        <Logo />
                    </div>
                    <span className='landing_section_sub_header font-bold line-margin-small' >Billing Details</span>

                    <div className="df row">
                        <Grid container rowSpacing={2}>
                            <Grid item xs={12} >
                                <Grid container columnSpacing={1}>
                                    <Grid item xs={5} ><span className="font-bold typo-sub-headings df row">Plan :</span></Grid>
                                    <Grid item xs={7} ><span className=" typo-sub-headings df row">{props.plan.subPlan !== "" ? "XI " + props.plan.subPlan : props.plan.plan}</span></Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} >
                                <Grid container columnSpacing={1}>
                                    <Grid item xs={5} ><span className="font-bold typo-sub-headings df row">Amout :</span></Grid>
                                    <Grid item xs={7} ><span className=" typo-sub-headings df row">&#x20b9; {props.plan.amount}</span></Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} >
                                <Grid container columnSpacing={1}>
                                    <Grid item xs={5} ><span className="font-bold typo-sub-headings df row">Discount :</span></Grid>
                                    <Grid item xs={7} ><span className=" typo-sub-headings df row">&#x20b9; {props.refralCode.discountAmount !== "" ? props.refralCode.discountAmount : ' 0'}</span></Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} >
                                <hr />
                            </Grid>

                            <Grid item xs={12} >
                                <Grid container columnSpacing={1}>
                                    <Grid item xs={5} ><span className="font-bold typo-sub-headings df row">Amount To pay :</span></Grid>
                                    <Grid item xs={7} ><span className=" typo-sub-headings df row">&#x20b9; {props.refralCode.discountAmount !== "" ? (props.plan.amount - props.refralCode.discountAmount) : props.plan.amount}</span></Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="df row">
                        <button className="typo-btn-primary row btn-primary radius-primary m-v-primary" style={{ marginBottom: "0px" }} onClick={props.onSubmit} >
                            PROCEED TO PAY
                        </button>
                    </div>
                </>
            </div>
        </div>
    </>
}
export default BillinPage