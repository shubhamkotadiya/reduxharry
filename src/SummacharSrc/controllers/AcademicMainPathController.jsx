import { useContext } from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import { Store } from "../App";
import AcademicController from "./AcademicController";
import AcadSubController from "./AcademicSubMainController";
import AcadSubjectsController from "./AcademicSubjectsController";

const AcademicMainPathController = () => {
    const { path, url } = useRouteMatch()
    const user = useContext(Store).user.data;
    // console.log(user);
    return (
        <Switch>

            {user.user_type === "FREE_USER" && <Route path={path + "/"} component={AcadSubController} />}
            {user.user_type === "NEWS_USER" && <Route path={path + "/"} component={AcadSubController} />}
            {user.user_type === "ACAD_USER" && <><Route exact path={path + "/"} component={AcadSubController} />
                <Route path={path + "/:subject"}>
                    <AcadSubjectsController />
                </Route>
            </>
            }


        </Switch>

    )
}
export default AcademicMainPathController;