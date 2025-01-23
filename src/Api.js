import axios from 'axios';

const API="http://localhost:5000";

export const getData=async(pageno)=>{
    try{
        const res = await axios.get(`${API}/getdata`, {
            params: { pageno }, 
        });
        console.log('Data:',res.data);
        return res.data;
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