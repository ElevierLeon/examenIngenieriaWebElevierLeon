const express = require('express')
const app = express();
const port =3000;
app.use(express.json());

const mysql = require('mysql');

var con =mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "example",
    database: "Producto"
});

con.connect(function (err){
    if (err) throw err;
    console.log("Connected");
});



app.get('/producto', (req,res) => {
    con.query("Select * from Producto",
        function(err,result){
            if(err){
                throw err;
            }
            res.status(200).json(result);
        }
    );
});


app.get('/producto/:id', (req,res)=>{
    let id=req.params.id ?? 0;
    con.query("Select * from Producto where id=?", [id],
    function(err,result){
        if(err){
            throw err;
        }
        if(!!result && result.length>0){
            res.status(200).json(result);
        } else {
            res.status(400).json({});
        }

    });
} );


app.post('/producto', (req,res)=>{
    const marca=req.body.marca;
    const nombre=req.body.nombre;
    const precio=req.body.precio;
    
    let sql="Insert into Producto (marca,nombre,precio) Values (?,?,?)"
    con.query(sql,[marca,nombre,precio],(err,result) =>{
        if(err){
            throw err;
        } else {
            res.status(200).json({});
        }
    });
} );



app.put('/producto/:id', (req,res) =>{
    let id=req.params.id ?? 0;
    const marca=req.body.marca;
    const nombre=req.body.nombre;
    const precio=req.body.precio;

    let sql="Update Producto set marca = ?, nombre = ?, precio = ? where id = ?";
    con.query(sql,[marca,nombre,precio,id],(err,result)=>{
        if(err){
            throw err;
        } else {
            res.status(200).json({});
        }
    });
});

app.delete('/producto/:id', (req,res) =>{
    const id=req.params.id ?? 0;
    
    let sqlDelete="Delete From Producto Where id = ?";
    con.query(sqlDelete,[id], (err,result) =>{
        if(err){
            throw err;
        } else {
            res.status(200).json({});
        }
    });
});


app.listen(port,() => {
    console.log(`Example app listening on port ${port}`);
});

