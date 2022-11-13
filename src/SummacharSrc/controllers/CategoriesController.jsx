import React, { useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import CategoriesPage from "../pages/privatePages/Profile/Categories";
import apiUrl from "../common/apiUrl";
import { getHeaders, getMaximumLatestStroy, getUserUuid, handleError, isFromLastMonth, resetToken } from "../common/helper";


const CategoriesPageController = () => {
  
 
    const [selected, changeSel] = useState([]);
    const [desel, changeDesel] = useState([]);
    const [loading, setLoading] = useState(false);

    let tempSel=[];
    let tempDesel=[];
    const getData = async () => {
    
        return await axios({
            url: apiUrl.categoriesUrl + "?user-uuid="+getUserUuid(),
            method: "GET",
            headers: getHeaders()
        }).then(res => {
            
            if (res.status == 200 || res.status == 201) {
            
                for (let resp of res.data) {
                  
                    if (resp.added == true) {
                        tempSel.push(resp.name);
                       
                    }
                    else {
                        tempDesel.push(resp.name);
                    }

                }
                changeSel(tempSel)
                changeDesel(tempDesel)
                
            }
        })
            .catch(async (error)=> {
                if(error.length>0)
                  {
                      
                    if (error.response.status == 401) {
                        await resetToken();
                        await  getData();
                    } else{
                        handleError(error)
                    }
                }
            })
    }
 
    useEffect(async () => {
        if (selected.length==0 && desel.length==0) {
            setLoading(true)
            await getData();
            setLoading(false)
        }

    },[])
    const RemoveFromSel=(num)=>{
        tempSel=[...selected]
        tempDesel=[...desel]
        tempDesel.push(selected[num]);
        tempSel.splice(num, 1);
        changeSel(tempSel)
        changeDesel(tempDesel)
        
    }

    
    const AddToSel=(num)=>{
        tempSel=[...selected];
       
    
        tempDesel=[...desel]
        tempSel.push(desel[num]);
        tempDesel.splice(num, 1);

        changeSel(tempSel)
        changeDesel(tempDesel)

    }
    
    const SaveCate=async ()=>{
     
        return await axios({
            url: apiUrl.categoriesUrl + "?user-uuid="+getUserUuid() ,
            method: "POST",
            headers: getHeaders(),
            data : { "name": [...selected]}
        }).then(res => {
            
            if (res.status == 200 || res.status == 201) {
               return true;
               
            }
           
        })
            .catch( async (error) => {
                if(error.length>0)
                {
                    
                  if (error.response.status == 401) {
                      await resetToken();
                      await SaveCate();
                  } else {
                    handleError(error)
                    return false;
                  }
      
              }
               
            })

    }
    const CancelCate=async ()=>{
        tempSel=[];
        tempDesel=[];
        await getData();
    }

    return (
        <>
        {loading ? <Loader /> :<CategoriesPage selected={selected} desel={desel} RemoveFromSel={RemoveFromSel} AddToSel={AddToSel} SaveCate={SaveCate}  CancelCate={CancelCate} ></CategoriesPage>}
        </>
    )
}

export default CategoriesPageController;