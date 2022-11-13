import { useState } from "react"
import PricingListItem from "./PricingListItem";

const FeatureList = (props) => {
    const [visiblity, setVisiblity] = useState(false);
    return (
        <div className="df row column m-v-primary">
            <button className="df row  center" onClick={() => { setVisiblity(!visiblity) }}>
                {/* minus */}
                {visiblity && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="2" viewBox="0 0 16 2" fill="none">
                    <path d="M15 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1C0 1.26522 0.105357 1.51957 0.292893 1.70711C0.48043 1.89464 0.734784 2 1 2H15C15.2652 2 15.5196 1.89464 15.7071 1.70711C15.8946 1.51957 16 1.26522 16 1C16 0.734784 15.8946 0.48043 15.7071 0.292893C15.5196 0.105357 15.2652 0 15 0Z" fill="#5C56D4" />
                </svg>}
                {/* //plus */}
                {!visiblity && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M15 7H9V1C9 0.734784 8.89464 0.48043 8.70711 0.292893C8.51957 0.105357 8.26522 0 8 0C7.73478 0 7.48043 0.105357 7.29289 0.292893C7.10536 0.48043 7 0.734784 7 1V7H1C0.734784 7 0.48043 7.10536 0.292893 7.29289C0.105357 7.48043 0 7.73478 0 8C0 8.26522 0.105357 8.51957 0.292893 8.70711C0.48043 8.89464 0.734784 9 1 9H7V15C7 15.2652 7.10536 15.5196 7.29289 15.7071C7.48043 15.8946 7.73478 16 8 16C8.26522 16 8.51957 15.8946 8.70711 15.7071C8.89464 15.5196 9 15.2652 9 15V9H15C15.2652 9 15.5196 8.89464 15.7071 8.70711C15.8946 8.51957 16 8.26522 16 8C16 7.73478 15.8946 7.48043 15.7071 7.29289C15.5196 7.10536 15.2652 7 15 7Z" fill="#5C56D4" />
                </svg>}
                <h3 className="txt-primary p-primary  landing_page_sub_heading df font-bold" style={{ marginLeft: "5px" }}> Show plan features</h3>
            </button>
            <div className="df column transition row">
                {visiblity && <div>
                    <PricingListItem isStar={true} title={"Study All Arts Stream Subjects for Standards 11 and 12"} />
                    <PricingListItem isStar={true} title={"Perfect for Last Minute Revision"} />
                    <PricingListItem isStar={true} title={"Learn Complex Concepts in 2 Minutes"} />
                    <PricingListItem isStar={true} title={"Vast Question Banks to Help Excel in Exams"} />
                    <PricingListItem isStar={true} title={"Unlimited Doubt Solving"} />
                    <PricingListItem isStar={true} title={"Easy-to-consume Videos, Infographics and Flashcards"} />
                </div>}

            </div>
        </div>
    )
}
export default FeatureList