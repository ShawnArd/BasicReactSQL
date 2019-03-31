const express = require('express');
const cors = require('cors');
const mysql = require('mysql')

const app = express();

const selectAllQuery = 'Select * from products';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'react_sql'

})

connection.connect(err => {
    if(err) return err;
    
});

app.use(cors());

app.get('/', (req, res ) => {
    res.send('go to /products')
});

app.get('/products/add', (req, res) => {
    const { name, price} = req.query
    const insertQuery = `INSERT INTO products (prod_name, prod_price) values ('${name}', '${price}')`;
    connection.query(insertQuery, (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            return res.send('successful')
        }
    });
});

app.get('/products', (req, res) => {
    connection.query(selectAllQuery, (err, results) => {
        if(err) { 
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });

})

app.listen(4000, () => {
    console.log('products listening on 4000')
});
