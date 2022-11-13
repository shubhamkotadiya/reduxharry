

const PlayAndWinCard = (props) => {
    const margin_h = props.margin_h ? "0px 32px" : "0px"
    return (
        <>
            <div className="radius-primary p-primary column perks_card df fit-content p-relative " style={{ margin: 'auto' }}>
                <div className="card-img-full row radius-primary">
                    <img src={props.img} className="fit-content radius-primary" itemType="svg" alt="" />
                </div>
                <div className='row line-margin-small'>
                    <h3 className="landing_page_card_heading row ">{props.heading}</h3>
                    <span className="landing_page_card_content txt-gray row ">{props.description}</span>
                </div>
               
            </div>
        </>
    )
}
export default PlayAndWinCard;