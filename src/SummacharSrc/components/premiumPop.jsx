import React, { useContext, useEffect, useState } from 'react'
import { isApp, openLink, premiumInt } from "../common/helper";
import "../assets/css/enquirenow.css";

import {
  useHistory,
  useLocation,
  useRouteMatch,
  useParams,
} from "react-router";
import { Store } from "../App";
import { Box, Modal } from '@mui/material';

const PremiumPopUp = Props => {

  const user = useContext(Store).user;
  const history = useHistory();
  const location = useLocation();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,

  });
  const onResize = () => {
    let height = window.innerHeight;
    let width = window.innerWidth;

    setWindowSize({ width: width, height: height });

  };

  const [show, which] = useState(0);
  const callMe = () => {
    premiumInt("/inquiry_from_popup");
    which(1);
  }

  const buyNow = () => {
    premiumInt("/buy_now");
    history.push("/pricing");
  }

  const enquire = () => {
    premiumInt("/inquiry_from_popup");
    window.open('tel:91-988-067-8169');
  }

  useEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      return window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <Modal
      open={true}

      onClose={() => {
        if (Props.changeVisibility) {
          Props.changeVisibility(false)
        } else if (Props.onClosePopUp) {
          Props.onClosePopUp()
        }
      }}
      classes={'df center'}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        className='fit-content row center df '

      >

        <div
          className=' fit-content '
          style={{ position: "absolute", top: "0px", left: "0px", zIndex: 0 }}
          onClick={() => {
            if (Props.changeVisibility) {
              Props.changeVisibility(false)
            } else if (Props.onClosePopUp) {
              Props.onClosePopUp()
            }
          }}
        ></div>

        <div className='p-relative radius-primary df row innerPopUp pop-up-animation'>
          {Props.heading != "ONLY_TEXT" && <h1 className='txt-extraalarge' style={{ color: '#000' }}>
            {Props.heading ?? ''}
          </h1>}
          <p className='txt-medium txt-secondary' style={{ margin: '5px 0px' }}>
            {show == 0 && Props.description ? Props.description : "We will call you within 24 hours!"}
          </p>
          <div className="df row center">

            {show == 0 && Props.heading != "ONLY_TEXT" && !(user.data.subject_list && user.data.subject_list.length >= 2) &&
              <>
                {!isApp() && location.pathname !== "/academics" && <button className="typo-btn-primary btn-primary radius-primary m-v-primary" style={{ marginBottom: "0px" }} onClick={() => callMe()} >
                  Call Me
                </button>}
                {!isApp() && location.pathname === "/academics" && <button className="typo-btn-primary btn-primary radius-primary m-v-primary" style={{ marginBottom: "0px" }} onClick={() =>{ premiumInt("/inquiry_from_academics"); which(1);}   } >
                  Call Me
                </button>}
                {
                  isApp() &&
                  <a onClick={() => { openLink() }} className='typo-btn-primary btn-primary radius-primary m-v-primary' style={{ marginBottom: "0px" }}>Call Us</a>
                }
                <button className="typo-btn-primary btn-primary radius-primary m-v-primary" style={{ marginBottom: "0px" }} onClick={() => buyNow()}>
                  Buy Now
                </button>
              </>
            }
            {show == 0 && location.pathname.search("search") !== -1 &&
              <>
                {!isApp() && <button className="typo-btn-primary btn-primary radius-primary m-v-primary" style={{ marginBottom: "0px" }} onClick={() => callMe()} >
                  Call Me
                </button>}
                {
                  isApp() &&
                  <a onClick={() => { openLink() }} className='typo-btn-primary btn-primary radius-primary m-v-primary' style={{ marginBottom: "0px" }}>Call Us</a>
                }
                <button className="typo-btn-primary btn-primary radius-primary m-v-primary" style={{ marginBottom: "0px" }} onClick={() => buyNow()}>
                  Buy Now
                </button>
              </>
            }
            {/* {isApp() && show == 0 && !(user.data.subject_list && user.data.subject_list.length >= 2) &&
              <button className="typo-btn-primary btn-primary radius-primary m-v-primary" style={{ marginBottom: "0px" }} onClick={() => enquire()}>
                Enquire&nbsp;Now

              </button>
            } */}
          </div>
        </div>
      </div>

    </Modal>
  )
}
export default PremiumPopUp
