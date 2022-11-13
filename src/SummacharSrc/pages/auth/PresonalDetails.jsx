import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { changeApartmentName, changeCityName, changeCountryName, changeLandmarkName, changePincode, changeStateName } from "../../actions/PersonalDetailsAction";
import CustomInput from "../../components/CustomInput";
import DropDown from "../../components/DropDown";
import Loader from '../../components/Loader'
import Logo from "../../components/Logo";
const PresonalDetails = (props) => {
    const history = useHistory()
    
    const [error,serError]= useState(false);
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
    
    return (<>

        <div className=' row center  df flex-1' style={{ overflowY: "scroll"}}>
            {/* <div className='fit-content hide-below-tablet' onClick={() => { props.onClosePopUp() }} style={{ position: "fixed", left: "0px", top: "0px" }}>

            </div> */}
            <div className='inner_signin_container small-full-height radius-primary' style={{ boxShadow: "none", paddingLeft: "0px", paddingRight: "0px", zIndex: 11 }}>
                <div className='inner_signin_container  small-full-height radius-primary' style={{ boxShadow: "none", border: "none", paddingTop: "0px", paddingBottom: "0px", overflowY: "scroll" }}>


                    {!props.loading && <>
                        <div className="df row center line-margin-small p-v-primary" style={{ marginTop: "0px" }}>
                            <Logo />
                        </div>
                        <div className='landing_section_sub_header font-bold line-margin-small' style={{ marginTop: "0px" ,color:"#000"}}>You are just one step away from gaining access to Pathshala Learning Experience</div>
                        <div className="df row column space-between" style={{ paddingBottom: "25px" }} >
                            <Grid container rowSpacing={0} columnSpacing={1}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>                                    
                                    <DropDown
                                        title="Country/Region *"
                                        value={props.formData.country}
                                        onClick={(selected_name) => {
                                            props.getCountryStateCityList("state", selected_name)
                                            props.dispatchForFormData(changeCountryName(selected_name))
                                        }}
                                        data={props.countrylist}
                                        index_name={"country_name"}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <CustomInput

                                        disabled={false}
                                        type='text'
                                        value={props.formData.apartment}
                                        // error= {props.signin.numbererr}
                                        name='Apartment, Street'
                                        title='Apartment, Street *'
                                        placeholder={"Enter your apartment, street"}
                                        onChange={e => {
                                            props.dispatchForFormData(changeApartmentName(e.target.value))
                                        }}
                                        onBlur={e => {
                                            // props.setLoginDetails({...props.loginDetails,emailErr:props.validate(e.target.value,{required:true,email:true},"Email").message})
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <CustomInput

                                        disabled={false}
                                        type='text'
                                        value={props.formData.landmark}
                                        // error= {props.signin.numbererr}
                                        name='Landmark (optional)'
                                        title='Landmark (optional)'
                                        placeholder={"Enter your landmark"}
                                        onChange={e => {
                                            props.dispatchForFormData(changeLandmarkName(e.target.value))
                                        }}
                                        onBlur={e => {
                                            // props.setLoginDetails({...props.loginDetails,emailErr:props.validate(e.target.value,{required:true,email:true},"Email").message})
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4} >
                                    
                                    <DropDown
                                        loaderEnabled={true}
                                        loading={props.stateloading}
                                        title="State *"
                                        value={props.formData.state}
                                        onClick={(selected_name) => {
                                            props.getCountryStateCityList("city", selected_name)
                                            props.dispatchForFormData(changeStateName(selected_name))
                                        }}
                                        data={props.stateList}
                                        index_name={"state_name"}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} >
                                    {/* <CustomInput

                                    disabled={false}
                                    type='text'
                                    value={props.formData.city}
                                    // error= {props.signin.numbererr}
                                    name='City'
                                    title='City'
                                    placeholder={"Enter city"}
                                    onChange={e => {
                                        props.dispatchForFormData(changeCityName(e.target.value))
                                    }}
                                    onBlur={e => {
                                        // props.setLoginDetails({...props.loginDetails,emailErr:props.validate(e.target.value,{required:true,email:true},"Email").message})
                                    }}
                                /> */}

                                    <DropDown
                                        title="City *"
                                        value={props.formData.city}
                                        onClick={(selected_name) => {
                                            props.dispatchForFormData(changeCityName(selected_name))
                                        }}
                                        data={props.cityList}
                                        loaderEnabled={true}
                                        loading={props.cityloading}
                                        index_name={"city_name"}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={4} >
                                    <CustomInput

                                        disabled={props.formData.pincode.length <=5 ? false :false}
                                        type='number'
                                        
                                        value={props.formData.pincode}
                                        // error = {props.formData.pincode.length !== 6  ? "please enter 6 digit" :"" }
                                        error={error && "Please enter 6 digit"}
                                        
                                        name='Pin Code'
                                        title='Pin Code *'
                                        placeholder={"-"}
                                        onChange={e => {
                                            if(e.target.value.length==7) return false;
                                            props.dispatchForFormData(changePincode(e.target.value))
                                            
                                            {e.target.value.length ===6 && serError(false) }
                                        }}
                                        onBlur={e => {
                                            // props.setLoginDetails({...props.loginDetails,emailErr:props.validate(e.target.value,{required:true,email:true},"Email").message})
                                        }}
                                        
                                    />
                                    
                                </Grid>
                            </Grid>
                            <button
                                onClick={
                                    props.formData.country != "" && props.formData.apartment != "" && props.formData.city != "" && props.formData.state != "" && props.formData.pincode != "" ?
                                        () => {(props.formData.pincode.length <=5 || props.formData.pincode.length >=7 ) ? serError(true) :props.submitForm()  } :
                                        () => { }
                                }
                                className={props.formData.country != "" && props.formData.apartment != "" && props.formData.city != "" && props.formData.state != "" && props.formData.pincode != ""  ? 
                                "btn btn-primary m-v-primary row radius-primary typo-btn-primary" : "btn register_disabled m-v-primary row radius-primary typo-btn-primary"} style={{ marginBottom: "0px" }}>
                                PROCEED TO PAY
                            </button>
                            <button onClick={() => { history.replace("/home") }} className="btn btn-secondary  row radius-primary typo-btn-primary" style={{ marginTop: "5px" }}>
                                I don't want premium access
                            </button>
                        </div>
                    </>
                    }
                    {
                        props.loading && <Loader />
                    }

                </div>
            </div>
        </div>

    </>);
}
export default PresonalDetails;