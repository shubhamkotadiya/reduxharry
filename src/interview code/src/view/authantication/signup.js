import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';

export const Signup = () => {
    const validator = useRef(new SimpleReactValidator());
    const [sendReq, setSendReq] = useState({ name: '', email: '', password: '', conPassword: '' });
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
                let check = fetch.some(_ => _.email === sendReq.email);
                if (check) {
                    toast.error("This email alreay exist !", { position: toast.POSITION.TOP_RIGHT });
                } else {
                    sendReq._id = fetch.length ? fetch[fetch.length - 1]._id + 1 : 1;
                    fetch.push(sendReq);
                    localStorage.setItem('signupTbl', JSON.stringify(fetch));
                    toast.success("Register Successfully !", { position: toast.POSITION.TOP_RIGHT });
                    navigate('/');
                }
            } else {
                let tempArr = [];
                sendReq._id = 1;
                tempArr.push(sendReq);
                localStorage.setItem('signupTbl', JSON.stringify(tempArr));
                toast.success("Register Successfully !", { position: toast.POSITION.TOP_RIGHT });
                navigate('/');
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
                            <h2>Signup</h2>
                            <div className="formsix-pos">
                                <div className="form-group i-email">
                                    <input type="text" name='name' value={sendReq.name} onChange={(e) => onHandleChange(e)} className="form-control" placeholder="Name *" />
                                    <span className="validMsg">{validator.current.message("name", sendReq.name, "required")}</span>
                                </div>
                            </div>
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
                            <div className="formsix-e">
                                <div className="form-group i-password">
                                    <input type="password" name='conPassword' value={sendReq.conPassword} onChange={(e) => onHandleChange(e)} className="form-control" placeholder="Confirm Password *" />
                                    <span className="validMsg">{validator.current.message("confirm password", sendReq.conPassword, "required")}</span>
                                </div>
                            </div>
                            <div className="login_btn_wrapper">
                                <button type='button' className="btn btn-primary new-btn" onClick={() => onSubmit()}> Signup </button>
                            </div>
                            <div className="login_message">
                                <p>Back to <Link to={"/"}>Login</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-2'></div>
                </div>
            </div>
        </div>
    )
}
