const exp=require('express')
const Product=require('./schema');
const cors=require('cors');
const Port=5000 || process.env.Port;

const app=exp();
app.use(cors(
    {
        origin: 'https://quest-search-gilt.vercel.app/',
        methods: 'GET,POST,PUT,DELETE',
        credentials: true, 
      
}));
app.use(exp.json());

let data = [];
const fun = async () => {
    data = await Product.find(); 
};
fun(); 
app.get('/',(req,res)=>{
    res.send("Welcome to Quest Search")
})
app.post('/search',async(req,res)=>{
    try{
        const {query,pageno}=req.body;
                const result = data.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase())
          ); 
          const lb=pageno*20;
          const ub=lb-20;
          const totalPages = Math.ceil(result.length / 20);
        res.send({totalPages:totalPages
            ,data:result.slice(ub,lb)});
    } 
    catch(e){
        console.log(e)
    }
    })

app.get('/getdata',async(req,res)=>{
    try{
        const {pageno}=req.query;
                const lb=pageno*20;
        const ub=lb-20;
        const totalPages = Math.ceil(data.length / 20);
                res.send({data:data.slice(ub,lb),
            totalPages:totalPages
        });
    }
    catch(err){
            }
})
app.get('/getdoc',async(req,res)=>{
    try{consol
        const {id}=req.query;
                for(let i=0;i<data.length;i++){
            if(data[i]._id==id){
                res.send(data[i]);
                break;
            }
        }}
    catch(err){
            }})
app.listen(Port,()=>{
})