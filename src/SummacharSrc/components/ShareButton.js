import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton
} from "react-share";
import {
    EmailIcon,
    FacebookIcon,
    HatenaIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WhatsappIcon,
    WorkplaceIcon
} from "react-share";
import { Grid } from '@material-ui/core'
import { useState } from "react";
const ShareButton = (props) => {
    const [showOption, setShowOption] = useState(false)
    return (
        <>
            <button className="p-primary pointer" style={{ paddingTop: "0px" }} onClick={() => { setShowOption(true) }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 30 30" width="30px" height="30px"><path d="M 23 3 A 4 4 0 0 0 19 7 A 4 4 0 0 0 19.09375 7.8359375 L 10.011719 12.376953 A 4 4 0 0 0 7 11 A 4 4 0 0 0 3 15 A 4 4 0 0 0 7 19 A 4 4 0 0 0 10.013672 17.625 L 19.089844 22.164062 A 4 4 0 0 0 19 23 A 4 4 0 0 0 23 27 A 4 4 0 0 0 27 23 A 4 4 0 0 0 23 19 A 4 4 0 0 0 19.986328 20.375 L 10.910156 15.835938 A 4 4 0 0 0 11 15 A 4 4 0 0 0 10.90625 14.166016 L 19.988281 9.625 A 4 4 0 0 0 23 11 A 4 4 0 0 0 27 7 A 4 4 0 0 0 23 3 z" /></svg>
            </button>
            {showOption && <div className="grayarea fit-content" style={{ position: "fixed", background: "rgba(0,0,0,.7)", top: "0px", left: "0px", zIndex: '99999999999999999999999999999999999999999999' }} onClick={() => { setShowOption(false) }}>

            </div>}
            {showOption && <div className="row card p-primary" style={{ transition: "all 0.2s linear", transform: showOption ? "translateY(0%)" : "translate(-100%)", borderTop: "1px solid gray", backgroundColor: "white", position: "fixed", bottom: "0px", left: "0px", zIndex: '999999999999999999999999999999999999999999999' }}>
                <Grid container spacing={2}>
                    <Grid container item xs={2} md={1} className="pointer df center" >
                        <EmailShareButton onClick={() => { setShowOption(false) }} url={props.url}>
                            <EmailIcon size={40} round={true}></EmailIcon>
                        </EmailShareButton>
                    </Grid>
                    <Grid container item xs={2} md={1} className="pointer df center" >
                        <FacebookShareButton onClick={() => { setShowOption(false) }} url={props.url}>
                            <FacebookIcon size={40} round={true}></FacebookIcon>
                        </FacebookShareButton>
                    </Grid>
                    <Grid container item xs={2} md={1} className="pointer df center" >
                        <HatenaShareButton onClick={() => { setShowOption(false) }} url={props.url}>
                            <HatenaIcon size={40} round={true}></HatenaIcon>
                        </HatenaShareButton>
                    </Grid>
                    <Grid container item xs={2} md={1} className="pointer df center" >
                        <InstapaperShareButton onClick={() => { setShowOption(false) }} url={props.url}>
                            <InstapaperIcon size={40} round={true}></InstapaperIcon>
                        </InstapaperShareButton>
                    </Grid>
                    <Grid container item xs={2} md={1} className="pointer df center" >
                        <LineShareButton onClick={() => { setShowOption(false) }} url={props.url}>
                            <LineIcon size={40} round={true}></LineIcon>
                        </LineShareButton>
                    </Grid>
                    <Grid container item xs={2} md={1} className="pointer df center" >
                        <LinkedinShareButton onClick={() => { setShowOption(false) }} url={props.url}>
                            <LinkedinIcon size={40} round={true}></LinkedinIcon>
                        </LinkedinShareButton>
                    </Grid>
                    <Grid container item xs={2} md={1} className="pointer df center" >
                        <LivejournalShareButton onClick={() => { setShowOption(false) }} url={props.url}>
                            <LivejournalIcon size={40} round={true}></LivejournalIcon>
                        </LivejournalShareButton>
                    </Grid>
                    <Grid container item xs={2} md={1} className="pointer df center" >
                        <MailruShareButton onClick={() => { setShowOption(false) }} url={props.url}>
                            <MailruIcon size={40} round={true}></MailruIcon>
                        </MailruShareButton>
                    </Grid>
                    <Grid container item xs={2} md={1} className="pointe df centerr" >
                        <OKShareButton onClick={() => { setShowOption(false) }} url={props.url}>
                            <OKIcon size={40} round={true}></OKIcon>
                        </OKShareButton>
                    </Grid>
                    <Grid container item xs={2} md={1} className="pointer df center" >
                        <PinterestShareButton onClick={() => { setShowOption(false) }} url={props.url}>
                            <PinterestIcon size={40} round={true}></PinterestIcon>
                        </PinterestShareButton>
                    </Grid>
                    <Grid container item xs={2} md={1} className="pointer df center" >
                        <PocketShareButton onClick={() => { setShowOption(false) }} url={props.url}>
                            <PocketIcon size={40} round={true}></PocketIcon>
                        </PocketShareButton>
                    </Grid>
                    <Grid container item xs={2} md={1} className="pointer df center" >
                        <RedditShareButton onClick={() => { setShowOption(false) }} url={props.url}>
                            <RedditIcon size={40} round={true}></RedditIcon>
                        </RedditShareButton>
                    </Grid>
                    <Grid container item xs={2} md={1} className="pointer df center" >
                        <TelegramShareButton onClick={() => { setShowOption(false) }} url={props.url}>
                            <TelegramIcon size={40} round={true}></TelegramIcon>
                        </TelegramShareButton>
                    </Grid>
                    <Grid container item xs={2} md={1} className="pointer df center" >
                        <TumblrShareButton onClick={() => { setShowOption(false) }} url={props.url}>
                            <TumblrIcon size={40} round={true}></TumblrIcon>
                        </TumblrShareButton>
                    </Grid>
                    <Grid container item xs={2} md={1} className="pointer df center" >
                        <TwitterShareButton onClick={() => { setShowOption(false) }} url={props.url}>
                            <TwitterIcon size={40} round={true}></TwitterIcon>
                        </TwitterShareButton>
                    </Grid>
                    <Grid container item xs={2} md={1} className="pointer df center" >
                        <ViberShareButton onClick={() => { setShowOption(false) }} url={props.url}>
                            <ViberIcon size={40} round={true}></ViberIcon>
                        </ViberShareButton>
                    </Grid>
                    <Grid container item xs={2} md={1} className="pointe df centerr" >
                        <VKShareButton onClick={() => { setShowOption(false) }} url={props.url}>
                            <VKIcon size={40} round={true}></VKIcon>
                        </VKShareButton>
                    </Grid>
                    <Grid container item xs={2} md={1} className="pointer df center" >
                        <WhatsappShareButton onClick={() => { setShowOption(false) }} url={props.url}>
                            <WhatsappIcon size={40} round={true}></WhatsappIcon>
                        </WhatsappShareButton>
                    </Grid>
                    <Grid container item xs={2} md={1} className="pointer df center" >
                        <WorkplaceShareButton onClick={() => { setShowOption(false) }} url={props.url}>
                            <WorkplaceIcon size={40} round={true}></WorkplaceIcon>
                        </WorkplaceShareButton>
                    </Grid>
                </Grid>
            </div>}
        </>
    )
}
export default ShareButton