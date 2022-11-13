import { useState } from "react"
import SignInController from "./SignInController";
import SignInWithUserNameController from "./SignInWithUserNameController.jsx";

const SignInMain = (props) => {
    const [step, setStep] = useState(1);
    const stepChange = (val) => {
        setStep(val)
    }
    return (
        <>
            {step == 2 && <SignInWithUserNameController stepChange={stepChange} {...props} />}
            {step == 1 && <SignInController stepChange={stepChange}{...props} />}
        </>
    )
}
export default SignInMain