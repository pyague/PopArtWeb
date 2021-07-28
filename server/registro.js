const express= require('express')
const router = express.Router()
const bcrypt=require("bcrypt")
const crypto = require("crypto");

router.get("/patata", function(req, res){
    req.app.locals.db.collection("usuarios")
    .findOne({email:req.body.email}, function(err, data){
        if(err != null){
            res.send({error:true, contenido:err})
        }else{
            res.send({error: false, contenido:data})
        }
    })
})

router.post("/registro", function (req, res) {
    console.log(req.body.email)
    req.app.locals.db.collection("usuarios")
    .findOne({email: req.body.email}, function(error, datos){
        if(datos){
        res.send({mensaje:"Usuario ya registrado", nuevo:false, contenido:datos})
        }else{
          const saltYHash = creaPass(req.body.password)  
          req.app.locals.db.collection("usuarios")
            .insertOne(
                {
                    name: req.body.name,
                    surname: req.body.surname,
                    age: req.body.age,
                    location: req.body.location,
                    password: {
                      hash: saltYHash.hash,
                      salt: saltYHash.salt,
                    },
                    artist: req.body.artist,
                    email: req.body.email,
                    phone: req.body.phone
                  }, function (err, data) {
                if (err) {
                  res.send({ mensaje: "Ha habido un error. " + err });
                } else {
                  res.send({
                    nuevo: true,
                    mensaje: "Usuario registrado correctamente.",
                    datos:data
                  });
                }})
        }    
    })
})

/**
 *
 * @param {*} password -> Recibe el password a encriptar
 * @returns -> Objeto con las claves salt y hash resultantes.
 */

 function creaPass(password) {
  var salt = crypto.randomBytes(32).toString("hex");
  var genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
}

  
  module.exports= router