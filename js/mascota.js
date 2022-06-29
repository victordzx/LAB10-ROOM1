const express = require('express');
const mysql = require('mysql2');
const bp = require('body-parser');

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

// ruta: /mascota/create/
app.post('/mascota/create', bp.urlencoded({extended: true}), function (req, res) {

    let nombre = req.body.nombre;
    let anonac = req.body.anonac;
    let historia = req.body.historia;
    let observ = req.body.observ;
    let sexo = req.body.sexo;
    let especie = req.body.especie;
    let otros = req.body.otros;
    let cuenta = req.body.cuenta;

    let parametros = [nombre, anonac, historia, observ, sexo, especie, otros, cuenta];
    let query = "insert into mascota (nombre, anho, historia, observaciones, sexo, raza_especie_idraza, raza_otros, cuenta_idcuenta) VALUES (?,?,?,?,?,?,?,?)";

    conn.query(query, parametros, function (err, result) {
        if (err) throw err;

        conn.query("select * from mascota order by idmascota desc limit 1;", function (err, results) {
            res.json(results);
        });
    });
});

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});