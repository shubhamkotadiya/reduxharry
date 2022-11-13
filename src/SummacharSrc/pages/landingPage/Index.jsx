import React from "react";
import '../../assets/css/LandingPage.css';
import NavBar from "./NavBar";
import Home from "./LandingPageHome";
import Footer from "./Footer";

const Index = () =>{
    return(
        <div className="wrapper_container">         
            <NavBar />
            <Home/>
            <main>

            </main>
            <Footer />
        </div>
        
    )
}
export default Index;

