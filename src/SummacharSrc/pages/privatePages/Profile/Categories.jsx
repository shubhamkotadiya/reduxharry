import { useState } from "react"
import "../../../assets/css/Categories.css"
import RemoveFromSel from "../../../controllers/CategoriesController"
 import loader from "../../../assets/images/common/loader_dots.gif"

const CategoriesPage = (props) => {
    

   const [smallLoading, setSmallLoading]=useState(false)
    const [save, setSave]=useState(false)
    const [cancel,setCancel]=useState(false)

        
    const saveCate=async()=>{
        setSave(true)
        await props.SaveCate()
        setSave(false)
    }
    const cancelCate= async ()=>{
        setCancel(true)
        await props.CancelCate()
        setCancel(false)
    }

    return(
        <>
 <div className="outer_categories">
<div className="categories">

   <div className="title"><b>Categories you are interested in</b></div>
   <div className="category">
    <div className="selected">
      {
          
         props.selected.map(function (data, keyIndex) {
         
            return(    
            <div className="tag sel" key={keyIndex} onClick={(e)=>{props.RemoveFromSel(keyIndex)}} >
                {data}
            </div>
       
        )
      })
    }
    </div>
    <div className="unselected">
    {
       props.desel.map(function (desels, keyIndex) {
        return( 
     
            <div className="tag" key={keyIndex} onClick={(e)=>{props.AddToSel(keyIndex)}}>
               {desels}
            </div>
       
        )
        })}  
        </div>


</div>



</div>
<div className="btns">
    
    {save && <div className="dots category_btn" onClick={(e)=>{saveCate()}}>
        <img className="small_load" src={loader}></img>
    </div>}
    {!save && <div className="save category_btn" onClick={(e)=>{saveCate()}}>
        Save
    </div>}
    {cancel && <div className="dots_cancel category_btn" onClick={(e)=>{cancelCate()}}>
        <img className="small_load" src={loader}></img>
    </div>}
    {!cancel &&    <div className="cancel category_btn" onClick={(e)=>{cancelCate()}}>
       Cancel
    </div>}
  
</div>
</div>

        </>
    )}
    export default CategoriesPage;