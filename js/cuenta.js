const express = require('express');
const mysql = require('mysql2');

const app = express();

let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sandylance'
});

conn.connect(function(err){
    if(err) throw err;
    console.log("Conexión exitosa a base de datos");
});
// ruta: /cuenta/get/
app.get("/cuenta/get/", function (req, res) {
    let sql = "select * from cuenta";
    conn.query(sql, function (err, result){
        res.json(result);
    });

});
// ruta: /cuenta/get/{id}
app.get("/cuenta/get/:id", function (req, res){
    let cuentaid = req.params.id;
    let sql = "SELECT * FROM cuenta WHERE idcuenta = ?";
    let params = [cuentaid];

    conn.query(sql, params, function (err, result){
        if(result.length == 0){
            res.json({err: "Ocurrió un error"});
            console.error(err);
        } else{
            res.json(result);
        }
    });
});
app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});
