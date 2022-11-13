import React from "react";
import '../../assets/css/LandingPage.css';
import '../../assets/css/landingpage-privacy.css';
import NavBar from "./NavBar";

const Privacy = () =>{
    
    return(
        // <div style={{height: "100%",width: "100%",overflowX: "hidden",overflowY: "scroll"}}>         
        <div className="wrapper_container">
            <NavBar />
            
            <div class="privacy-container">
    <div class="privacy-main-container">
        {/* <!-- <a [routerLink]="'/'" class="logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="222" height="24" viewBox="0 0 222 24" fill="none">
                <g clipPath="url(#clip0)">
                <path d="M6.50812 6.88109C6.29597 7.7816 6.79827 8.37779 7.47217 8.81873C8.12403 9.23855 8.80482 9.6121 9.50947 9.9366C10.3955 10.3589 11.3346 10.6756 12.2051 11.1259C14.7603 12.4207 16.0426 14.5944 15.9115 17.4139C15.7774 20.3172 14.233 22.3046 11.5 23.4007C8.06808 24.7732 2.41793 23.615 0 21.2271C0.705099 19.9695 1.42268 18.6808 2.09034 17.5008C3.55981 18.097 4.87329 18.687 6.22733 19.159C7.2257 19.5068 8.24279 19.3515 9.27548 19.0659C10.8354 18.6373 10.9103 16.5475 9.7965 15.8706C8.91669 15.3334 7.98072 14.8863 7.06347 14.4174C6.00582 13.8771 4.87953 13.4548 3.8874 12.812C-0.0623981 10.2471 0.64582 4.51494 3.74389 2.30404C5.07592 1.38994 6.63642 0.861119 8.25215 0.77629C10.4954 0.589979 14.0209 1.37249 16.1424 3.28218C15.5527 4.4901 14.9506 5.72907 14.3079 7.04256C13.868 6.87178 13.4998 6.71341 13.1223 6.5861C11.9992 6.20726 10.8854 5.79738 9.74035 5.49618C9.23232 5.40313 8.71095 5.40946 8.20535 5.51481C7.39418 5.63902 6.71404 5.99301 6.50812 6.88109Z" fill="#5C56D4"/>
                <path d="M40.0503 2.10531C40.0503 6.45257 40.0503 10.7998 40.0503 15.1316C40.0503 19.6186 37.1082 22.7082 33.2863 23.6615C28.8186 24.7763 24.4102 22.997 22.4353 19.3453C21.779 18.1668 21.4254 16.8452 21.4057 15.498C21.3745 10.7936 21.4057 6.08927 21.4057 1.38491C21.4057 1.29175 21.4775 1.2017 21.5648 0.993652H26.5005C26.5317 1.4439 26.5816 1.84137 26.5816 2.23573C26.5816 6.42152 26.6066 10.6197 26.5816 14.7962C26.5816 16.6966 27.5176 17.9262 29.1805 18.6311C30.8434 19.336 32.4346 18.9416 33.7793 17.7182C34.7152 16.8612 35.0272 15.7371 35.0272 14.5012C35.0272 10.5204 35.0272 6.53952 35.0272 2.55867V1.00607H40.0191C40.0222 1.40354 40.0503 1.75442 40.0503 2.10531Z" fill="#5C56D4"/>
                <path d="M116.179 5.02109C116.179 9.67887 116.179 14.3367 116.179 18.9944C116.229 19.7562 116.022 20.5127 115.589 21.1432C115.025 21.9537 114.844 23.025 114.491 23.9907H105.178C105.49 23.5311 105.724 23.1678 105.996 22.8418C107.259 21.3326 108.554 19.8484 109.793 18.3175C110.154 17.8891 110.412 17.3832 110.544 16.8394C111.516 11.8711 112.452 6.90283 113.352 1.93453C113.49 1.16445 113.727 0.707983 114.529 0.555829C115.091 0.411455 115.643 0.232035 116.182 0.018631L116.179 5.02109Z" fill="#5C56D4"/>
                <path d="M101.207 0.229791C101.207 7.99276 101.207 15.734 101.207 23.6025H96.2741V14.523L96.0057 14.4019L89.4539 23.6802C87.0672 20.7737 85.2109 17.7493 82.6994 15.0974C82.6994 17.9232 82.6994 20.7499 82.6994 23.5777C82.6994 23.615 82.6307 23.6522 82.5964 23.6895H78.0788C77.7824 22.6058 77.6857 2.85678 77.9477 0.170793C78.4719 -0.158357 78.6747 0.257738 78.9087 0.589993C80.6371 3.04309 82.3634 5.49723 84.0877 7.95239C85.5769 10.0681 87.0672 12.1786 88.5585 14.2839C88.8237 14.6565 89.117 15.0105 89.4945 15.498C90.7893 13.7125 92.0372 12.0047 93.2852 10.2937C94.555 8.53306 95.8092 6.7569 97.0946 5.01489C98.3426 3.32877 99.4813 1.56813 100.773 0.0465851C100.892 0.0586362 101.009 0.0846944 101.122 0.124215C101.163 0.146969 101.194 0.184917 101.207 0.229791Z" fill="#5C56D4"/>
                <path d="M70.4412 0.0714238V23.615H65.3589V14.4795L65.1156 14.4267L58.5638 23.6988C56.2145 20.7799 54.3269 17.7803 51.9246 14.7559V23.6398H47.0326V0.195631C47.6753 -0.186307 47.875 0.33847 48.1246 0.695567C49.6065 2.79467 51.0947 4.93104 52.5829 7.04568C54.278 9.46151 55.9753 11.8742 57.6746 14.2839C57.9398 14.6596 58.2331 15.0136 58.595 15.4887C58.9974 14.9701 59.3469 14.5385 59.6744 14.0882C62.8193 9.72028 65.9642 5.35231 69.109 0.984349C69.3898 0.596201 69.5521 4.4331e-06 70.4412 0.0714238Z" fill="#5C56D4"/>
                <path d="M216.849 15.5973C219.033 13.2902 219.52 12.5605 219.907 10.4489C220.712 6.052 218.534 2.22951 214.154 1.29175C210.821 0.577554 207.452 1.08059 204.023 0.931545V23.6398H209.171V16.8425H211.477C212.812 18.8671 214.113 20.8513 215.433 22.8231C215.707 23.2361 215.91 23.736 216.578 23.7267C218.325 23.7019 220.075 23.7267 222 23.7267L216.849 15.5973ZM214.609 9.8807C214.266 10.8123 213.707 11.5327 212.634 11.6258C211.561 11.719 210.391 11.7749 209.202 11.8494V6.02405C210.41 5.81916 211.643 5.81287 212.853 6.00542C214.338 6.23521 215.214 8.266 214.609 9.8807Z" fill="#5C56D4"/>
                <path d="M123.48 18.4852C124.996 20.2427 126.465 22.0375 128.063 23.9503H118.585C118.307 23.1305 118.21 22.1679 117.708 21.5159C116.713 20.2303 116.909 18.8237 116.906 17.4139C116.906 12.2013 116.906 6.98667 116.906 1.76996V0L119.561 0.869453C119.988 3.11761 120.425 5.38129 120.853 7.64808C121.414 10.6322 121.979 13.6131 122.525 16.6003C122.662 17.3043 122.993 17.9566 123.48 18.4852Z" fill="#5C56D4"/>
                <path d="M145.862 17.0785L147.987 21.6587C145.584 23.4479 142.591 24.2675 139.606 23.9534C134.468 23.4907 131.017 20.3266 129.788 16.1687C128.861 13.1788 129.047 9.95677 130.312 7.09225C132.515 2.07737 137.223 -0.0248394 142.58 0.863244C144.892 1.24518 146.012 1.7948 147.478 2.90025L145.522 7.58908C144.863 7.18851 144.355 6.85005 143.821 6.55816C139.544 4.19511 135.441 6.72273 134.652 11.0079C134.488 11.9786 134.504 12.971 134.699 13.9361C135.744 19.2925 141.123 20.0409 144.636 17.9263C145.026 17.6996 145.388 17.4077 145.862 17.0785Z" fill="#5C56D4"/>
                <path d="M173.173 0.931548V23.6398H168.203V14.8304H159.096V23.5994H154.011V0.999863H159.003V9.69439H168.11V1.19859C168.98 0.748342 169.816 0.984337 170.621 0.947074C171.426 0.909812 172.262 0.931548 173.173 0.931548Z" fill="#5C56D4"/>
                <path d="M189.406 0.931566C189.26 0.5931 188.966 0.1739 188.658 0.0869543C188.146 -0.0589896 188.034 0.487524 187.878 0.863251C187.818 1.00609 187.734 1.13651 187.672 1.27935C184.662 8.22876 181.652 15.1813 178.643 22.1369C178.446 22.5903 178.331 23.0685 178.125 23.6429H183.117L184.92 19.4261H191.631L193.347 23.6057H199.119C199.102 23.4711 199.074 23.3381 199.034 23.2082C195.838 15.7868 192.628 8.36125 189.406 0.931566ZM186.932 14.9391C187.172 13.5728 187.79 12.4549 188.408 11.1352L189.927 14.9391H186.932Z" fill="#5C56D4"/>
                </g>
                <defs>
                <clipPath id="clip0">
                <rect width="222" height="24" fill="white"/>
                </clipPath>
                </defs>
                </svg>
        </a> --> */}
        <h1 class="privacy-main-title">Privacy Policy</h1>
        <p class="privacy-content">
            Summachar AI Media Labs Pvt Ltd (hereinafter referred to as “Summachar”) recognises the importance of maintaining the privacy of every user who visits our website. We value your privacy and appreciate your trust in us. We are committed to be transparent about the data we collect about you, how it is used and with whom it is shared.
        </p>
        <p class="privacy-content">
            This Privacy Policy applies when you use/visit our website or mobile application, or any other online service (collectively, the “Services”) that links or refers to it. It does not govern or apply to information collected or used by Summachar through any other means.
        </p>
        <p class="privacy-content">
            By visiting and/or using our website, you agree to this Privacy Policy. We strongly recommend that you read this Privacy Policy so that you understand our approach towards the use of your personal data.
        </p>
        <p class="privacy-content">
            Summachar manages www.summacharpathshala.in domain; Summachar Android App and Summachar iOS App.
        </p>
        <p class="privacy-content">
            We reserve the right to modify this privacy statement at any time as required.
        </p>


        <h1 class="privacy-title">Information We Collect</h1>



        <p class="privacy-content">
            We collect information directly from you when you register with us. This includes name, email/phone number. This information is stored in a secured database and is not shared with anyone.
        </p>
        <p class="privacy-content">
            We collect information when you browse our sites/apps, open or respond to an email from us (promotional or informational).
        </p>
        <p class="privacy-content">
            When you post a comment on our website or raise a query/question to us through phone or email.
        </p>
        <p class="privacy-content">
            We collect information from you when you register with us by linking your social media or third party accounts. By doing this, you are authorizing them to share with us certain information from such accounts, and authorizing us to collect, store, and use this in accordance with this Privacy Policy.
        </p>




        <h1 class="privacy-title">
            How We Collect Information
        </h1>
        

        <p class="privacy-content">
            We collect information when you register on our app or website.
        </p>
        <p class="privacy-content">
            Google Analytics: Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualize and personalize the ads of its own advertising network.
        </p>
        <p class="privacy-content">
            You can opt-out of having made your activity on the Service available to Google Analytics by installing the Google Analytics opt-out browser add-on. The add-on prevents the Google Analytics JavaScript (ga.js, analytics.js, and dc.js) from sharing information with Google Analytics about visits activity.
        </p>
        <p class="privacy-content">
            Link to other Sites: Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party’s site. We strongly advise you to review the Privacy Policy of every site you visit.
        </p>
        <p class="privacy-content">
            We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.{" "}
            <a href="https://support.heateor.com/gdpr-and-our-plugins/" class="link">
                Our social sharing plugins are GDPR compliant.
            </a>
        </p>

        <h1 class="privacy-main-title">
            How We Use The Information
        </h1>
        <h1 class="privacy-title">
            Understand Our Readers and Users:
        </h1>
        <p class="privacy-content">
            The Services conduct research on our users’ demographics, interests and behavior based on the information we collect. We do this to better understand and serve our users, and to improve our products and services.
        </p>


        <h1 class="privacy-title">
            Provide services:
        </h1>
        <p class="privacy-content">
            We use the contact information to provide our newsletter service and reaching out to winners of the competitions we conduct.
        </p>


        <h1 class="privacy-title">
            Reach Out To Us:
        </h1>
        <p class="privacy-content">
            For any complaint related to our services or content of the website the aggrieved person may raise the query/complaint within a period of 7 (seven) days from the date of first publication to the email id mentioned herein:
        </p>
        <h2 class="privacy-content">
            Email : {" "}
            <a href="mailto:namaskar@summachar.in" class="privacy-link">namaskar@summachar.in</a>
        </h2>
        {/* <!-- <p class="content">
            
        </p> --> */}

        <p class="privacy-content">
            Summachar AI Media Labs Private Limited
            Ahmedabad, Gujarat
        </p>

        <h2 class="privacy-content">{" "}
           Phone : <a href="tel:+91 93168 36364" class="privacy-link">+91 93168 36364</a>
        </h2>




        
        
    </div>
</div>
        </div>
        
    )
}
export default Privacy;

