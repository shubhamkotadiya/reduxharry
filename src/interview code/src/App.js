import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Login, Signup } from "./view/authantication";
import Todo from "./view/todo/todo";
import Note from "./view/todo/note";
import Share from "./view/todo/share";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoute component={Login} />} />
          <Route path="/signup" element={<PublicRoute component={Signup} />} />
          <Route path="/todo" element={<PrivateRoute component={Todo} />} />
          <Route path="/add" element={<PrivateRoute component={Note} />} />
          <Route path="/edit" element={<PrivateRoute component={Note} />} />
          <Route path="/share" element={<PrivateRoute component={Share} />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={4000} />
    </>
  );
}

const PrivateRoute = ({ component: Component }) => {
  const auth = localStorage.getItem("loginUser");
  return auth ? <Component /> : <Navigate to="/" />;
}

const PublicRoute = ({ component: Component }) => {
  const auth = localStorage.getItem("loginUser");
  return !auth ? <Component /> : <Navigate to="/todo" />;
}


export default App;
