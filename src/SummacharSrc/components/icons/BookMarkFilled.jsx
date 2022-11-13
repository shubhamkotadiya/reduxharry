import BookmarkFilledImg from '../../assets/images/bookmark-filled.svg'
const BookMarkFilled = (props) => {
    return (
        <div className='functionality_btn pointer center has_bookmark_btn' onClick={ props.onClick ? () => { props.onClick() } : () => { } } >
            <img src={BookmarkFilledImg} alt="" />
        </div>
    )
}
export default BookMarkFilled