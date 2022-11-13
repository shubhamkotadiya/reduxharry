import React from "react"
const InnerPopUp = (Props) => {
    return (
        <div className="inner_pop_up_container row center df" style={{ zIndex: 999999999999999999999999999,backgroundColor:"rgba(0,0,0,0.7)  !important" }}>
            <div className="grayArea fit-content"  onClick={Props.setVisiblity ? () => { Props.setVisiblity(false) } : () => { }}></div>

            <div className="p-relative radius-primary df row innerPopUp">
                <button className="close_btn" onClick={Props.setVisiblity ? () => { Props.setVisiblity(false) } : () => { }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M17.8799 16L23.6133 10.28C23.8643 10.0289 24.0054 9.68836 24.0054 9.3333C24.0054 8.97823 23.8643 8.6377 23.6133 8.38663C23.3622 8.13556 23.0217 7.99451 22.6666 7.99451C22.3115 7.99451 21.971 8.13556 21.7199 8.38663L15.9999 14.12L10.2799 8.38663C10.0288 8.13556 9.68832 7.99451 9.33325 7.99451C8.97818 7.99451 8.63766 8.13556 8.38659 8.38663C8.13551 8.6377 7.99446 8.97823 7.99446 9.3333C7.99446 9.68836 8.13551 10.0289 8.38659 10.28L14.1199 16L8.38659 21.72C8.26161 21.8439 8.16242 21.9914 8.09473 22.1539C8.02704 22.3163 7.99219 22.4906 7.99219 22.6666C7.99219 22.8426 8.02704 23.0169 8.09473 23.1794C8.16242 23.3419 8.26161 23.4893 8.38659 23.6133C8.51054 23.7383 8.658 23.8375 8.82048 23.9052C8.98296 23.9728 9.15724 24.0077 9.33325 24.0077C9.50927 24.0077 9.68354 23.9728 9.84602 23.9052C10.0085 23.8375 10.156 23.7383 10.2799 23.6133L15.9999 17.88L21.7199 23.6133C21.8439 23.7383 21.9913 23.8375 22.1538 23.9052C22.3163 23.9728 22.4906 24.0077 22.6666 24.0077C22.8426 24.0077 23.0169 23.9728 23.1794 23.9052C23.3418 23.8375 23.4893 23.7383 23.6133 23.6133C23.7382 23.4893 23.8374 23.3419 23.9051 23.1794C23.9728 23.0169 24.0077 22.8426 24.0077 22.6666C24.0077 22.4906 23.9728 22.3163 23.9051 22.1539C23.8374 21.9914 23.7382 21.8439 23.6133 21.72L17.8799 16Z" fill="#FAFAFF" />
                    </svg>
                </button>
                <h1 className="txt-extraalarge" style={{ color: "#000" }}>{Props.heading ?? ""}</h1>
                <p className="txt-medium txt-secondary" style={{ margin: "5px 0px" }}>{Props.description ?? ""}</p>
                <div className="row df" style={{ flexWrap: "wrap", margin: "5px 0px" }}>
                    {Props.categories && Object.keys(Props.categories).length > 0 && Object.keys(Props.categories).map((category, index) => {
                        return <span key={index} className="txt-medium txt-primary" style={{ marginRight: "5px" }}>#{category}</span>;
                    })}
                </div>
            </div>
        </div>
    )
}
export default InnerPopUp;