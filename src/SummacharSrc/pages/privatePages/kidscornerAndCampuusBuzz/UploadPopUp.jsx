import { CircularProgress } from "@mui/material";
import { useHistory } from "react-router-dom";
import CustomInput from "../../../components/CustomInput";
import DropDown from "../../../components/DropDown";

const UploadPopUp = (props) => {
    const history = useHistory()
    return (
        <>
            <div className='pop_up_container row center df bg-primary' style={{ position: "fixed" }}>
                <div className='fit-content grayArea' onClick={() => { history.replace("/kids-corner") }} style={{ position: "fixed", left: "0px", top: "0px" }}>

                </div>
                <div className='p-relative radius-primary df row inner_signin_container pop-up-animation' style={{ minHeight: "0px", height: "auto", width: "95%" }}>

                    <div className="df row column">
                        <CustomInput

                            disabled={false}
                            type='text'
                            value={props.name}
                            // error= {props.signin.numbererr}
                            name='Title'
                            title='Title'
                            placeholder={"Enter Title"}
                            onChange={e => {
                                if (e.target.value.length <= 100) {
                                    props.setName(e.target.value)
                                }

                            }}
                            onBlur={e => {
                                // props.setLoginDetails({...props.loginDetails,emailErr:props.validate(e.target.value,{required:true,email:true},"Email").message})
                            }}
                        />
                        <div className="df row txt-primary typo-menu-secondary" style={{ justifyContent: "flex-end" }}> {props.name.length}/100</div>
                    </div>

                    <div className="df row">
                        {/* <CustomInput

                            disabled={false}
                            type='text'
                            value={props.name}
                            // error= {props.signin.numbererr}
                            name='Title'
                            title='Title'
                            placeholder={"Enter Title"}
                            onChange={e => {
                                props.setName(e.target.value)
                            }}
                            onBlur={e => {
                                // props.setLoginDetails({...props.loginDetails,emailErr:props.validate(e.target.value,{required:true,email:true},"Email").message})
                            }}
                        /> */}
                        <DropDown
                            title="Type"
                            value={props.type}
                            onClick={(type) => {
                                props.setType(type)
                            }}
                            placeholder={"Select Type"}
                            data={[
                                { type: "Essay" },
                                { type: "Drawing" },
                                { type: "Story" },
                                { type: "Poem" }
                            ]}
                            index_name={"type"}
                        />
                    </div>

                    <div className="df row">
                        <CustomInput

                            disabled={false}
                            type='textarea'
                            value={props.description}
                            // error= {props.signin.numbererr}
                            name='Description'
                            title='Description'
                            placeholder={"Enter Description"}
                            onChange={e => {
                                props.setDescription(e.target.value)
                            }}
                            onBlur={e => {
                                // props.setLoginDetails({...props.loginDetails,emailErr:props.validate(e.target.value,{required:true,email:true},"Email").message})
                            }}
                        />
                    </div>
                    <div className="df center column m-v-primary" >
                        <button className="golden-btn p-relative" style={{ marginBottom: "0px" }}>
                            Upload File
                            <input type="file" 
                                accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
                             className="fit-content pointer"
                                onChange={(e) => { props.setFile(e.target.files[0], e.target.files[0].name) }}
                                style={{ position: "absolute", top: "0px", left: "0px", opacity: 0, zIndex: 1 }} />
                        </button>
                        {props.fileName !== "" && <p className="typo-description p-primary" style={{ color: "#000" }}>{props.fileName}</p>}
                    </div>

                    <button
                        onClick={props.name !== "" && props.file !== "" && props.fileName !== ""  && !props.loading && props.description!="" ? () => {
                            props.uplaod()
                        } : () => { }}
                        style={{ height: "50px" }}
                        className={props.name !== "" && props.file !== "" && props.fileName !== ""  && !props.loading && props.description!="" ? "btn btn-primary  row radius-primary typo-btn-primary" : "btn  register_disabled row radius-primary typo-btn-primary"}>
                        {!props.loading ? 'Submit' : <div >
                            <CircularProgress size={"20"} />
                        </div>}


                    </button>
                </div>
            </div>
        </>
    )
}
export default UploadPopUp;