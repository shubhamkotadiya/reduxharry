import React , {useEffect,useContext, useState} from 'react'
import '../assets/css/schoolNamePopup.css'
import { Store } from '../App';
import apiUrl from '../common/apiUrl';
import axios from "axios";
import { isFreeTrial, getHeaders, resetToken, getUserUuid } from '../common/helper'
import { Box, Modal } from '@mui/material';
function SchoolNamePopup(props) {
    let userData = useContext(Store).user.data;
    const [user, setUser] = useState(userData);
    const [visible,setVisible] = useState(true);
    let [school, changeSchool] = useState(user.associated_school == null ? "-" : user.associated_school);
    const [pathshalaDrop, openPathshala] = useState(false);
    let [pathshalaList, changePathshala] = useState([]);
    let partners = [];
    let getPartnerList = async () => {
        await axios({
            url: apiUrl.partnerListUrl + "?user-uuid=" + getUserUuid(),
            method: "get",
            headers: getHeaders(),
        }).then((res) => {
            for (let i = 0; i < res.data.length; i++) partners.push(res.data[i].school_name);
        });
        changePathshala(partners);
    }
    const changeVal = (which, val) => {
        if (which == "pathshala") {
            document.getElementById("associated_school").value = val;
            setDeatils("associated_school", val);
            openPathshala(false);
        } 
    };

    let setDeatils = async (which, value) => {
        // {
            // isChanged(true);

            if (which == "associated_school") {
                changeSchool(value);
            } 
        // }
    };

    useEffect(()=>{getPartnerList();},[])

    const setUserDeatils = async ()=>{
        let success = true;
        let newData = {};
        if (school != user.associated_school && school != "-") {
            newData.associated_school = school;
        }
        if (Object.keys(newData).length != 0) {
            await axios({
                url: apiUrl.profileUrl + "?user-uuid=" + getUserUuid(),
                method: "PATCH",
                headers: getHeaders(),
                data: newData,
            })
                .then((res) => {
                    
                    
                    userData = res.data;
                    setUser(res.data);
                    // useCont.user.setUserData(res.data);
                    // console.log(useCont.user)
                    console.log(res.data);
                    // i = 0;
                })
                .catch(async (error) => {
                    // if (error && error.response) {
                    //     if (error.response.status == 401 && i < 3) {
                    //         await resetToken();
                    //         await setUserDeatils();

                    //         i++;
                    //     } else if (error.response.status == 400) {
                    //         toast.error("Username already taken");
                    //         cancel();
                    //     } else {
                    //         toast.error("Something went wrong!");
                    //         cancel();
                    //     }
                    // }
                    console.log("something went wrong");
                });
    }

}

    setInterval(() => {
        setVisible(true);
    }, 300000);
    
  return (
    <>
       <>
     { props.children}
     <Modal
      open={visible && user.associated_school == null}
    // open={true}

    //   onClose={() => {
    //     if (Props.changeVisibility) {
    //       Props.changeVisibility(false)
    //     } else if (Props.onClosePopUp) {
    //       Props.onClosePopUp()
    //     }
    //   }}
      classes={'df center z-i'}
      
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
          <div className='fit-content  row center df bg-blue z-i'  style={{ position: "fixed", top: "0px", left: "0px", zIndex:"100000000000000000000" }} >
          <div
          className=' fit-content z-i'
          style={{ position: "absolute", top: "0px", left: "0px" }}
        //   onClick={() => {
        //     setVisible(false);
        //   }}
        ></div>
        <div className='p-relative radius-primary df row innerPopUp pop-up-animation'>
        <p className='txt-medium txt-secondary m-b-20 '>Please select your school name from the list and help us create buzz!</p>
        <div className="form-field relative w-100 m-b-20 "  >
                            <div className="title">
                                <label className='txt-medium txt-gray lable-position'>Pathshala</label>
                            </div>
                            <svg
                                onClick={(event) => {
                                    openPathshala(true);
                                }}
                                className="profile-dow-ar-2 bg-gray "
                                width="20"
                                height="20"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M22.6664 12.2267C22.4166 11.9783 22.0787 11.839 21.7264 11.839C21.3742 11.839 21.0363 11.9783 20.7864 12.2267L15.9998 16.9467L11.2798 12.2267C11.03 11.9783 10.692 11.839 10.3398 11.839C9.98752 11.839 9.64959 11.9783 9.39977 12.2267C9.2748 12.3506 9.1756 12.4981 9.10791 12.6606C9.04022 12.8231 9.00537 12.9973 9.00537 13.1733C9.00537 13.3494 9.04022 13.5236 9.10791 13.6861C9.1756 13.8486 9.2748 13.9961 9.39977 14.12L15.0531 19.7733C15.1771 19.8983 15.3245 19.9975 15.487 20.0652C15.6495 20.1329 15.8238 20.1677 15.9998 20.1677C16.1758 20.1677 16.3501 20.1329 16.5125 20.0652C16.675 19.9975 16.8225 19.8983 16.9464 19.7733L22.6664 14.12C22.7914 13.9961 22.8906 13.8486 22.9583 13.6861C23.026 13.5236 23.0608 13.3494 23.0608 13.1733C23.0608 12.9973 23.026 12.8231 22.9583 12.6606C22.8906 12.4981 22.7914 12.3506 22.6664 12.2267Z"
                                    fill={ "#777777"}
                                />
                            </svg>
                            <div className="pointer bg-gray border radius-primary h-52" onClick={(event) => {
                                openPathshala(true);
                            }}>


                                <input
                                    autocomplete="off"

                                    className="pointer w-100 txt-medium txt-gray h-100"
                                    disabled={true}
                                    name="associated_school"
                                    id="associated_school"
                                    type="text"
                                    value={school == "-" ? "" :school}
                                    
                                    onChange={(event) => {                                        
                                        // setisForPathShala(false)
                                        // props.saveUserDeatils("associated_school", event);
                                        console.log(event.target.value);
                                    }}
                                    placeholder="-"
                                    // style={isForPathShala ? { borderBottom: "1px solid red", color: "red" } : {}}
                                />
                            </div>
                            {pathshalaDrop == true && (
                                <div
                                    className="profile-drop-2"
                                    onMouseLeave={() => {
                                        openPathshala(false);
                                    }}
                                >

                                    {pathshalaList
                                        // .filter((item) => {
                                        //   if (props.school != "") {
                                        //     return item.toLowerCase().includes(props.school.toLowerCase());
                                        //} else {
                                        //  return 1
                                        // }
                                        //item.toLowerCase().indexOf(props.school == "-" ? "" : "") !== -1;
                                        //})
                                        .map(function (name, index) {
                                            return (
                                                <div
                                                    className="profile-drop-list"
                                                    style={{ cursor: "pointer" }}
                                                    value={name}
                                                    key={index}
                                                    onClick={(event) => {
                                                        // setisForPathShala(false)
                                                        
                                                        changeVal("pathshala", name);
                                                       
                                                    }}
                                                >
                                                    {name}
                                                </div>
                                            );
                                        })}
                                </div>
                            )}
                        </div>
          <div className='button-container '>
              <button className='txt-medium btn-1 btn-secondary radius-primary ' onClick={()=>{setVisible(false);}} >Skip</button>
              <button className='txt-medium btn-2 btn-secondary radius-primary ' onClick={()=>{setUserDeatils();}}>Save</button>
          </div>

        </div>
          </div>
          </Modal>
          </>
          
    </>
  )
}

export default SchoolNamePopup;
