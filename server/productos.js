const express= require('express')
const router = express.Router()
const ObjectId= require("mongodb").ObjectId

router.get("/mostrar", function(req, res){ 
  let db=req.app.locals.db
  db.collection("productos").find().toArray(function(err, datos){
     if(err != null){  //este es a nivel comando
         res.send({error:true, mensaje:err}) //creo un objeto para el usuario vea el eror
     }else{
         if(datos.length > 0){ //si  da false es que se ha añadido ninguno
          res.send({error: false, datos: datos})
         }else{
             res.send({encontrado:false, mensaje: "No se han encontrado resultado"})
         }
     } 
  });
})

router.post("/anyadir", function(req, res){
   //cojo el objeto que he creado en el body del JS del front
   
   req.app.locals.db.collection("productos").insertOne(req.body, function(error, datos){
      if(error!=null){
          res.send({error:true, mensaje: error})
      }else{
            res.send({añadido:true, datos:datos})
      }
  });
})

router.post("/mostrar/personal", function(req, res){ 
  
  req.app.locals.db.collection("productos").find({ autor: req.body.autor }).toArray(function(err, datos){
     if(err != null){  //este es a nivel comando
         res.send({error:true, mensaje:err}) //creo un objeto para el usuario vea el error
     }else{
         if(datos.length > 0){ //si  da false es que se ha añadido ninguno
            
          res.send({error: false, datos: datos})
         }else{
             res.send({datos:datos, encontrado:false, mensaje: "No se han encontrado resultados"})
         }
     } 
  });
})

router.put("/modificar", function(req, res){
  //cojo el objeto que he creado en el body del JS del front
  let db=req.app.locals.db
  console.log(req.body)
  db.collection("productos").updateOne({_id: ObjectId(req.body._id)}, {$set: {nombre:req.body.nombre, etiquetas:req.body.etiquetas, descripcion:req.body.descripcion, precio:req.body.precio, entrega:req.body.entrega, img:req.body.img}}, function(error, datos){
     if(error!=null){
         res.send({error:true, mensaje: error})
     }else{
          if(datos.modifiedCount > 0){ //si  da true es que se ha añadido 
              res.send({modificado:true, datos:datos})
          }else{
              res.send({datos: datos, modificado:false, error:false, mensaje:"No se ha modificado correctamente"})
      }
     }
 });
})

router.delete("/eliminar", function(req, res){
  //cojo el objeto que he creado en el body del JS del front
  
  req.app.locals.db.collection("productos").deleteOne({ _id: ObjectId(req.body._id)}, function(error, datos){
     if(error!=null){
         res.send({error:true, mensaje: error})
     }else{
          if(datos.deletedCount > 0){ //si  da true es que se ha añadido 
              res.send({eliminado:true, datos:datos})
          }else{
              res.send({error: false, eliminado:false, mensaje:"No se ha eliminado correctamente"})
          }
     }
 });
})


module.exports=router;