import NocertiacetGif from '../../../assets/images/no-certificate.gif'
const NoCertificateScreen = ()=>{
    return(
        <>
            <div className="row df  fit-content center column p-primary">
                <img src={NocertiacetGif} className='row m-v-primary' style={{maxWidth:"300px",maxHeight:"100%"}} alt="" />
                <h1 className='typo-title font-bold txt-gray ' >You can win certificates by participating in activities and quizzes on Pathshala!</h1>
            </div>
        </>
    )
}
export default NoCertificateScreen