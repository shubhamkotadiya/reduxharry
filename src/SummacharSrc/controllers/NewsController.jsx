import { useContext, useEffect, useState } from "react";
import { BreadCrumbContext, Store } from "../App";
import { isFreeTrial, isFromLastMonth } from "../common/helper";
import NavBar from "../pages/privatePages/navbar/NavBar";
import NewsPage from "../pages/privatePages/news/NewsPage";
import "../../src/assets/css/NewsPage.css";
import "../../src/assets/css/commonImgDivs.css";
import "../../src/index.css";
import Loader from "../components/Loader";
import { Route, Switch, useHistory } from "react-router";
import NewsPopUpController from "./NewsPopUpController";

const NewsController = (props) => {
    const news = useContext(Store).news;
    const user = useContext(Store).user;
    const [loading, setLoading] = useState(false);
    const [scrollLoading, setScrollLoading] = useState(false);
    const onScroll = async () => {
        var height = document.getElementById("news_container").clientHeight;
        var fullheight = document.getElementById("news_container").scrollHeight;
        var scrollTop = document.getElementById("news_container").scrollTop;

        if (scrollTop + height > fullheight - 200) {
            if (!scrollLoading) {
                if ( news.next != null && news.next != "") {
                    setScrollLoading(true);

                    await news.getData();
                    setScrollLoading(false);
                }
            }
        }
    };
    const breadCrumb = useContext(BreadCrumbContext);
    useEffect(() => {
        breadCrumb.set(['News'])
    }, [])
    useEffect(async () => {

        if (!(news.data && Object.keys(news.data).length > 0)) {
            setLoading(true);
            if (user.data.user_type === "FREE_USER") {
                await news.getData("free_user")
            }
            await news.getData();
            setLoading(false);
        }
    }, []);
    const setTargetForPopUp = (target) => {
        news.setcurrentTarget(target);
    };
    return (
        <>
            <Switch>
                <Route exact path={`/${props.location.pathname.split("/")[1]}`} render={(props) => (loading ? <Loader /> : <NewsPage {...props} setTargetForPopUp={setTargetForPopUp} onScroll={onScroll} data={news.data} scrollLoading={scrollLoading} />)} />
                <Route exact path={`/${props.location.pathname.split("/")[1]}/:slug`} component={NewsPopUpController} />
                <Route exact path={`/${props.location.pathname.split("/")[1]}/:slug/:from_notification`} component={NewsPopUpController} />
            </Switch>
        </>
    );
};
export default NewsController;
