const mon=require('mongoose');

mon.connect('mongodb://localhost:27017/assignment')
.then(()=>console.log('Connected to database'))
.catch((err)=>console.log('Error:',err));

const schema=mon.Schema;

const ProductSchema=new schema({
type:String,
anagramtype:String,
blocks:[],
siblingid:String,
solution:String,
title:String,
},{timestamps:true});


const Product=mon.model('Product',ProductSchema,'assignment');
module.exports=Product;