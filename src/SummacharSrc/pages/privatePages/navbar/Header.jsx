import Logo from '../../../assets/images/common/summachar_logo_white.svg'

import Avtar from '../../../assets/images/avtar/profileImg.svg'
import React from 'react'
import { useHistory } from 'react-router'
const Header = (Props) => {
    const history = useHistory();
    return (
        <>
        {/* <header className="df row  row-center bg-primary" style={{ position: "sticky", top: "0px", justifyContent: "space-between" ,zIndex:1111111111111111111111111111}}>
            <button style={{ margin: "3px 10px" }}  onClick={Props.onBackClick ? ()=>{Props.onBackClick()} : () => { history.goBack() }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                    <path d="M14.6669 7.66669H4.54685L8.94685 3.28002C9.19793 3.02895 9.33898 2.68843 9.33898 2.33336C9.33898 1.97829 9.19793 1.63776 8.94685 1.38669C8.69578 1.13562 8.35526 0.994568 8.00019 0.994568C7.64512 0.994568 7.30459 1.13562 7.05352 1.38669L0.386854 8.05336C0.265467 8.18016 0.170313 8.32969 0.106854 8.49336C-0.0265034 8.81797 -0.0265034 9.18208 0.106854 9.50669C0.170313 9.67036 0.265467 9.81989 0.386854 9.94669L7.05352 16.6134C7.17747 16.7383 7.32494 16.8375 7.48742 16.9052C7.6499 16.9729 7.82417 17.0078 8.00019 17.0078C8.1762 17.0078 8.35048 16.9729 8.51296 16.9052C8.67544 16.8375 8.8229 16.7383 8.94685 16.6134C9.07183 16.4894 9.17102 16.3419 9.23871 16.1795C9.3064 16.017 9.34125 15.8427 9.34125 15.6667C9.34125 15.4907 9.3064 15.3164 9.23871 15.1539C9.17102 14.9914 9.07183 14.844 8.94685 14.72L4.54685 10.3334H14.6669C15.0205 10.3334 15.3596 10.1929 15.6097 9.94283C15.8597 9.69278 16.0002 9.35365 16.0002 9.00002C16.0002 8.6464 15.8597 8.30726 15.6097 8.05722C15.3596 7.80717 15.0205 7.66669 14.6669 7.66669Z" fill="#FAFAFF" />
                </svg>
            </button>
            
            <img src={Logo} alt="" />
            
            <div className="nav_profile_img df" style={{margin:"3px 10px"}}>
                <img src={Avtar} className="fit-content" alt="" />
            </div>
        </header> */}
        </>
        
    )
}
export default Header;