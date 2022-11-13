const NavRoundedCorner = (Props)=>{
    if(Props.show){
        return (
            <>
                {
                    Props.type==="upper" && 
                    <div className="upper_rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0 28C15.464 28 28 15.464 28 0V28H0Z" fill="white"/>
                        </svg>
                    </div>
                }
                {
                    Props.type==="lower" && 
                    <div className="lower_rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0 0C15.464 0 28 12.536 28 28V0H0Z" fill="white"/>
                    </svg>
                    </div>
                }
            </>
        )
    }else{
        return (
            <>                
            </>
        )
    }
    
}
export default NavRoundedCorner;