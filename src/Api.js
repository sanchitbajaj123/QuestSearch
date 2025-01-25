import axios from 'axios';

const API="http://localhost:5000";

export const getData=async(query,pageno)=>{
    try{
        console.log('Query:',query);
        if(query===""){
        const res = await axios.get(`${API}/getdata`, {
            params: { pageno }, 
        });
        console.log('Data:',res.data);
        return { data: res.data.data, totalPages:res.data.totalPages };}
        else{
            return searchq(query,pageno);
        }
    }
    catch(err){
        console.log(err);
    }
}
export const getDoc=async(id)=>{
    try{
        const res = await axios.get(`${API}/getdoc`, {
            params: { id }, 
        });
        console.log('Doc:',res.data);
        return res.data;
    }
    catch(err){
        console.log(err);
    }
}
export const searchq=async(query,pageno)=>{
    try{
        console.log('Query:',query);
        if(query===""){
            getData(pageno);
        }
        else{
        const res = await axios.post(`${API}/search`, { query,pageno });
        console.log('Search:',res.data);
        return { data: res.data.data, totalPages:res.data.totalPages };}
    }
    catch(err){
        console.log(err);
    }
}