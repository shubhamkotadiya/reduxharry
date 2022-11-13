import styleSheet from "../../../common/stylesheet"
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useEffect, useState } from "react"
const CountDownTimer = (Props) => {
    const [size, setSize] = useState(72);
    let lastTime = 0;

    useEffect(() => {
        if (window.innerWidth <= 768) {
            setSize(32)
        } else {
            setSize(72)
        }
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                setSize(32)
            } else {
                setSize(72)
            }
        });
        return () => { return window.removeEventListener('resize', () => { }) }
    }, [])
    return (
        <>
            <CountdownCircleTimer
                isPlaying={Props.isPlaying}
                key={Props.currentQuestion}
                strokeWidth={size==32?2:5}
                duration={Props.totalTIme}
                onComplete={Props.onComplete}
                initialRemainingTime={Props.time}
                size={size}
                colors={[
                    [styleSheet.primaryColor, 0.75],
                    [styleSheet.primaryColor, 0.65],
                    ['#FF0000', 0.33],
                ]}

            >
                {({ remainingTime, elapsedTime }) => {

                    if (lastTime == 59) {

                        lastTime = 0;
                        let temp = [...Props.timeArray]
                        temp[Props.currentQuestion] = remainingTime;
                        Props.setTime(temp);

                    } else {
                        lastTime += 1;
                    }
                    return <span className="txt-medium">{remainingTime + 's'}</span>
                }
                }
            </CountdownCircleTimer>
        </>
    )
}
export default CountDownTimer;