import axios from 'axios';

const API="http://localhost:5000";

export const getData=async(query,pageno)=>{
    try{
                if(query===""){
        const res = await axios.get(`${API}/getdata`, {
            params: { pageno }, 
        });
                return { data: res.data.data, totalPages:res.data.totalPages };}
        else{
            return searchq(query,pageno);
        }
    }
    catch(err){
            }
}
export const getDoc=async(id)=>{
    try{
        const res = await axios.get(`${API}/getdoc`, {
            params: { id }, 
        });
                return res.data;
    }
    catch(err){
            }
}
export const searchq=async(query,pageno)=>{
    try{
                if(query===""){
            getData(pageno);
        }
        else{
        const res = await axios.post(`${API}/search`, { query,pageno });
                return { data: res.data.data, totalPages:res.data.totalPages };}
    }
    catch(err){
            }
}