import BookmarkUnfilledImg from '../../assets/images/bookmark-unfilled.svg'
const BookMarkUnFIlled = (props)=>{
    return(
        <div className='functionality_btn center pointer has_bookmark_btn' onClick={ props.onClick ? () => { props.onClick() } : () => { }} >
            <img src={BookmarkUnfilledImg} alt="" />
    </div>
    )
}
export default BookMarkUnFIlled