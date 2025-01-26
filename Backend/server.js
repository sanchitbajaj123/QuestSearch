const express = require('express');
const Product = require('./schema');
const cors = require('cors');

const Port = process.env.PORT || 5000;

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to Quest Search");
});

app.post('/search', async (req, res) => {
    try {
        const { query, pageno } = req.body;
        const lb = (pageno - 1) * 20;
        const limit = 20;

        const result = await Product.find({ title: new RegExp(query, 'i') })
            .skip(lb)
            .limit(limit);

        const totalDocs = await Product.countDocuments({ title: new RegExp(query, 'i') });
        const totalPages = Math.ceil(totalDocs / limit);

        res.send({ totalPages, data: result });
    } catch (e) {
        console.error('Error in search:', e);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/getdata', async (req, res) => {
    try {
        const { pageno } = req.query;
        const lb = (pageno - 1) * 20;
        const limit = 20;

        const data = await Product.find().skip(lb).limit(limit);
        const totalDocs = await Product.countDocuments();
        const totalPages = Math.ceil(totalDocs / limit);

        res.send({ data, totalPages });
    } catch (err) {
        console.error('Error in getdata:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/getdoc', async (req, res) => {
    try {
        const { id } = req.query;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.send(product);
    } catch (err) {
        console.error('Error in getdoc:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(Port, () => {
    console.log(`Server running on port ${Port}`);
});
