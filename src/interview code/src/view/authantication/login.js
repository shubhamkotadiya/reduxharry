import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';

export const Login = () => {

    const validator = useRef(new SimpleReactValidator());
    const [sendReq, setSendReq] = useState({ email: '', password: '' });
    const [, forceUpdate] = useState();
    const navigate = useNavigate();

    const onHandleChange = (e) => {
        const { name, value } = e.target;
        setSendReq({
            ...sendReq,
            [name]: value
        })
    }

    const onSubmit = () => {
        if (validator.current.allValid()) {
            if (localStorage.getItem('signupTbl')) {
                let fetch = JSON.parse(localStorage.getItem('signupTbl'));
                let check = fetch.filter(_ => _.email === sendReq.email && _.password === sendReq.password);
                if (check.length) {
                    localStorage.setItem('loginUser', JSON.stringify(check[0]));
                    toast.success("Login Successfully !", { position: toast.POSITION.TOP_RIGHT });
                    navigate('/todo');
                } else {
                    toast.error("This email and password not exist !", { position: toast.POSITION.TOP_RIGHT });
                }
            } else {
                toast.error("This email not exist, Please register your account !", { position: toast.POSITION.TOP_RIGHT });
            }
        } else {
            validator.current.showMessages(true);
            forceUpdate(1);
        }
    }

    return (
        <div className="login_form_wrapper">
            <div className="container">
                <div className="row">
                    <div className='col-md-2'></div>
                    <div className="col-md-8 col-md-offset-2">
                        <div className="login_wrapper">
                            <h2>Login</h2>
                            <div className="formsix-pos">
                                <div className="form-group i-email">
                                    <input type="email" name='email' value={sendReq.email} onChange={(e) => onHandleChange(e)} className="form-control" placeholder="Email Address *" />
                                    <span className="validMsg">{validator.current.message("email", sendReq.email, "required|email")}</span>
                                </div>
                            </div>
                            <div className="formsix-e">
                                <div className="form-group i-password">
                                    <input type="password" name='password' value={sendReq.password} onChange={(e) => onHandleChange(e)} className="form-control" placeholder="Password *" />
                                    <span className="validMsg">{validator.current.message("password", sendReq.password, "required")}</span>
                                </div>
                            </div>
                            <div className="login_btn_wrapper">
                                <button type='button' className="btn btn-primary new-btn" onClick={() => onSubmit()}> Login </button>
                            </div>
                            <div className="login_message">
                                <p>Don&rsquo;t have an account ? <Link to={"/signup"}>Signup</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-2'></div>
                </div>
            </div>
        </div>
    )
}
