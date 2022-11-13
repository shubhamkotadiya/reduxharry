import { useState } from "react";

const LandingPageSlider = (Props) => {
    const [index,setIndex] = useState(0);
    return (
        
        <div className="landing-carousal-container df p-relative">
            <button onClick={()=>{if(index>0){setIndex(index-1)}}} className={(index==0) ? "landing-carousal-left-btn-disabled df center":"landing-carousal-left-btn df center"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="14" viewBox="0 0 10 14" fill="none">
                    <path d="M1.22674 6.05335L6.88008 0.400013C7.00403 0.275042 7.15149 0.175849 7.31397 0.108157C7.47645 0.0404659 7.65073 0.00561523 7.82674 0.00561523C8.00276 0.00561523 8.17703 0.0404659 8.33951 0.108157C8.50199 0.175849 8.64946 0.275042 8.77341 0.400013C9.02174 0.64983 9.16113 0.987765 9.16113 1.34001C9.16113 1.69226 9.02174 2.0302 8.77341 2.28001L4.05341 7.00001L8.77341 11.72C9.02174 11.9698 9.16113 12.3078 9.16113 12.66C9.16113 13.0123 9.02174 13.3502 8.77341 13.6C8.64882 13.7236 8.50107 13.8214 8.33862 13.8877C8.17617 13.9541 8.00222 13.9877 7.82674 13.9867C7.65127 13.9877 7.47732 13.9541 7.31487 13.8877C7.15242 13.8214 7.00466 13.7236 6.88008 13.6L1.22674 7.94668C1.10177 7.82273 1.00258 7.67526 0.934888 7.51278C0.867196 7.3503 0.832345 7.17603 0.832345 7.00001C0.832345 6.824 0.867196 6.64972 0.934888 6.48724C1.00258 6.32476 1.10177 6.1773 1.22674 6.05335Z" />
                </svg>
            </button>
            <div className="landing-carousal-slider row df" style={{transform:"translateX(-"+index*100+"%)"}}>
                {Props.data && Props.data.length > 0 && Props.data.map((img, index) => {
                    return (
                        <div className="landing-carousal-slide df flex-1 row-center" style={{ flexDirection: "column" }} key={index}>
                            <img src={img} alt="" />
                            <h3 className="card-desc">{Props.dataText && Props.dataText[index] ? Props.dataText[index] :""}</h3>
                        </div>
                    )
                })}


            </div>
            <button onClick={()=>{if(index<Props.data.length-1){setIndex(index+1)}}} className={index>=Props.data.length-1?"landing-carousal-right-btn-disabled df center":"landing-carousal-right-btn df center"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="14" viewBox="0 0 10 14" fill="none">
                    <path d="M8.77326 6.05335L3.11992 0.400013C2.99597 0.275042 2.84851 0.175849 2.68603 0.108157C2.52355 0.0404659 2.34927 0.00561523 2.17326 0.00561523C1.99724 0.00561523 1.82297 0.0404659 1.66049 0.108157C1.49801 0.175849 1.35054 0.275042 1.22659 0.400013C0.978256 0.64983 0.838867 0.987765 0.838867 1.34001C0.838867 1.69226 0.978256 2.0302 1.22659 2.28001L5.94659 7.00001L1.22659 11.72C0.978256 11.9698 0.838867 12.3078 0.838867 12.66C0.838867 13.0123 0.978256 13.3502 1.22659 13.6C1.35118 13.7236 1.49893 13.8214 1.66138 13.8877C1.82383 13.9541 1.99778 13.9877 2.17326 13.9867C2.34873 13.9877 2.52268 13.9541 2.68513 13.8877C2.84758 13.8214 2.99534 13.7236 3.11992 13.6L8.77326 7.94668C8.89823 7.82273 8.99742 7.67526 9.06511 7.51278C9.1328 7.3503 9.16765 7.17603 9.16765 7.00001C9.16765 6.824 9.1328 6.64972 9.06511 6.48724C8.99742 6.32476 8.89823 6.1773 8.77326 6.05335Z" />
                </svg>
            </button>
        </div>
    )
}
export default LandingPageSlider;