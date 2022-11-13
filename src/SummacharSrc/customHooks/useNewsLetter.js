import axios from "axios";
import { setData } from "../actions/newsLetterAction";
import apiUrl from "../common/apiUrl";
import { getHeaders, getMaximumLatestStroy, getUserUuid } from "../common/helper";

const useNewsLetter = (state,newsLetterDispatch)=>{
    const getData = async(page_no)=>{
        return await axios({
            url:apiUrl.newsLetterUrl+"?user-uuid="+getUserUuid()+'&page='+page_no,
            method:"GET",
            headers:getHeaders()
        }).then(res=>{
            if(res.status==200 || res.status==201){
               return {status:true,code:res.status,data:res.data}
            }
        })
        .catch(error=>{
            return {status:false,code:error.response.status}
        })
    }
    return{
        data:state.data,
        next:state.next,
        pageNo:state.pageNo,
        currentTarget:state.currentTarget,
        setData:(data)=>{
            newsLetterDispatch(setData(data));
        },
        getData:async()=>{
            const response =  await getData(state.pageNo);
            if(response.status){
                const next = response.data.next;
                let pageNo = state.pageNo;
                if(next && next!=""){
                    pageNo += 1
                }
                let data = {...state.data};
                const comingData = response.data.results;
                let latestStrories = 0;
                if(data.latest && data.latest.length>0){
                    latestStrories = data['latest'].length;
                }
                for (let row of comingData){
                    if(latestStrories<getMaximumLatestStroy().newsletter){
                        if(!data.latest){
                            data['latest'] = {}
                        }
                        Object.assign(data.latest,{[row.slug] : row})    
                        latestStrories += 1;               
                    }else{
                        if(!data['older']){
                            data['older'] = {}
                        }
                        Object.assign(data['older'],{[row.slug] : row})
                    }

                }
                newsLetterDispatch(setData({data:data,pageNo:pageNo,next:next,currentTarget:""}));
            }
            
        },
        setCurrentTarget:(currentTarget)=>{
            newsLetterDispatch(setData({...state,currentTarget:currentTarget}))
        }
    }
}
export default useNewsLetter;