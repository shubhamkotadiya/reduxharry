import axios from "axios";
import { setData } from "../actions/navigation";


const useNav = (state, navDispatch) => {
    
    const pass_obj = {
        nav: state.nav,
       
        setNav: (nav) => {
            navDispatch(setData(nav));
        },

        getNav: () => {
            return nav;
        }
    }
    return pass_obj;
}
export default useNav;