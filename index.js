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
    con.query("Select * from Producto2",
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
    con.query("Select * from Producto2 where id=?", [id],
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
    const descripcion=req.body.descripcion;
    const nombre=req.body.nombre;
    const precio=req.body.precio;
    const cantidad=req.body.cantidad;
    const creado_en=req.body.creado_en;
    
    let sql="Insert into Producto2 (nombre,descripcion,precio,cantidad,creado_en) Values (?,?,?,?,?)"
    con.query(sql,[nombre,descripcion,precio,cantidad,creado_en],(err,result) =>{
        if(err){
            throw err;
        } else {
            res.status(200).json({});
        }
    });
} );



app.put('/producto/:id', (req,res) =>{
    let id=req.params.id ?? 0;
    const descripcion=req.body.descripcion;
    const nombre=req.body.nombre;
    const precio=req.body.precio;
    const cantidad=req.body.cantidad;
    const creado_en=req.body.creado_en;

    let sql="Update Producto2 set nombre = ?,descripcion = ?,precio = ?,cantidad = ?,creado_en = ? where id = ?";
    con.query(sql,[nombre,descripcion,precio,cantidad,creado_en,id],(err,result)=>{
        if(err){
            throw err;
        } else {
            res.status(200).json({});
        }
    });
});

app.delete('/producto/:id', (req,res) =>{
    const id=req.params.id ?? 0;
    
    let sqlDelete="Delete From Producto2 Where id = ?";
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

