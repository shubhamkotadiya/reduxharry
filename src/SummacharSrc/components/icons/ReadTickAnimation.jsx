import FilledTick from '../../assets/images/icons/read-tick-filled.svg'
import FilledTickAnim from '../../assets/images/icons/Read-tick-animation2.gif'
import { useState } from 'react'
const ReadTickAnimation = ()=>{
    const [animationTime, setAnimationTime]=useState(0);
    const FilledTickAnimStop = ()=>{
        let tempTime = 0.1;
        const timeAnimated = setInterval(()=>{
            if(tempTime<=1.2){
                tempTime=tempTime+0.1;
                setAnimationTime(tempTime);
            } else {
                clearInterval(timeAnimated)
            }
        },100)
    }
    return (
        <div className='functionality_btn center has_read_btn '>
            {/* <img src={FilledTick} alt="" /> */}

            {animationTime<=1.2 ? (<img src={FilledTickAnim} alt="" onLoad={()=>{FilledTickAnimStop()}}/>):(<img src={FilledTick} alt="" />)}

        </div>
    )
}
export default ReadTickAnimation