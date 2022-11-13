import Radio from '@mui/material/Radio';
const PricingListItem = (props) => {
    if (props.isRadio) {
        return (
            <li className="df  custom-li " style={{ alignItems: "center" }} >

                <Radio
                    size="small"
                    checked={props.selected ? props.selected : false}
                    onChange={props.onChange}
                    value={props.title}
                    // name="radio-buttons"
                    inputProps={{ 'aria-label': 'A' }}
                />
                <p className="landing_section_card_content df" style={{ lineHeight: "100%", color: "#000" }}>{props.title}</p>
            </li>
        )
    } else if (props.isStar) {
        return (
            <li className="df custom-li star-list" >

                <div className="svg-list-item star-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none">
                        <path d="M12 0L14.6942 8.2918H23.4127L16.3593 13.4164L19.0534 21.7082L12 16.5836L4.94658 21.7082L7.64074 13.4164L0.587322 8.2918H9.30583L12 0Z" fill="#ECC249" />
                    </svg>
                </div>
                <p className="landing_section_sub_header" style={{ color: "#000", paddingTop: "6px" }}>{props.title}</p>
            </li>
        )
    }
    else {
        return (
            <li className="df custom-li" style={props.fullWidth ? { width: "unset" } : {}}>
                <div className="svg-list-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
                        <path d="M14.7104 1.20986C14.6175 1.11613 14.5069 1.04174 14.385 0.990969C14.2632 0.940201 14.1324 0.914062 14.0004 0.914062C13.8684 0.914062 13.7377 0.940201 13.6159 0.990969C13.494 1.04174 13.3834 1.11613 13.2904 1.20986L5.84044 8.66986L2.71044 5.52986C2.61392 5.43662 2.49998 5.36331 2.37512 5.3141C2.25026 5.2649 2.11694 5.24077 1.98276 5.24309C1.84858 5.24541 1.71617 5.27414 1.59309 5.32763C1.47001 5.38113 1.35868 5.45834 1.26544 5.55486C1.1722 5.65138 1.09889 5.76532 1.04968 5.89018C1.00048 6.01503 0.976347 6.14836 0.978669 6.28254C0.98099 6.41672 1.00972 6.54913 1.06321 6.67221C1.1167 6.79528 1.19392 6.90662 1.29044 6.99986L5.13044 10.8399C5.2234 10.9336 5.334 11.008 5.45586 11.0588C5.57772 11.1095 5.70843 11.1357 5.84044 11.1357C5.97245 11.1357 6.10316 11.1095 6.22501 11.0588C6.34687 11.008 6.45748 10.9336 6.55044 10.8399L14.7104 2.67986C14.8119 2.58622 14.8929 2.47257 14.9484 2.34607C15.0038 2.21957 15.0324 2.08296 15.0324 1.94486C15.0324 1.80676 15.0038 1.67015 14.9484 1.54365C14.8929 1.41715 14.8119 1.3035 14.7104 1.20986Z" fill="#5C56D4" />
                    </svg>
                </div>

                <p className="landing_section_card_content df" style={{ lineHeight: "100%", color: "#000" }}>{props.title}</p>
            </li>
        )
    }
}
export default PricingListItem;