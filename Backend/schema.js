const mon = require('mongoose');
require('dotenv').config();

mon.connect(process.env.URL,{
    serverSelectionTimeoutMS: 5000,
})
.then(() => console.log('Connected to database'))
.catch((err) => console.error('Error:', err));

const schema = mon.Schema;

const ProductSchema = new schema({
    type: String,
    anagramtype: String,
    blocks: [],
    siblingid: String,
    solution: String,
    title: String,
}, { timestamps: true });


const Product = mon.model('Product', ProductSchema, 'speakx'); 

module.exports = Product;
