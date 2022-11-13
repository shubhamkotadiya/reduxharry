import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';

const Note = () => {
    const validator = useRef(new SimpleReactValidator());
    const [sendReq, setSendReq] = useState({ uid: JSON.parse(localStorage.getItem('loginUser'))._id, title: '', description: '', shareId: [] });
    const [, forceUpdate] = useState();
    const navigate = useNavigate();

    var location = useLocation();
    var recIndex = location.search.split('=')[1];

    useEffect(() => {
        if (location.search.length && recIndex) {
            let fetch = JSON.parse(localStorage.getItem('notesTbl'))
            let getData = fetch.filter(_ => _._id == recIndex)[0]
            setSendReq({
                ...getData
            })
        }
    }, [location])

    const onHandleChange = (e) => {
        const { name, value } = e.target;
        setSendReq({
            ...sendReq,
            [name]: value
        })
    }

    const onSubmit = () => {
        if (validator.current.allValid()) {
            if (localStorage.getItem('notesTbl')) {
                let fetch = JSON.parse(localStorage.getItem('notesTbl'));
                if (recIndex) {
                    const newitem = fetch.map((item) => { return item._id == recIndex ? sendReq : item });
                    localStorage.setItem('notesTbl', JSON.stringify(newitem));
                    toast.success("Notes updated Successfully !", { position: toast.POSITION.TOP_RIGHT });
                    navigate('/todo');
                } else {
                    sendReq._id = fetch.length ? fetch[fetch.length - 1]._id + 1 : 1;
                    fetch.push(sendReq);
                    localStorage.setItem('notesTbl', JSON.stringify(fetch));
                    toast.success("Notes added Successfully !", { position: toast.POSITION.TOP_RIGHT });
                    navigate('/todo');
                }
            } else {
                let tempArr = [];
                sendReq._id = 1;
                tempArr.push(sendReq);
                localStorage.setItem('notesTbl', JSON.stringify(tempArr));
                toast.success("Notes added Successfully !", { position: toast.POSITION.TOP_RIGHT });
                navigate('/todo');
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
                            <h2>{recIndex ? "Edit" : "Add"} Note</h2>
                            <div className="formsix-pos">
                                <div className="form-group i-email">
                                    <input type="text" name='title' value={sendReq.title} onChange={(e) => onHandleChange(e)} className="form-control" placeholder="Enter title" />
                                    <span className="validMsg">{validator.current.message("title", sendReq.title, "required")}</span>
                                </div>
                            </div>
                            <div className="formsix-e">
                                <div className="form-group i-password">
                                    <textarea type="text" name='description' value={sendReq.description} onChange={(e) => onHandleChange(e)} className="form-control" placeholder="Enter description" ></textarea>
                                    <span className="validMsg">{validator.current.message("description", sendReq.description, "required")}</span>
                                </div>
                            </div>
                            <div className="login_btn_wrapper">
                                <button type='button' className="btn btn-primary new-btn" onClick={() => onSubmit()}> {recIndex ? "Edit" : "Add"} </button>
                            </div>
                            <div className="login_message">
                                <p>Back to <Link to={"/todo"}>Todo list</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-2'></div>
                </div>
            </div>
        </div>
    )
}

export default Note;