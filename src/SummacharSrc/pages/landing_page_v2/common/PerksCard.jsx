const PerksCard = (props) => {
    const margin_h = props.margin_h ? "0px 32px" : "0px"
    return (
        <>
            <div className="radius-primary p-primary column perks_card df fit-content p-relative space-between" style={{ margin: margin_h}}>
                <div className="card-img-full row radius-primary">
                    <img src={props.img} className="fit-content radius-primary" itemType="svg" alt="" />
                </div>
                <div className='row line-margin-small'>
                    <h3 className="landing_page_card_heading row ">{props.heading}</h3>
                    <span className="landing_page_card_content txt-gray row ">{props.description}</span>
                </div>
                <button className="btn btn-primary landing_page_btn_priamry row radius-primary pointer" onClick={props.onClick ? () => { props.onClick() } : () => { }}>
                    {props.btn_txt ? props.btn_txt : "Play Now"}
                </button>
            </div>
        </>
    )
}
export default PerksCard;