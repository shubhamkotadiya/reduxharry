import { toast } from 'react-toastify';
import logo from '../../assets/images/common/Pathshala_icon.svg'
import styleSheet from '../../common/stylesheet';
const startrazorpay = async(Props) => {        
    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);

    script.async = true;

    script.onload = (thiss,e) => {
        
        const options = {
            key: Props.razorpay_merchant_key, // Enter the Key ID generated from the Dashboard
            amount: Props.razorpay_amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: Props.currency,
            name: "Pathshala by Summachar",
            description: "Plan : "+ Props.packageName,
            image: logo.replace,
            order_id: Props.razorpay_order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler:  async(response) =>{
                //alert(response.razorpay_payment_id);
                //alert(response.razorpay_order_id);
                //alert(response.razorpay_signature);
                await Props.onSuccess(response)
            },
            prefill: {
                name: Props.name ? Props.name : "",
                email: "",
                contact: Props.contact ? Props.contact : ""
            },
            notes: {
                // "address": "Razorpay Corporate Office"
            },
            theme: {
                color: styleSheet.primaryColor
            }

        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();

        rzp1.on('payment.failed', function (response) {

            Props.onFail()
        });
    }
    script.onerror = () => {
        alert('error')
        
        toast.error("OOPS! Something wents wrong!!")
        return false;
    }

}
export default startrazorpay;