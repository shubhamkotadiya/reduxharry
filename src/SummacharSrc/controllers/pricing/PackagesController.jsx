import axios from "axios";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react"
import { useHistory, useParams, Switch, useRouteMatch, Route, useLocation } from "react-router";
import { BreadCrumbContext, Store } from "../../App";
import apiUrl from "../../common/apiUrl";
import { getHeaders, getUserUuid, handleError, isApp, removeFreeTrialToken, resetToken, setAuthToken } from "../../common/helper";
import Packages from "../../pages/auth/Packages";

import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import startrazorpay from "../../pages/auth/startrazorpay";
import SignInController from "../SignInController";
import { setState } from "../../actions/AcdemicConceptAction";
import GetPersonalDetilsController from "./GetPersonalDetilsController";
import RefralCodeController from "./RefralCodeController";
import BillinPage from "../../pages/auth/BillinPage";
import PackagesInsideApp from "../../pages/auth/PackagesInsideApp";
import SignInMain from "../signin/SignInMain";
// import { Switch } from "@material-ui/core";

const PackagesController = (props) => {
    const user = useContext(Store).user;
    const planContext = useContext(Store).plans;
    const [step, setStep] = useState(0);
    const { path, url } = useRouteMatch()

    const [refralCode, setRefralCode] = useState({
        code: "",
        discountAmount: ""
    })


    const locatin = useLocation()
    const [plans, updatePlans] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState({
        plan: "",
        subPlan: "",
        uuid: "",
        amount: 0,
    })

    const setPlan = (plan, uuid, amount, subPlan = "") => {
        setSelectedPlan({ plan, uuid, amount, subPlan })
    }
    const amountToString = (amount) => {

        return Number(parseInt(amount)).toLocaleString('en', {
            minimumFractionDigits: 0
        });
    }
    const history = useHistory();
    const getPlans = async () => {
        return await axios({
            url: apiUrl.plansUrl,
            method: "GET"
        }).then(async (res) => {
            if (res.status == 200 || res.status == 201) {
                let temp = {};
                for (let course of res.data) {
                    if (course.course === "Class XI, XII Arts") {
                        temp["Class XI, XII Arts"] = course;
                        setPlan('Class XI, XII Arts', course.uuid, course.amount_with_gst)
                    } else if (course.course === "Class XI Arts") {
                        temp["Class XI Arts"] = course
                    } else if (course.course.slice(0, 2) === "XI") {
                        if (!temp['explorer']) {
                            temp['explorer'] = {
                                course: 'explorer',
                                amount_with_gst: course.amount_with_gst
                            }
                        }
                        temp['explorer'][course.course.slice(3)] = course
                    } else if (course.course === "News and More") {
                        temp["News and More"] = course
                    }
                }
                planContext.setData(temp);
                updatePlans(temp)



                setLoading(false)
            }
        })
            .catch(async (error) => {
                if (error.length > 0) {

                    if (error.response.status == 401) {
                        await resetToken();
                        await getPlans();
                    } else {
                        handleError(error)
                        return false;
                    }

                }

            })
    }

    let newAmount = [];

    const onResize = () => {
        let width = window.innerWidth;

    }
    useEffect(() => {
        onResize();
        window.addEventListener('resize', onResize)
        return () => { return window.removeEventListener('resize', onResize) }
    }, [])

    useEffect(async () => {

        if (planContext && planContext.data && Object.keys(planContext.data).length > 0) {

            updatePlans(planContext.data)
        } else {
            setLoading(true)
            await getPlans();
        }
    }, [])
    const breadCrumb = useContext(BreadCrumbContext);
    useEffect(() => {
        if(props.from && props.from=="app"){
            if(step==0){
                breadCrumb.set(["Choose your plan"])
            }else if(step<=3){
                
                    breadCrumb.set(["Payment"])
                
            }
        }
        
    },[step])

    //this is done bcz user cant directly use sub routes on refresh
    useLayoutEffect(() => {
        if (locatin.pathname.slice(0, 8) === "/pricing" && locatin.pathname.length > 8) {
            history.replace("/pricing")
        }
    }, [])
    const manageStep = async (Addressdata) => {
        if (step === 0 && !user.isLoggedIn) {
            setStep(1);
            history.push(path + "/signin")
        } else if ((step === 0 && user.isLoggedIn)) {
            setStep(1);
            history.push(path + "/details")
        } else if (step === 3) {
            history.push(path);

            setStep(0);
            await getRazorPayData("", "", "", Addressdata);
        }
    }

    const getRazorPayData = async (amount = "", uuid = "", packageSelected = "", formData = {}) => {
        // if (!isApp()) {

        if (!isApp()) {

            if ((selectedPlan.plan != "" && !(selectedPlan.plan === "explorer" && selectedPlan.subPlan === "")) || (amount != "" && uuid != "")) {
                const amount_of_plan = amount != "" ? amount : selectedPlan.amount;
                const amount_to_pay = refralCode.discountAmount != "" ? amount_of_plan - refralCode.discountAmount : amount_of_plan;
                const uuid_of_slected = uuid != "" ? uuid : selectedPlan.uuid;
                let packagename = selectedPlan.plan != "" ? (selectedPlan.plan === "explorer" && selectedPlan.subPlan != "") ? "XI " + selectedPlan.subPlan : selectedPlan.plan : "Summachar subscription."
                if (packageSelected !== "") {
                    packagename = packageSelected;
                }
                if (getUserUuid()) {
                    setLoading(true)
                    return await axios({
                        url: apiUrl.orderCreate + "?user-uuid=" + getUserUuid(),
                        method: "POST",
                        data: { "amount_with_gst": amount_to_pay, coupon_code: refralCode.discountAmount !== "" ? refralCode.code : "", "sub_plan_uuid": uuid_of_slected, ...formData },
                        headers: getHeaders()
                    }).then(async (response) => {
                        if (response.data.razorpay_amount && response.data.razorpay_amount !== 0) {
                            const passData = {
                                ...response.data,
                                contact: user.data.parent_phone ? user.data.parent_phone : "",
                                name: user.data.full_name ? user.data.full_name : "",
                                packageName: packagename,
                                onSuccess: async (response) => {
                                    setLoading(true)
                                    const body = {
                                        "razorpay_payment_id": response.razorpay_payment_id,
                                        "razorpay_order_id": response.razorpay_order_id,
                                        "razorpay_signature": response.razorpay_signature,
                                        "sub_plan_uuid": uuid_of_slected,

                                    }
                                    await axios({
                                        url: apiUrl.orderComplete + "?user-uuid=" + getUserUuid(),
                                        headers: getHeaders(),
                                        method: "POST",
                                        data: body
                                    }).then(async () => {
                                        toast.success("Your subscription is done successfully.");
                                        removeFreeTrialToken();
                                        const user_response = await user.getUserData();
                                        if (user_response.status == true) {
                                            user.setLogin(true);
                                            history.push('/payment-success');
                                        } else {
                                            toast.error("OOPS! something wents wrong!")
                                        }
                                        setLoading(false)

                                    }).catch(async (err) => {
                                        if (err.response.status == 401) {
                                            await resetToken();
                                            passData.onSuccess();
                                        } else {
                                            toast.error("OOPS! something wents wrong!")
                                        }
                                        setLoading(false)
                                    })
                                },
                                onFail: () => {
                                    history.push("/payment-fail")
                                }
                            }

                            await startrazorpay(passData)
                        } else {
                            toast.success("Your subscription is done successfully.");
                            removeFreeTrialToken();

                            const user_response = await user.getUserData();
                            if (user_response.status == true) {
                                user.setLogin(true);
                                history.push('/payment-success');
                            } else {
                                toast.error("OOPS! something wents wrong!")
                            }
                            setLoading(false)

                        }

                        setLoading(false)
                        return { status: true }
                    }).catch(async (err) => {
                        toast.error(err.response.data.description)
                        setLoading(false)
                        return { status: false }



                    })
                } else {
                    // makeLoginAndPayment()
                    history.push("/signup")
                }
            }
        } else {
            if ((selectedPlan.plan != "" && !(selectedPlan.plan === "explorer" && selectedPlan.subPlan === "")) || (amount != "" && uuid != "")) {
                const amount_of_plan = amount != "" ? amount : selectedPlan.amount;
                const amount_to_pay = refralCode.discountAmount != "" ? amount_of_plan - refralCode.discountAmount : amount_of_plan;
                const uuid_of_slected = uuid != "" ? uuid : selectedPlan.uuid;
                let packagename = selectedPlan.plan != "" ? (selectedPlan.plan === "explorer" && selectedPlan.subPlan != "") ? "XI " + selectedPlan.subPlan : selectedPlan.plan : "Summachar subscription."


                window.flutter_inappwebview.callHandler('Payment', {
                    "amount_with_gst": amount_to_pay,
                    plan: selectedPlan.subPlan !== "" ? "XI " + selectedPlan.subPlan : selectedPlan.plan,
                    coupon_code: refralCode.discountAmount !== "" ? refralCode.code : "",
                    contact: user.data.parent_phone ? user.data.parent_phone : "",
                    name: user.data.full_name ? user.data.full_name : "",
                    email: user.data.email ? user.data.email : "",
                    "sub_plan_uuid": uuid_of_slected,
                    uuid: getUserUuid(),
                    ...formData
                }).then(function (result) {
                    // get result from Flutter side. It will be the number 64.
                    console.log(result);
                });

            }
        }
        // 
    }
    const buyNowForMobile = async (amount = "", uuid = "", plan = "") => {


        if (amount != "" && uuid != "") {

            setPlan(plan, uuid, amount)
        }
        manageStep();

    }
    return (

        <>
            {!loading ?
                <>

                    {step == 1 && !user.isLoggedIn && <SignInMain
                        from="pricing" onClosePopUp={() => { setStep(0); history.push("/pricing") }}

                        onLogin={() => { }}
                    />}
                    {step === 1 && user.isLoggedIn &&
                        <RefralCodeController
                            refralCode={refralCode}
                            planId={selectedPlan.uuid}
                            setRefralCode={(code) => {
                                setRefralCode({ ...refralCode, code: code.toUpperCase() })
                            }}
                            setAmount={(amount) => {
                                setRefralCode({ ...refralCode, discountAmount: amount })
                            }}
                            onSubmit={() => { setStep(2) }}
                            onSayNo={() => {
                                setStep(3);
                                setRefralCode({ ...refralCode, code: "", discountAmount: "" })
                            }}

                            onClosePopUp={() => {
                                setStep(0);
                                setRefralCode({ ...refralCode, code: "", discountAmount: "" })
                                history.push("/pricing")
                            }}

                        />
                    }

                    {step === 2 && user.isLoggedIn &&
                        <BillinPage
                            refralCode={refralCode}

                            plan={selectedPlan}
                            onSubmit={() => { setStep(3) }}
                            onClosePopUp={() => { setStep(0); setRefralCode({ ...refralCode, code: "", discountAmount: "" }); history.push("/pricing") }}

                        />
                    }
                    {step === 3 && user.isLoggedIn &&
                        <GetPersonalDetilsController
                            onClosePopUp={() => { setStep(0); history.push("/pricing") }}

                            onSubmit={(data) => {
                                manageStep({
                                    country: data.country,
                                    address: data.apartment,
                                    city: data.city,
                                    landmark: data.landmark,
                                    pincode: parseInt(data.pincode),
                                    state: data.state
                                })

                            }}
                        />}

                    {(step <= 0 || step > 3) && !props.from &&
                        <Packages
                            amountToString={amountToString}
                            setPlan={setPlan}
                            setStep={setStep}
                            manageStep={manageStep}
                            buyNowForMobile={buyNowForMobile}
                            selectedPlan={selectedPlan}
                            plans={plans}
                            getRazorPayData={getRazorPayData}

                        />}
                    {(step <= 0 || step > 3) && props.from && props.from == "app" &&
                        <PackagesInsideApp
                            amountToString={amountToString}
                            setPlan={setPlan}
                            setStep={setStep}
                            manageStep={manageStep}
                            buyNowForMobile={buyNowForMobile}
                            selectedPlan={selectedPlan}
                            plans={plans}
                            getRazorPayData={getRazorPayData}

                        />}
                </>

                : <Loader />}
        </>
    )
}

export default PackagesController;