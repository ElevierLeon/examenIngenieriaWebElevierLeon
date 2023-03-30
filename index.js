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

app.listen(port,() => {
    console.log(`Example app listening on port ${port}`);
});

