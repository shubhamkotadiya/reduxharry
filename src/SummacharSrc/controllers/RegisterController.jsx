import React, { useContext, useEffect, useState } from "react";
import { Store } from "../App";
import Register from "../pages/auth/Register";


const RegisterController = () => {


    const [showDrop,changeDrop]=useState(1)
    const [names,AddNames]=useState(["Janvi1103","Janvi123"])


    const showDrops=()=>{
       changeDrop(!showDrop)
    }
    return (
    <>
    <Register showDrop={showDrop}  names={names} showDrops={showDrops} selectedUser={selectedUser}></Register>
    </>
    )
}



export default RegisterController;