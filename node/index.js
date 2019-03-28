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
})

app.get('/products/add', (req, res) => {
    const { prod_name, prod_price} = req.query
    console.log(prod_name, prod_price);
    const insertQuery = `insert into products (prod_name, prod_price) values (${prod_name}, ${prod_price});`
    connection.query(insertQuery, (err, results) => {
        if(err) {
            return res.send(err);
        } else {
            return res.send('successful')
        }
    })
    res.send('adding product');
})

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
