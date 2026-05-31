import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/Auth/NavBar";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navigation  />
      <main className="container">  
        <Outlet />
      </main>
    </>
  );
};

export default App;