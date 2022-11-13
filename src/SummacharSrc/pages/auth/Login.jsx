import React, { useContext, useState } from "react";
import CustomInput from "../../components/CustomInput";
import logo from'../.././assets/images/common/summachar_blue_logo.svg'
import login_img from '../../assets/images/auth/login.svg';
import '../../assets/css/login.css'
const Login = (Props)=>{
    
    return(
        <>

            <div className="login_container">
            <div className="login_summachar_logo">
                <img src={logo} />
            </div>

            <div className="login_div">
                <div className="login_left_col">
                    <img src={login_img} alt=""/>
                        </div>
                    <div className="login_right_col">
                        <div className="login_right_input_fields">
             <CustomInput 
                type="email"
                value={Props.loginDetails.email}
                error= {Props.loginDetails.emailErr}
                name="email"
                title="Email Address"                
                onChange={
                    (e)=>{
                        Props.setLoginDetails({...Props.loginDetails,email:e.target.value,emailErr:Props.validate(e.target.value,{required:true},"Email").message})
                    }
                }
                onBlur={
                    (e)=>{
                        Props.setLoginDetails({...Props.loginDetails,emailErr:Props.validate(e.target.value,{required:true,email:true},"Email").message})
                    }
                }
                    
            />
            
            <CustomInput 
                type="password" 
                value={Props.loginDetails.password}
                error= {Props.loginDetails.passwordErr}
                name="password"
                title="Password"                
                // onChange={(e)=>{Props.setLoginDetails({...Props.loginDetails,password:e.target.value})}} 
                onChange={
                    (e)=>{
                        Props.setLoginDetails({...Props.loginDetails,password:e.target.value,passwordErr:Props.validate(e.target.value,{required:true},"Password").message})
                    }
                }
                onBlur={
                    (e)=>{
                        Props.setLoginDetails({...Props.loginDetails,password:e.target.value,passwordErr:Props.validate(e.target.value,{required:true},"Password").message})
                    }
                }
                    
                            />
                            <div className="login_forgot_link">
                                <a  href="/forgotPassword">Forgot Password</a>
                            </div>
                            </div>

            <div className="login_bottom_btn_div">
                <button className="btn-primary login_btn" onClick={Props.login}>Login</button>
                <div className="go_to_signup_link">Don't Have an Account?  <a href="/signin"> Signup</a></div>
            </div>
                </div>
            </div>
            </div>
            
        </>
    );
}
export default Login;