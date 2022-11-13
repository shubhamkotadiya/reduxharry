import nobook from "../../../assets/images/common/nobookmark.svg"
const NoBook = (props) => {
    return (
        <>
            <div className=" col_center">
                <div className="no-book">
                    <img src={nobook} />
                    <p className="typo-heading font-bold" style={{color:"#000"}}>No posts bookmarked.</p>
                </div>
            </div>
        </>
    )
}
export default NoBook;