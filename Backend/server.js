const exp=require('express')
const Product=require('./schema');
const cors=require('cors');
const Port=5000 || process.env.Port;

const app=exp();
app.use(cors());
app.use(exp.json());

let data = [];
const fun = async () => {
    data = await Product.find(); 
    console.log('Data:', data); 
};
fun(); 

app.get('/getdata',async(req,res)=>{
    try{
        const {pageno}=req.query;
        console.log('Page:',pageno);
        const lb=pageno*20;
        const ub=lb-20;
        res.send(data.slice(ub,lb));
    }
    catch(err){
        console.log(err);
    }
})
app.listen(Port,()=>{
console.log('Server started at port:',Port);
})