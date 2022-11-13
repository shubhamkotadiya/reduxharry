import { CircularProgress, Grid } from "@mui/material"
import CustomInput from "../../components/CustomInput"
import smallLoader from "../../assets/images/common/loader_small.gif";
import Logo from "../../components/Logo"
import { useEffect, useState } from "react";

const RefralCode = (props) => {
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
    return (
        <>
            {/* <div className='pop_up_container row center df' style={{ overflowY: "scroll", height: windowSize.height + "px" }}> */}
            <div className="fit-content df center" style={{overflowY:"scroll"}}>

           
                {/* <div className='fit-content hide-below-tablet' onClick={() => { props.onClosePopUp() }} style={{ position: "fixed", left: "0px", top: "0px" }}>

                </div> */}
                <div className='innerPopUp quiz_popUp radius-primary pop-up-animation border-primary' style={{ boxShadow: "none", zIndex: 11, height: "auto" }}>

                    <>
                        <div className="df row center line-margin-small" style={{ marginTop: "0px" }}>
                            <Logo />
                        </div>
                        {/* {!props.hasreferralCode && <>
                            <div className='landing_section_sub_header font-bold line-margin-small' >Do you have Referral Code?</div>
                            <div className="df row ">
                                <Grid container columnSpacing={2}>
                                    <Grid item xs={6} >
                                        <button className="typo-btn-primary row btn-primary radius-primary m-v-primary" style={{ marginBottom: "0px" }} onClick={props.onSayNo} >
                                            No
                                        </button>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <button className="typo-btn-primary row btn-primary radius-primary m-v-primary" style={{ marginBottom: "0px" }} onClick={() => { props.setHasReferralCode(true) }} >
                                            Yes
                                        </button>
                                    </Grid>
                                </Grid>


                            </div>
                        </>} */}
                        <div className='typo-headings font-bold line-margin-small' style={{color:'#000'}} >Do you have Referral Code?</div>

                        <>

                            <div className="m-v-primary df row column" style={{ marginTop: "0px" }}>
                                <CustomInput

                                    disabled={props.loading}
                                    type='text'
                                    className="row"
                                    value={props.refralCode.code}
                                    // error= {props.signin.numbererr}
                                    name='Referral code'
                                    title='Referral code'
                                    placeholder={"Enter your referral code"}
                                    onChange={e => {
                                        props.setRefralCode(e.target.value)
                                        if (props.error !== "") {
                                            props.setError("")
                                        }
                                    }}
                                    onBlur={e => {
                                        // props.setLoginDetails({...props.loginDetails,emailErr:props.validate(e.target.value,{required:true,email:true},"Email").message})
                                    }}
                                />
                                {<p className="txt-danger df row typo-description">{props.error !== "" ? props.error : ""}&nbsp;</p>}
                                <div className="df row center">
                                    
                                </div>
                            </div>
                            {/* <Grid container columnSpacing={2}> */}
                            <h1 className="row df space-between">


                                <button className="btn-secondary df flex-1 center txt-medium" style={{ marginLeft: "0px", marginBottom: "0px" }} onClick={props.onSayNo} >
                                    Skip
                                </button>

                                <button disabled={props.loading || props.refralCode.code === ""} className={!props.loading && props.refralCode.code !== "" ? "btn-primary txt-medium df flex-1 center" : " register_disabled txt-medium df flex-1 center"} style={{ marginRight: "0px", marginBottom: "0px" }} onClick={() => { props.applyCode() }} >
                                    {!props.loading &&'Apply'}
                                    {props.loading && <CircularProgress size={15} style={{color:"white"}}  />}
                                </button>
                            </h1>
                            {/* </Grid> */}


                        </>

                    </>

                    {

                    }
                </div>
            </div>
            
        </>
    )
}
export default RefralCode