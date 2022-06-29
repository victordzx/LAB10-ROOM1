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

// ruta: /mascota/get/
app.get("/mascota/get", (req, res) => {

    let sql = "SELECT * FROM mascota";

    conn.query(sql, function (err, result) {
        if (err) {
            res.json({err: "Ocurrió un error"});
            console.error(err);
        } else {
            for (let i = 0; i < result.length; i++) {
                result[i]["índice"] = "número" + (i + 1);
            }
            res.json(result);
        }
    });
});

// ruta: /mascota/get/{id}
app.get("/mascota/get/:id", function (req, res){

    let mascotaid = req.params.id;
    let sql = "SELECT * FROM mascota WHERE idmascota = ?";
    let params = [mascotaid];

    conn.query(sql, params, function(err, results){
        if(err) throw err;
        res.json(results);
    });

});

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});