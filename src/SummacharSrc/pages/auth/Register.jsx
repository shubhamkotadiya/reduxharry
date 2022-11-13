import React, { useContext, useEffect, useRef, useState } from 'react'
import CustomInput from '../../components/CustomInput'
import '../../assets/css/Register.css'
import Logo from "../../assets/images/common/summachar_logo_white.svg";
import '../../assets/css/login.css'
import BG from '../../assets/images/auth/bg.svg'
import { refresh_sign_in_data, setOTP, setPathshala, setPhoneNo, setSelctedUser } from '../../actions/signInAction'
import Small_loader from '../../assets/images/common/loader_small.gif'
import DropDown from '../../components/DropDown';
const Register = props => {

  const signInData = props.signInDetails
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const onResize = () => {
    { console.log(1) }
    let height = window.innerHeight
    let width = window.innerWidth

    setWindowSize({ width: width, height: height })
  }
  useEffect(() => {
    onResize()
    window.addEventListener('resize', onResize)
    return () => {
      return window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    signInData.otp?.length === 4 && !signInData.loading && props.verifyOTP()
  }, [signInData.otp])

  useEffect((e) => {
    signInData.phoneNo?.length === 10 && !signInData.loading && props.onSignInSubmit()
  }, [signInData.phoneNo])



  let screenWidth = window.innerWidth;
  let logoWidth = 200;
  let logoHeight = 64;
  if (screenWidth < 640) {
    logoWidth = 280;
    logoHeight = logoWidth * 32 / 145;
  }
  else if (screenWidth >= 640 && screenWidth < 720) {
    logoWidth = 280;
    logoHeight = logoWidth * 32 / 145;
  }
  else if (screenWidth >= 720 && screenWidth < 960) {
    logoWidth = 320;
    logoHeight = logoWidth * 32 / 145;
  }
  else if (screenWidth >= 960 && screenWidth < 1280) {
    logoWidth = 240;
    logoHeight = logoWidth * 32 / 145;
  }
  else if (screenWidth >= 1280 && screenWidth < 1600) {
    logoWidth = 280;
    logoHeight = logoWidth * 32 / 145;
  }
  else if (screenWidth >= 1600 && screenWidth < 1920) {
    logoWidth = 320;
    logoHeight = logoWidth * 32 / 145;
  }
  else {
    logoWidth = 360;
    logoHeight = logoWidth * 32 / 145;
  }


  return (
    <>

      <div
        className='signin_container'
        style={{
          height: windowSize.height,
          maxHeight: windowSize.height,
          width: windowSize.innerWidth,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          overflowY: 'scroll',
          overflowX: 'hidden'
        }}
      >
        <div className="sign-in-bg">
          <img src={BG} className="fit-content" alt="" />
        </div>

        <div className='inner_signin_container' style={{ overflowY: 'scroll' }}>

          {signInData.step <= 2 && (
            <>
              <div className="df row center line-margin-small" style={{ marginTop: "0px" }}>
                <svg width={logoWidth} height={logoHeight} viewBox="0 0 145 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M15.1202 32.0002H1.75732L2.3151 30.7759H14.5615L15.1202 32.0002Z" fill="#5C56D4"></path><path fillRule="evenodd" clipRule="evenodd" d="M12.9387 13.4677L10.4949 0.489538L9.02927 0V15.4279L9.51781 15.9174L9.89857 17.0626C10.4969 17.3864 10.9705 17.9 11.2448 18.5225C11.5192 19.145 11.5787 19.8411 11.414 20.5011C11.2494 21.1611 10.8698 21.7477 10.3352 22.1683C9.80058 22.589 9.14123 22.8199 8.46097 22.8247C7.7807 22.8294 7.11817 22.6078 6.57769 22.1947C6.03721 21.7816 5.64947 21.2005 5.47554 20.5428C5.3016 19.8852 5.35134 19.1883 5.61693 18.562C5.88252 17.9357 6.34887 17.4156 6.94255 17.0834L7.33022 15.9174L7.81877 15.4279V0L6.35312 0.489538L3.90939 13.4677L0 18.1208L2.31517 30.3514H14.5615L16.848 18.1208L12.9387 13.4677ZM2.06002 19.5717C2.06002 19.5279 2.06865 19.4846 2.08541 19.4443C2.10217 19.4039 2.12673 19.3672 2.15769 19.3363C2.18865 19.3055 2.2254 19.281 2.26583 19.2644C2.30626 19.2477 2.34958 19.2392 2.3933 19.2394H4.25058C4.29581 19.2369 4.34106 19.2437 4.38358 19.2593C4.42611 19.2749 4.465 19.299 4.49789 19.3302C4.53078 19.3613 4.55697 19.3988 4.57487 19.4404C4.59278 19.482 4.60201 19.5269 4.60201 19.5721C4.60201 19.6174 4.59278 19.6623 4.57487 19.7039C4.55697 19.7455 4.53078 19.783 4.49789 19.8141C4.465 19.8453 4.42611 19.8694 4.38358 19.885C4.34106 19.9006 4.29581 19.9074 4.25058 19.9049H2.39132C2.3031 19.9047 2.21858 19.8694 2.15629 19.807C2.094 19.7445 2.05903 19.6599 2.05903 19.5717H2.06002ZM4.96263 21.9788L3.3526 22.9084C3.30217 22.9378 3.24481 22.9532 3.18645 22.9529C3.11298 22.9533 3.04145 22.9293 2.98305 22.8848C2.92465 22.8402 2.88267 22.7775 2.86368 22.7065C2.8447 22.6355 2.84977 22.5603 2.87811 22.4925C2.90644 22.4247 2.95645 22.3682 3.0203 22.3319L4.62935 21.4022C4.70552 21.3624 4.79412 21.3536 4.87666 21.3775C4.95919 21.4015 5.02928 21.4564 5.07229 21.5308C5.1153 21.6052 5.12791 21.6934 5.10747 21.7768C5.08704 21.8603 5.03515 21.9327 4.96263 21.9788ZM6.61223 23.4217L5.6826 25.0317C5.6534 25.0825 5.61133 25.1247 5.56063 25.154C5.50994 25.1834 5.4524 25.1988 5.39382 25.1989C5.33629 25.1979 5.27999 25.1821 5.23035 25.153C5.18071 25.1239 5.13942 25.0825 5.11048 25.0328C5.08154 24.9831 5.06592 24.9267 5.06514 24.8692C5.06436 24.8116 5.07845 24.7549 5.10603 24.7044L6.03566 23.0944C6.07973 23.0179 6.15236 22.9621 6.23758 22.9392C6.32281 22.9163 6.41364 22.9282 6.49009 22.9722C6.56655 23.0163 6.62237 23.0889 6.64528 23.1741C6.66818 23.2594 6.65629 23.3502 6.61223 23.4266V23.4217ZM8.76225 25.7062C8.7576 25.7913 8.72052 25.8714 8.65862 25.9301C8.59672 25.9887 8.51471 26.0213 8.42946 26.0213C8.34421 26.0213 8.2622 25.9887 8.2003 25.9301C8.1384 25.8714 8.10131 25.7913 8.09667 25.7062V23.847C8.10131 23.7618 8.1384 23.6817 8.2003 23.6231C8.2622 23.5645 8.34421 23.5318 8.42946 23.5318C8.51471 23.5318 8.59672 23.5645 8.65862 23.6231C8.72052 23.6817 8.7576 23.7618 8.76225 23.847V25.7062ZM11.6441 25.2048C11.5937 25.2342 11.5363 25.2496 11.4779 25.2493C11.4194 25.2496 11.3619 25.2344 11.3112 25.2052C11.2604 25.176 11.2183 25.1339 11.1892 25.0832L10.2546 23.4781C10.2148 23.4019 10.2059 23.3133 10.2299 23.2308C10.2538 23.1482 10.3088 23.0781 10.3832 23.0351C10.4576 22.9921 10.5457 22.9795 10.6292 22.9999C10.7127 23.0204 10.785 23.0723 10.8312 23.1448L11.7608 24.7548C11.8034 24.8308 11.8145 24.9205 11.7917 25.0046C11.769 25.0887 11.7142 25.1606 11.6391 25.2048H11.6441ZM14.0107 22.8748C13.9816 22.9256 13.9395 22.9679 13.8888 22.9972C13.8381 23.0266 13.7805 23.042 13.7219 23.0419C13.6638 23.0419 13.6067 23.0262 13.5568 22.9964L11.9467 22.0678C11.8703 22.0237 11.8144 21.9511 11.7915 21.8659C11.7686 21.7807 11.7805 21.6898 11.8246 21.6134C11.8686 21.5369 11.9413 21.4811 12.0265 21.4582C12.1117 21.4353 12.2026 21.4472 12.279 21.4912L13.889 22.4209C13.9645 22.4657 14.0192 22.5387 14.0411 22.6238C14.0629 22.7088 14.0502 22.7991 14.0057 22.8748H14.0107ZM14.5635 20.0068H12.7043C12.659 20.0093 12.6138 20.0025 12.5713 19.9869C12.5287 19.9713 12.4898 19.9472 12.457 19.916C12.4241 19.8849 12.3979 19.8473 12.38 19.8057C12.3621 19.7641 12.3528 19.7193 12.3528 19.674C12.3528 19.6287 12.3621 19.5839 12.38 19.5423C12.3979 19.5007 12.4241 19.4632 12.457 19.432C12.4898 19.4009 12.5287 19.3768 12.5713 19.3611C12.6138 19.3455 12.659 19.3388 12.7043 19.3412H14.5556C14.6407 19.3459 14.7208 19.3829 14.7795 19.4449C14.8381 19.5068 14.8707 19.5888 14.8707 19.674C14.8707 19.7593 14.8381 19.8413 14.7795 19.9032C14.7208 19.9651 14.6407 20.0022 14.5556 20.0068H14.5635Z" fill="#5C56D4"></path><g clip-path="url(#clip0_423:1030)"><path d="M29.3556 0.586138C30.4269 0.55498 31.4914 0.766196 32.4696 1.20402C33.2783 1.58101 33.9548 2.19265 34.411 2.95937C34.8706 3.76822 35.1012 4.68696 35.0781 5.61697C35.0763 6.23674 34.9841 6.85293 34.8042 7.44604C34.6261 8.05358 34.3303 8.62019 33.9336 9.11362C33.5058 9.63619 32.9593 10.049 32.3397 10.3178C31.562 10.6417 30.7244 10.7972 29.8822 10.7742H27.7758V15.4645H24.8479V0.586138H29.3556ZM29.8612 7.90594C30.2456 7.91807 30.6274 7.83739 30.9741 7.67072C31.2512 7.53356 31.4918 7.33263 31.6762 7.08444C31.9672 6.67229 32.1319 6.18434 32.1501 5.68016C32.1437 5.47959 32.1202 5.27993 32.0799 5.08334C32.0239 4.81611 31.9243 4.55991 31.785 4.32503C31.6218 4.05234 31.3876 3.82908 31.1075 3.67906C30.7302 3.4861 30.309 3.39532 29.8858 3.41576H27.7793V7.90594H29.8612Z" fill="#5C56D4"></path><path d="M34.5093 15.4646L41.2217 0H41.3832L48.0957 15.4646H44.7008L40.4143 4.58146L42.5207 3.12803L37.4021 15.4646H34.5093ZM39.1013 10.0897H43.5669L44.599 12.5472H38.1885L39.1013 10.0897Z" fill="#5C56D4"></path><path d="M48.0361 0.586365H58.0627V3.41599H54.4432V15.4647H51.5293V3.41599H48.0537L48.0361 0.586365Z" fill="#5C56D4"></path><path d="M73.4079 0.586365V15.4647H70.487V9.41928H63.8167V15.4647H60.8853V0.586365H63.8167V6.58966H70.487V0.586365H73.4079Z" fill="#5C56D4"></path><path d="M85.1935 4.1847C84.6434 3.88152 84.0692 3.62436 83.4767 3.41586C82.947 3.22541 82.3895 3.12341 81.8267 3.11394C81.2945 3.08599 80.7668 3.22466 80.3171 3.51065C80.1369 3.64133 79.9925 3.81537 79.8974 4.01664C79.8023 4.21792 79.7595 4.43994 79.7729 4.66215C79.7737 4.83902 79.8109 5.01383 79.8822 5.17569C79.9534 5.33756 80.0573 5.48302 80.1872 5.60302C80.5002 5.9072 80.8621 6.15644 81.258 6.34027C81.7018 6.56117 82.1578 6.75691 82.6236 6.92655C83.0622 7.09336 83.4901 7.28681 83.905 7.50582C84.3254 7.72393 84.7111 8.00314 85.0495 8.33434C85.3996 8.68596 85.6743 9.10525 85.857 9.5666C86.0743 10.1439 86.1769 10.758 86.1589 11.3746C86.1644 12.1178 85.9613 12.8476 85.5726 13.481C85.1566 14.152 84.5622 14.6941 83.8559 15.0468C82.9831 15.4739 82.0184 15.6789 81.0473 15.6436C80.4673 15.6427 79.8888 15.5851 79.3201 15.4716C78.1175 15.2333 76.978 14.7466 75.9744 14.0427L77.2698 11.7608C77.6279 12.0222 78.0099 12.249 78.4108 12.4383C78.8096 12.6288 79.2257 12.7805 79.6536 12.8912C80.029 12.9935 80.416 13.0478 80.8051 13.0527C81.1614 13.0512 81.5159 13.0004 81.8583 12.9018C82.2063 12.8118 82.5231 12.6285 82.7746 12.3716C83.0205 12.0942 83.1467 11.7307 83.1257 11.3606C83.1256 11.0651 83.0212 10.7791 82.8308 10.5531C82.6089 10.2873 82.3428 10.0616 82.0444 9.88607C81.7015 9.67656 81.3394 9.50022 80.9631 9.35947C80.5032 9.18393 80.0327 8.98382 79.5588 8.75212C79.0729 8.52567 78.6147 8.24413 78.1931 7.91306C77.7557 7.57957 77.3952 7.15567 77.1364 6.67027C76.858 6.10932 76.723 5.48816 76.7432 4.86226C76.7236 4.07559 76.923 3.29894 77.319 2.61893C77.7136 1.9797 78.2774 1.4621 78.9479 1.12337C79.6992 0.739299 80.5269 0.528181 81.3703 0.505489C82.3614 0.47293 83.3504 0.616765 84.2912 0.930283C84.9977 1.19033 85.6726 1.52952 86.3028 1.94136L85.1935 4.1847Z" fill="#5C56D4"></path><path d="M101.55 0.586365V15.4647H98.6181V9.41928H91.9654V15.4647H89.0339V0.586365H91.9654V6.58966H98.6181V0.586365H101.55Z" fill="#5C56D4"></path><path d="M103.712 15.4646L110.425 0H110.586L117.295 15.4646H113.9L109.614 4.58146L111.738 3.12803L106.601 15.4646H103.712ZM108.301 10.0897H112.77L113.798 12.5472H107.391L108.301 10.0897Z" fill="#5C56D4"></path><path d="M119.461 0.586365H122.393V12.6386H129.386V15.4682H119.461V0.586365Z" fill="#5C56D4"></path><path d="M130.741 15.4646L137.454 0H137.615L144.328 15.4646H140.929L136.643 4.58146L138.767 3.12803L133.631 15.4646H130.741ZM135.33 10.0897H139.799L140.827 12.5472H134.42L135.33 10.0897Z" fill="#5C56D4"></path><path d="M51.9012 24.3712C51.2277 23.9562 50.4617 23.7149 49.6719 23.669C49.3209 23.6477 48.9721 23.7373 48.6749 23.9253C48.5569 24.0132 48.4629 24.1294 48.4016 24.2631C48.3402 24.3969 48.3135 24.5439 48.3238 24.6907C48.3325 24.8608 48.3841 25.0259 48.4737 25.1707C48.5633 25.3156 48.6881 25.4354 48.8364 25.5192C49.2647 25.7979 49.7242 26.0253 50.2055 26.1968C50.6225 26.344 51.0207 26.5396 51.3922 26.7795C51.7393 27.0082 52.0269 27.3163 52.2312 27.6783C52.4576 28.1306 52.564 28.6335 52.5402 29.1387C52.5413 29.6341 52.4052 30.1202 52.147 30.543C51.8718 30.9983 51.4706 31.3641 50.9919 31.5962C50.425 31.8633 49.8035 31.9943 49.1769 31.9789C48.582 31.9786 47.9904 31.8899 47.4216 31.7156C46.8427 31.54 46.2969 31.2695 45.8066 30.9151L46.6597 29.3985C47.0161 29.6581 47.4073 29.8661 47.8218 30.0164C48.1965 30.1657 48.5946 30.2477 48.9979 30.2586C49.3659 30.2644 49.729 30.1736 50.0511 29.9953C50.2033 29.9123 50.3287 29.7876 50.4126 29.6359C50.4965 29.4842 50.5355 29.3118 50.525 29.1387C50.525 28.6297 50.0476 28.1838 49.0962 27.8082C48.6151 27.6222 48.1461 27.4065 47.6919 27.1622C47.3047 26.9463 46.973 26.6435 46.7229 26.2775C46.4381 25.8477 46.2956 25.3393 46.3157 24.8241C46.2998 24.4414 46.3661 24.0597 46.5103 23.7048C46.6544 23.3499 46.873 23.03 47.1512 22.7668C47.7648 22.2244 48.5546 21.9237 49.3735 21.9207C49.9926 21.9053 50.6102 21.9895 51.2026 22.17C51.707 22.3418 52.1872 22.5777 52.6314 22.8721L51.9012 24.3712ZM57.262 28.1838C57.2634 28.5053 57.3599 28.8193 57.5394 29.0861C57.7249 29.3761 57.9778 29.617 58.2766 29.7882C58.573 29.9606 58.9097 30.0515 59.2526 30.0515C59.6077 30.0542 59.9577 29.9672 60.2701 29.7984C60.5825 29.6296 60.8472 29.3846 61.0395 29.0861C61.2139 28.8173 61.3077 28.5042 61.3099 28.1838V21.9488H63.2337V28.2259C63.243 28.9012 63.0591 29.5651 62.7036 30.1393C62.3531 30.7049 61.8556 31.1648 61.2642 31.4698C60.6458 31.7837 59.962 31.9474 59.2684 31.9474C58.5748 31.9474 57.891 31.7837 57.2726 31.4698C56.6845 31.1653 56.1914 30.705 55.8472 30.1393C55.4944 29.5641 55.3118 28.9007 55.3206 28.2259V21.9488H57.248L57.262 28.1838ZM76.9219 21.6258V31.8911H74.8892V27.1517L71.7296 31.7858H71.705L68.5911 27.4501V31.8911H66.7725V21.6258L71.7717 28.7174L76.8903 21.6258H76.9219ZM90.6136 21.6258V31.8911H88.6898V27.1517L85.4951 31.7858H85.4705L82.3811 27.4501V31.8911H80.4572V21.6258L85.4529 28.7174L90.575 21.6258H90.6136ZM111.39 31.052C111.028 31.3171 110.628 31.5255 110.203 31.6699C109.635 31.8793 109.033 31.9839 108.427 31.9789C107.493 32.0016 106.57 31.7685 105.759 31.3048C105.015 30.8818 104.406 30.256 104.003 29.5003C103.6 28.7305 103.394 27.873 103.403 27.0042C103.387 26.0818 103.593 25.1691 104.003 24.3431C104.38 23.5895 104.963 22.9587 105.685 22.5246C106.441 22.0806 107.305 21.8546 108.181 21.8716C108.743 21.8662 109.302 21.9479 109.838 22.1138C110.307 22.2569 110.755 22.4599 111.172 22.7177L110.439 24.5748C109.828 24.0688 109.065 23.7842 108.272 23.7673C107.773 23.7658 107.285 23.9111 106.868 24.1851C106.424 24.4645 106.061 24.8555 105.815 25.3191C105.553 25.809 105.419 26.3573 105.425 26.9129C105.41 27.4897 105.531 28.062 105.776 28.584C106.003 29.0503 106.36 29.4406 106.805 29.7074C107.29 29.9862 107.844 30.1213 108.402 30.0971C108.845 30.1048 109.286 30.0248 109.698 29.8619C110.032 29.7343 110.339 29.5449 110.604 29.3037L111.39 31.052ZM122.691 31.8911H120.767V27.8292H116.389V31.8911H114.465V21.9488H116.389V25.9054H120.774V21.9488H122.698L122.691 31.8911ZM131.222 29.9672H127.981L127.185 31.8911H125.254L129.684 21.6258H129.79L134.216 31.8911H131.966L131.222 29.9672ZM130.59 28.2575L129.642 25.8527L128.652 28.2575H130.59ZM142.066 31.8911L140.016 28.7876H138.738V31.8876H136.814V21.9488H139.774C140.984 21.9488 141.92 22.2484 142.582 22.8475C142.921 23.1579 143.186 23.5391 143.359 23.9639C143.533 24.3888 143.611 24.8467 143.587 25.305C143.594 25.9011 143.468 26.4913 143.218 27.0323C142.971 27.5638 142.565 28.0054 142.056 28.2961L144.327 31.9016L142.066 31.8911ZM138.749 26.8673H140.128C140.344 26.8864 140.56 26.854 140.761 26.7728C140.961 26.6916 141.139 26.5639 141.28 26.4004C141.509 26.1159 141.633 25.7614 141.631 25.3963C141.629 25.0298 141.522 24.6715 141.322 24.3642C141.119 24.0377 140.722 23.8727 140.132 23.8727H138.728L138.749 26.8673ZM98.0247 21.6399L98.8568 21.9207L100.261 29.3388L102.434 31.9999H98.6953L98.2775 30.7396L98.0001 30.4587L98.0247 21.6399ZM97.2769 21.6399V30.4587L96.9961 30.7396L96.5818 31.9999H92.8254L95.0512 29.3388L96.4554 21.9207L97.2769 21.6399Z" fill="#5C56D4"></path><path d="M27.8917 21.6257C28.7959 21.5816 29.6925 21.8103 30.465 22.2822C30.7791 22.4957 31.0329 22.7865 31.202 23.1265C31.371 23.4665 31.4497 23.8444 31.4305 24.2236C31.4511 24.7946 31.2847 25.3568 30.9565 25.8245C30.6289 26.2591 30.1845 26.5915 29.6751 26.7829C29.0823 27.0027 28.4536 27.1099 27.8215 27.0989L27.4985 26.0001C28.2712 25.9867 29.0406 26.1055 29.7734 26.3511C30.3771 26.5533 30.9179 26.909 31.3427 27.3833C31.7268 27.816 31.9336 28.3776 31.922 28.9561C31.9364 29.4496 31.8329 29.9394 31.62 30.3849C31.431 30.7554 31.1552 31.0745 30.8161 31.3152C30.4637 31.5586 30.0699 31.7359 29.654 31.8383C29.2151 31.9459 28.7649 32.0001 28.313 31.9998H24.8479V21.6257H27.8917ZM28.1304 25.8702C28.2968 25.8869 28.4647 25.8638 28.6204 25.8028C28.7761 25.7417 28.915 25.6445 29.0256 25.5191C29.2153 25.2849 29.3171 24.9919 29.3135 24.6906C29.3247 24.5381 29.2986 24.3852 29.2374 24.2452C29.1762 24.1051 29.0819 23.982 28.9624 23.8866C28.6837 23.6898 28.3486 23.5888 28.0075 23.5987H26.8911V25.8702H28.1304ZM28.2006 30.083C28.4779 30.0874 28.7541 30.0471 29.0186 29.9636C29.2453 29.8961 29.4468 29.7629 29.5979 29.581C29.7429 29.3949 29.8175 29.1637 29.8085 28.928C29.8203 28.7996 29.8038 28.6701 29.7601 28.5488C29.7165 28.4275 29.6467 28.3172 29.5557 28.2258C29.3687 28.063 29.1424 27.9517 28.8992 27.9029C28.624 27.84 28.3425 27.8093 28.0602 27.8116H26.8911V30.0654L28.2006 30.083Z" fill="#5C56D4"></path><path d="M36.0823 28.7876L32.2732 21.6258H34.7974L37.4866 27.0112L36.8792 27.0534L39.5052 21.6258H42.0259L38.1361 28.7876V32.014H36.0823V28.7876Z" fill="#5C56D4"></path></g><defs><clipPath id="clip0_423:1030"><rect width="119.48" height="32" fill="white" transform="translate(24.8479)"></rect></clipPath></defs></svg>
              </div>
              {console.log(windowSize.width <= 719 ? windowSize.width : 0)}
              <div className='title-heading-sign-in line-margin-small mb-20' style={{ marginTop: "0px" }}>Sign In for Exponential Growth </div>
              <div className='row flex-1 column'>
                <form
                  onSubmit={
                    signInData.step <= 1
                      ? e => {
                        props.onSignInSubmit(e)
                      }
                      : signInData.step == 2 && !signInData.loading
                        ? e => {
                          e.preventDefault()
                          props.signIn()
                        }
                        : e => {
                          e.preventDefault()
                        }
                  }

                  className='signin_process'
                >
                  <div className='details'>
                    <CustomInput
                      autoFocus={true}
                      disabled={(signInData.step > 0 || signInData.phoneNo?.length === 10) ? true : false}
                      type='number'
                      value={signInData.phoneNo}
                      external_element={
                        signInData.step > 0 ?
                          <div className="open-eye center df pointer" onClick={(e) => { props.dispatchSignInDetails(refresh_sign_in_data()); props.setDropDownData([]) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <g clipPath="url(#clip0_1047_13902)">
                                <path d="M17.5231 3.21991L20.8607 6.55745C21.022 6.71874 21.1126 6.93748 21.1126 7.16557C21.1126 7.39365 21.022 7.6124 20.8607 7.77368L18.7959 9.83843C18.7832 9.86253 18.7649 9.88322 18.7425 9.89876C18.7201 9.91429 18.6943 9.9242 18.6672 9.92767C18.6402 9.93114 18.6127 9.92805 18.5871 9.91867C18.5615 9.90929 18.5386 9.8939 18.5202 9.87379L14.2068 5.56043C14.1867 5.54204 14.1713 5.51907 14.1619 5.49348C14.1525 5.46788 14.1495 5.44041 14.1529 5.41337C14.1564 5.38634 14.1663 5.36053 14.1818 5.33813C14.1974 5.31573 14.2181 5.29739 14.2422 5.28466L16.3069 3.21991C16.4682 3.05863 16.6869 2.96802 16.915 2.96802C17.1431 2.96802 17.3619 3.05863 17.5231 3.21991V3.21991Z" fill="#5C56D4" />
                                <path d="M9.37732 19.1152L5.65087 19.0092C5.49945 19.0018 5.35618 18.9384 5.24899 18.8312C5.1418 18.724 5.07836 18.5808 5.07104 18.4293L4.96497 14.7029C4.96132 14.6612 4.96705 14.6193 4.98173 14.5801C4.99641 14.541 5.01968 14.5056 5.04983 14.4766L12.6724 6.85401C12.7306 6.79587 12.8094 6.76321 12.8916 6.76321C12.9739 6.76321 13.0527 6.79587 13.1108 6.85401L17.2262 10.9694C17.2843 11.0275 17.317 11.1064 17.317 11.1886C17.317 11.2708 17.2843 11.3496 17.2262 11.4078L9.62481 19.0092C9.59579 19.0462 9.55791 19.0754 9.51465 19.0939C9.47139 19.1124 9.42416 19.1198 9.37732 19.1152Z" fill="#5C56D4" />
                              </g>
                            </svg>
                          </div> : null}
                      name='number'
                      title='Mobile Number'
                      placeholder='Enter Number'
                      onChange={e => {
                        if (signInData.step <= 0 && e.target.value.length <= 10) {
                          props.dispatchSignInDetails(setPhoneNo(e.target.value))
                        }

                      }

                      }
                      onBlur={e => { }}
                    />
                    {signInData.step <= 0 && <div className='no-otp  row df resend-btn' style={{ justifyContent: "flex-start", fontWeight: "normal", alignItems: "center", display: props.iserr ? "" : "none" }}>
                      {props.errors}
                    </div>}
                    <div id='recaptcha-container'></div>

                    {signInData.step >= 1 && (
                      <div className='otp df row line-margin column' >
                        {/* <div className='otp_title'>Enter OTP</div> */}
                        {/* <div className='otp_sent'>
                        OTP sent on +91 {signInData.phoneNo}
                      </div> */}
                        <CustomInput
                          autoFocus={true}
                          disabled={signInData.step > 1 ? true : false}
                          type='otp'
                          key={signInData.step > 1 ? 1 : 2}
                          value={signInData.otp}
                          // error= {props.signin.numbererr}
                          name='otp'
                          title='Enter OTP'
                          placeholder={'OTP sent on +91 ' + signInData.phoneNo}
                          onChange={e => {

                            if (signInData.step == 1 && e.target.value.length <= 4) {

                              props.dispatchSignInDetails(setOTP(e.target.value))
                            }
                            if (e.target.value.length == 4) {
                              if (e.target) { e.target.blur(); }
                            }
                          }}

                          onBlur={e => {
                            // props.setLoginDetails({...props.loginDetails,emailErr:props.validate(e.target.value,{required:true,email:true},"Email").message})
                          }}
                        />
                        {signInData.step == 1 && <div className='no-otp  row df resend-btn' style={{ justifyContent: "flex-start", fontWeight: "normal", alignItems: "center", display: props.iserr ? "" : "none" }}>
                          {props.errors}
                        </div>}
                        {signInData.step == 1 && (
                          <div className='no-otp line-margin-small row df resend-btn' style={{ justifyContent: "flex-end", fontWeight: "normal", alignItems: "center", marginTop: props.iserr ? "0px" : "" }}>
                            Didn't recieve it?&nbsp;
                            <button

                              className='txt-primary txt-large df '
                              id='sign-in-button'
                              key={props.elementRefreshKey}
                              style={{
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: 'inherit',
                                // lineHeight: '22px'
                              }}
                              onClick={e => {
                                if (signInData.step == 1) {
                                  props.onSignInSubmit(e)
                                }
                              }}
                            >
                              Resend OTP
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {signInData.step >= 2 &&
                      props.dropDownData &&
                      props.dropDownData.length > 0 && (
                        <>
                          {props.showDrop == 1 && (
                            <div className='popUpGrayArea'>
                              <div
                                className='grayArea'
                                onClick={e => {
                                  props.showDrops(!props.showDrop)
                                }}
                              ></div>
                            </div>
                          )}
                          <div
                            className={
                              props.error && props.error != ''
                                ? 'form_field row error dropdown'
                                : 'form_field row dropdown'
                            }
                            style={props.showDrop == 1 ? { border: "1px solid #5c56d4" } : {}}
                          >
                            <label
                              htmlFor=''
                              className={
                                props.error && props.error != ''
                                  ? 'txt-medium txt-danger'
                                  : 'txt-medium txt-gray'
                              }
                              style={props.showDrop == 1 ? { color: " #5c56d4" } : {}}
                            >
                              Full Name
                            </label>

                            <div
                              className='df row-center fit-content'
                              style={{
                                flexDirection: 'row',
                                cursor: 'pointer',
                                position: 'relative'
                              }}
                              onClick={e => {
                                props.showDrops(true)
                              }}
                            >
                              <div
                                className='innerdf df row-center fit-content'
                                style={{
                                  flexDirection: 'row',
                                  cursor: 'pointer',
                                  position: 'absolute',
                                  top: 0,
                                  width: "100%"
                                }}
                                onClick={e => {
                                  props.showDrops(true)
                                }}
                              ></div>

                              <input
                                type='text'
                                disabled={true}
                                value={signInData.selctedUser.name}
                                placeholder='Select Name'
                                style={{
                                  cursor: 'pointer',
                                  color: "#000"
                                }}
                                className='df row-center radius-primary txt-medium  fit-content flex-1'
                              />
                              <div
                                className='showMore'
                                onClick={e => {
                                  props.showDrops(true)
                                }}
                              >
                                <svg
                                  width='12'
                                  height='8'
                                  viewBox='0 0 12 8'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M10.9997 1.1697C10.8123 0.983448 10.5589 0.878906 10.2947 0.878906C10.0305 0.878906 9.77707 0.983448 9.5897 1.1697L5.9997 4.7097L2.4597 1.1697C2.27234 0.983448 2.01889 0.878906 1.7547 0.878906C1.49052 0.878906 1.23707 0.983448 1.0497 1.1697C0.955976 1.26266 0.881582 1.37326 0.830813 1.49512C0.780044 1.61698 0.753906 1.74769 0.753906 1.8797C0.753906 2.01171 0.780044 2.14242 0.830813 2.26428C0.881582 2.38613 0.955976 2.49674 1.0497 2.5897L5.2897 6.8297C5.38267 6.92343 5.49327 6.99782 5.61513 7.04859C5.73699 7.09936 5.86769 7.1255 5.9997 7.1255C6.13172 7.1255 6.26242 7.09936 6.38428 7.04859C6.50614 6.99782 6.61674 6.92343 6.7097 6.8297L10.9997 2.5897C11.0934 2.49674 11.1678 2.38613 11.2186 2.26428C11.2694 2.14242 11.2955 2.01171 11.2955 1.8797C11.2955 1.74769 11.2694 1.61698 11.2186 1.49512C11.1678 1.37326 11.0934 1.26266 10.9997 1.1697Z'
                                    fill='#5c56d4'
                                  />
                                </svg>
                              </div>
                            </div>
                            {props.showDrop == 1 && (
                              <div
                                className='drop_list df'
                                style={{
                                  flexDirection: 'column'
                                }}
                              >
                                <div
                                  className='drop_list_inner'
                                  style={{ fontWeight: 400 }}
                                >
                                  {props.dropDownData &&
                                    props.dropDownData.length > 0 &&
                                    props.dropDownData.map(function (
                                      data,
                                      keyIndex
                                    ) {
                                      return (
                                        <div
                                          className='drop-item row'
                                          key={keyIndex}
                                          onClick={() => {
                                            props.dispatchSignInDetails(

                                              setSelctedUser(data.uuid, data.full_name, data.username, data.associated_school)
                                            )
                                            props.showDrops(false)
                                          }}
                                        >
                                          {data.full_name} ({data.username})
                                        </div>
                                      )
                                    })}

                                  {props.dropDownData &&
                                    props.dropDownData.length == 0 && (
                                      <span
                                        className='txt-medium txt-secondary'
                                        style={{
                                          alignItems: 'center',
                                          padding: '0px 24px'
                                        }}
                                      >
                                        No user found for this Phone no. Please
                                        add new user.
                                      </span>
                                    )}

                                  {signInData.loading && signInData.step == 2 && (
                                    <div className='row center df'>
                                      <img
                                        src={Small_loader}
                                        style={{
                                          width: '40px',
                                          height: '40px'
                                        }}
                                        className='fit-content'
                                        alt=''
                                      />
                                    </div>
                                  )}
                                </div>
                                {!signInData.loading && (
                                  <div
                                    className='row df space-between'
                                    style={{
                                      alignItems: 'center',
                                      padding: '0px 24px'
                                    }}
                                  >
                                    {/* <input
                                    type='text'
                                    placeholder='Others'
                                    value={props.newUser}
                                    onChange={e => {
                                      props.setnewUser(e.target.value)
                                    }}
                                    name='otherName'
                                    id='otherName'
                                  />
                                  <button
                                    onClick={
                                      props.newUser != ''
                                        ? props.addUser
                                        : () => { }
                                    }
                                    className='add_btn'
                                    style={
                                      props.newUser != ''
                                        ? {}
                                        : {
                                          cursor: 'not-allowed'
                                        }
                                    }
                                  >
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='24'
                                      height='24'
                                      viewBox='0 0 24 24'
                                      fill='none'
                                    >
                                      <path
                                        d='M12.9966 11.0037L13.0037 4.92968C13.0037 4.66338 12.8979 4.40798 12.7096 4.21968C12.5213 4.03138 12.2659 3.92559 11.9996 3.92559C11.7333 3.92559 11.4779 4.03137 11.2896 4.21968C11.1013 4.40798 10.9955 4.66338 10.9955 4.92968L11.0026 11.0037L4.92853 10.9967C4.66223 10.9967 4.40683 11.1024 4.21853 11.2907C4.03023 11.479 3.92444 11.7344 3.92444 12.0007C3.92444 12.267 4.03023 12.5224 4.21853 12.7107C4.40683 12.8991 4.66223 13.0048 4.92853 13.0048L11.0026 12.9978L10.9955 19.0718C10.995 19.2038 11.0206 19.3346 11.0708 19.4567C11.1211 19.5788 11.195 19.6897 11.2884 19.783C11.3817 19.8764 11.4926 19.9503 11.6147 20.0006C11.7368 20.0508 11.8676 20.0764 11.9996 20.0759C12.1316 20.0764 12.2624 20.0508 12.3845 20.0006C12.5066 19.9503 12.6175 19.8764 12.7108 19.783C12.8042 19.6897 12.8781 19.5788 12.9284 19.4567C12.9786 19.3346 13.0042 19.2038 13.0037 19.0718L12.9966 12.9978L19.0707 13.0048C19.2027 13.0054 19.3335 12.9798 19.4556 12.9295C19.5776 12.8792 19.6885 12.8053 19.7819 12.712C19.8752 12.6186 19.9492 12.5077 19.9994 12.3856C20.0497 12.2636 20.0753 12.1328 20.0748 12.0007C20.0753 11.8687 20.0497 11.7379 19.9994 11.6159C19.9492 11.4938 19.8752 11.3829 19.7819 11.2895C19.6885 11.1962 19.5776 11.1223 19.4556 11.072C19.3335 11.0217 19.2027 10.9961 19.0707 10.9967L12.9966 11.0037Z'
                                        fill={
                                          props.newUser != ''
                                            ? '#5C56D4'
                                            : '#777777'
                                        }
                                      />
                                    </svg>
                                  </button> */}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </>
                      )}

                    {signInData.step >= 2 &&
                      props.dropDownData &&
                      props.dropDownData.length <= 0 && (
                        <div
                          className={
                            props.error && props.error != ''
                              ? 'form_field row error dropdown'
                              : 'form_field row dropdown'
                          }
                        >
                          <label
                            htmlFor=''
                            className={
                              props.error && props.error != ''
                                ? 'txt-medium txt-danger'
                                : 'txt-medium txt-secondary'
                            }
                          >

                          </label>

                          <div
                            className='df row-center fit-content'
                            style={{
                              flexDirection: 'row'
                            }}
                          >
                            <input
                              type='text'

                              disabled={false}
                              value={props.newUser}
                              onChange={e => {
                                props.setnewUser(e.target.value)
                              }}

                              placeholder='Write Full Name'
                              className='df row-center radius-primary txt-medium fit-content flex-1'
                            />

                          </div>
                        </div>
                      )}

                    {signInData.step >= 2 && !(signInData.selctedUser.pathshala && signInData.selctedUser.pathshala != '') &&
                      <div className={

                        ' line-margin row '
                      }>
                        <DropDown
                          title="Pathshala"
                          value={signInData.pathshala}
                          onClick={(selected_name) => {
                            props.dispatchSignInDetails(setPathshala(selected_name))
                          }}
                          data={props.PathShalDropDownData}
                          index_name={"school_name"}

                        />
                      </div>
                    }
                    {signInData.step >= 2 && <div className='no-otp  row df resend-btn' style={{ justifyContent: "flex-start", fontWeight: "normal", alignItems: "center", display: props.iserr ? "" : "none" }}>
                      {props.errors}
                    </div>}

                    {signInData.loading && (
                      <div className='row center df'>
                        <img
                          src={Small_loader}
                          style={{
                            width: '40px',
                            height: '40px'
                          }}
                          className='fit-content'
                          alt=''
                        />
                      </div>
                    )}
                  </div>
                  {signInData.step == 0 && (
                    <button
                      id='sign-in-button'
                      className={
                        !signInData.loading && signInData.phoneNo.length == 10 && signInData.phoneNo >= 0
                          ? 'btn-primary df btn row center login_btn'
                          : 'btn-primary df btn row center login_btn register_disabled'
                      }
                    >
                      Send OTP
                    </button>
                  )}

                  {signInData.step == 1 && (
                    <div
                      style={{ cursor: 'pointer' }}
                      className={
                        !signInData.loading && signInData.otp && signInData.otp.length > 0
                          ? 'btn-primary btn df center row login_btn'
                          : 'btn-primary row df btn center login_btn register_disabled'
                      }
                      onClick={!signInData.loading && signInData.otp && signInData.otp.length > 0 ? props.verifyOTP : () => { }}
                    >
                      Verify OTP
                    </div>
                  )}

                  {signInData.step > 1 &&
                    props.dropDownData &&
                    props.dropDownData.length > 0 && (
                      <button
                        className={
                          !signInData.loading &&
                            signInData.selctedUser.uuid.trim() != ''
                            ? 'btn-primary df btn row center login_btn'
                            : 'btn-primary df btn row center login_btn register_disabled'
                        }
                        onClick={!signInData.loading ? props.signIn : () => { }}
                      >
                        Let's Go!
                      </button>
                    )}
                  {signInData.step == 2 &&
                    props.dropDownData &&
                    props.dropDownData.length <= 0 && (
                      <button
                        className={
                          !signInData.loading && props.newUser.trim() != ''
                            ? 'btn-primary df btn center row login_btn'
                            : 'btn-primary df btn row center login_btn register_disabled'
                        }
                        onClick={
                          !signInData.loading
                            ? props.createUserAndSignIn
                            : () => { }
                        }
                      >
                        Let's Go!
                      </button>
                    )}
                </form>
              </div>
            </>
          )}
          <div className='row m-v-primary df center pointer' style={{ marginBottom: "0px" }}>
            <a className='txt-primary typo-sub-headings center underline pointer' onClick={() => { props.stepChange(2) }} style={{ textDecoration: "underline", cusror: "pointer" }}>Signin with username and password</a>
          </div>
        </div>
      </div>
    </>
  )
}
export default Register
