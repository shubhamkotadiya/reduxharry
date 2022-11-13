import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Select from 'react-select';
import { toast } from 'react-toastify';

const Share = () => {
    const [selected, setSelected] = useState(null);
    const [options, setOptions] = useState([]);
    const navigate = useNavigate();
    var location = useLocation();
    var recIndex = location.search.split('=')[1];

    useEffect(() => {
        let fetch = JSON.parse(localStorage.getItem('signupTbl'));
        let tempArr = [];
        fetch.map((item) => {
            if (JSON.parse(localStorage.getItem('loginUser'))._id !== item._id) {
                tempArr.push({ uid: item._id, value: item.email, label: item.name })
            }
        })
        setOptions(tempArr)
    }, [localStorage.getItem('signupTbl')])

    const onHandleChange = (selectedOption) => {
        setSelected({ ...selected, selectedOption })
    }

    const onShare = () => {
        if (selected.selectedOption.length) {
            let tempArr = []
            selected.selectedOption.map((item) => {
                tempArr.push(item.uid)
            });

            let fetch = JSON.parse(localStorage.getItem('notesTbl'));
            fetch.map((item) => {
                if (item._id === Number(recIndex)) {
                    Object.assign(item, { shareId: tempArr })
                }
            })

            localStorage.setItem('notesTbl', JSON.stringify(fetch));
            navigate('/todo');

        } else {
            toast.error("Please select user !", { position: toast.POSITION.TOP_RIGHT });
        }
    }

    return (
        <div className="login_form_wrapper">
            <div className="container">
                <div className="row">
                    <div className='col-md-2'></div>
                    <div className="col-md-8 col-md-offset-2">
                        <div className="login_wrapper">
                            <h2>Share Note</h2>
                            <div className="formsix-pos row login_btn_wrapper">
                                <div className="col-md-10 form-group i-email">
                                    {/* <input type="text" name='search' value={sendReq.search} onChange={(e) => onHandleChange(e)} className="form-control" placeholder="Search Here *" /> */}
                                    <Select
                                        defaultValue={selected}
                                        onChange={onHandleChange}
                                        options={options}
                                        isMulti={true}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <button type='button' className="btn btn-primary new-btn" onClick={() => onShare()}> Share </button>
                                </div>
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

export default Share