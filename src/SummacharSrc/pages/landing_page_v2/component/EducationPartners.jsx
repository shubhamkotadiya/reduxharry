import learn_better_web from '../../../assets/images/landing_page_new/education_partner_desktop.png';
import learn_better_mobile from '../../../assets/images/landing_page_new/education_partner_mobile.png';
const EducationPartners = () => {
    return (
        <>
            <div className="landing_page_container df row center column" style={{ marginTop: "0px" }}>


                <div className="df p-relative row learn_better_container">
                    <div className="learn_better_web_img">
                        <embed src={learn_better_web} alt="Learn Better" />
                    </div>
                </div>
                <div className="df p-relative row learn_better_small_container">
                    <div className="learn_better_mobile_img">
                        <embed src={learn_better_mobile} alt="Learn Better" />
                    </div>
                </div>
            </div>
        </>
    )
}
export default EducationPartners