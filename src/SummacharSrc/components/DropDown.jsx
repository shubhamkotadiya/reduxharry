import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import Small_loader from '../assets/images/common/loader_small.gif'

const DropDown = (props) => {
    const [dropdownVisiblity, setdropdownvisblity] = useState(false)
    const ref = useRef();
    const [dropDownData, setData] = useState(props.data ? props.data : [])
    const [dropDownPosition, setPosition] = useState("bottom")
    const searchValue = (search_str) => {
        if (search_str === "") {
            setData(props.data ? props.data : [])
        } else {

            if (props.data && props.data.length > 0) {
                const temp = [];
                // setData(temp)

                for (let i = 0; i < props.data.length; i++) {
                    const val = props.data[i];
                    if (val[props.index_name].toLowerCase().includes(search_str.toLowerCase())) {
                        temp.push(val)
                    }
                }                
                setData(temp)
                // for(i==0;i<dropDownData.length;i++){}
            }
        }
    }
    useEffect(() => {
        setData(props.data)


    }, [props.data])
    useEffect(() => {
        if (ref) {
            if (ref.current.offsetTop + 300 > window.innerHeight) {
                setPosition("up")
            }
        }
    }, [ref])
    return (<>
        {dropdownVisiblity && <div className="fit-content" style={{position:"absolute",top:"0px",left:"0px", zIndex:"999999999999999999999999999999999999999",backgroundColor:"transparent" }} onClick={() => { setdropdownvisblity(!dropdownVisiblity) }} ></div>}
        <div class="form_field row dropdown" ref={ref} style={{ border: "1px solid rgb(92, 86, 212);" }} >
            <div className="row df"  >
                <label for="" class="txt-medium txt-gray" style={{ color: " rgb(92, 86, 212);" }}>{props.title ? props.title : ""}</label>
                <div class="df row-center fit-content" style={{ flexDirection: 'row', cursor: 'pointer', position: 'unset' }} onClick={() => { setdropdownvisblity(!dropdownVisiblity) }}>
                    <div class="innerdf df row-center fit-content" style={{ flexDirection: 'row', cursor: 'pointer', position: 'absolute', top: '0px', width: '100%' }}></div>
                    <input type="text" disabled="" placeholder={props.placeholder?props.placeholder:"Select Name"} class="df row-center radius-primary txt-medium fit-content flex-1" value={props.value} style={{ cursor: 'pointer' }} />
                    <div class="showMore">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.9997 1.1697C10.8123 0.983448 10.5589 0.878906 10.2947 0.878906C10.0305 0.878906 9.77707 0.983448 9.5897 1.1697L5.9997 4.7097L2.4597 1.1697C2.27234 0.983448 2.01889 0.878906 1.7547 0.878906C1.49052 0.878906 1.23707 0.983448 1.0497 1.1697C0.955976 1.26266 0.881582 1.37326 0.830813 1.49512C0.780044 1.61698 0.753906 1.74769 0.753906 1.8797C0.753906 2.01171 0.780044 2.14242 0.830813 2.26428C0.881582 2.38613 0.955976 2.49674 1.0497 2.5897L5.2897 6.8297C5.38267 6.92343 5.49327 6.99782 5.61513 7.04859C5.73699 7.09936 5.86769 7.1255 5.9997 7.1255C6.13172 7.1255 6.26242 7.09936 6.38428 7.04859C6.50614 6.99782 6.61674 6.92343 6.7097 6.8297L10.9997 2.5897C11.0934 2.49674 11.1678 2.38613 11.2186 2.26428C11.2694 2.14242 11.2955 2.01171 11.2955 1.8797C11.2955 1.74769 11.2694 1.61698 11.2186 1.49512C11.1678 1.37326 11.0934 1.26266 10.9997 1.1697Z" fill="#5c56d4"></path></svg>
                    </div>
                </div>
            </div>

            {dropdownVisiblity &&

                <div class="drop_list df"  style={dropDownPosition==="up"?{ flexDirection: 'column',top:"unset",bottom:"25px", zIndex:"9999999999999999999999999999999999999999"}:{ flexDirection: 'column',top:"50px",zIndex:"9999999999999999999999999999999999999999" }}>

                    <div class="drop_list_inner" style={{ fontWeight: 400 }}>
                        {/* {console.log(props.countrylist)} */}
                        <div
                            className='row df space-between'
                            style={{
                                alignItems: 'center',
                                padding: '0px 24px'
                            }}
                        >
                            <input
                                type='search'
                                placeholder='Search'
                                style={{ minWidth: "0px" }}
                                value={props.newUser}
                                onChange={e => {
                                    searchValue(e.target.value)
                                }}
                            />

                        </div>
                        {props.loaderEnabled && props.loading ? <div className='row center df'>
                                    <img
                                      src={Small_loader}
                                      style={{
                                        width: '40px',
                                        height: '40px'
                                      }}
                                      className='fit-content'
                                      alt=''
                                    />
                                  </div>:
                        <>
                        {dropDownData.map((data, index) => {
                            return <div class="drop-item row" style={{ textAlign: "left" }}
                                onClick={

                                    props.onClick ? () => { props.onClick(data[props.index_name]); setdropdownvisblity(false) } : () => { setdropdownvisblity(false) }

                                }
                                key={index}>{data[props.index_name]}</div>
                        })}
                        </>}

                    </div>

                </div>}

        </div>

    </>)
}
export default DropDown