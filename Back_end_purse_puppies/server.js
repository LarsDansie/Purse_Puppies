const express = require('express');
const app = express();
const user = require('./routes/user');
const port = process.env.PORT || 3001;
require('./configs/dotenv');
const  client = require('./configs/database');
const db = require('./products')
const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use('/user',  user);


app.get('/', (req, res) => {
    res.status(200).send('mmm mmm oven is prepped and ready to go');
})

app.get('/products', db.getProducts)

client.connect((err) => { 
    if (err) {
        console.log(err);
    }
    else {
        console.log('sheeesh we got the juicy data connection');}
});

app.listen(port, () => {
console.log(`oh boi, what's cookin' at ${port}?`);
})