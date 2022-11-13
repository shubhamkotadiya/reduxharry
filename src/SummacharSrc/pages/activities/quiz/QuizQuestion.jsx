import { CountdownCircleTimer } from 'react-countdown-circle-timer'
const QuizQuestion = ()=>{
    return(
        <>
        <CountdownCircleTimer
                isPlaying
                duration={10}
                onComplete={()=>{}}
                strokeWidth={5}
                size={50}
                colors={[
                ['#5c56d4', 0.75],
                ['#5c56d4', 0.60],
                ['#FF6D6D', 0.25],      
                ]}
            > {({ remainingTime }) => remainingTime+"s"}
  </CountdownCircleTimer>
        </>
    );
}
export default QuizQuestion;