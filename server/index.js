const express = require("express")
const MongoClient = require("mongodb").MongoClient;
const MongoStore = require("connect-mongo");
const app=express()
const crypto = require("crypto");
const cors=require("cors")
require("dotenv").config()

let puerto = process.env.PORT || 3001;


const passport=require("passport")
const LocalStrategy = require("passport-local").Strategy
const session = require("express-session")
const cookieParser = require("cookie-parser");

const usuarios=require("./registro");
const productos=require("./productos");

let feedback = {
  //provee de feedback específico sobre el fallo en la autentificación
  provider: true, // true = específico, false = genérico
  mensaje: "",
};
//servidor básico
app.use(
    cors({
      origin: "http://localhost:3000", //dirección de la app de React a la que nos conectamos
      credentials: true,
    })
  );
app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.use(
    session({
      secret: "secret1", //secreto de la sesion (se puede hacer dinámico),
      resave: false, //Evita el reseteo de la sesión con cada llamada
      saveUninitialized: false, //Evita crear sesiones vacías
      store: MongoStore.create({
        //Nos guarda las sesiones en la colección "sesiones" en la base de datos "prueba"
        mongoUrl: "mongodb+srv://usuario1:0258@cluster0.pqui5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        dbName: "popArtists",
        collectionName: "sesiones",
        ttl: 1000 * 60 * 60 * 24,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  );
  app.use(cookieParser("patata"));
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.use((req, res, next) => {
    console.log(req.session ? req.session : "No hay sesión");
    console.log(req.user ? req.user : "No hay usuario");
    next();
  });

//-----ROUTER-----

app.use("/usuarios", usuarios)
app.use("/productos", productos)

//Conexión BD
MongoClient.connect(process.env.MONGO_URL,
    {useNewUrlParser: true, useUnifiedTopology:true},
    function(error, client){ //control de errores
        error 
        ?(console.log("MongoDB no conectado"), console.log(error))
        :((app.locals.db=client.db("popArtists")), console.log("MongoDB conectado")) //Me conecto a la base de datos
    }
)

//------------------- Autorización y gestión de sesiones ----------

passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      function (email, password, done) {
        feedback.mensaje = "";
        app.locals.db.collection("usuarios").findOne({ email: email }, function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            feedback.provider
              ? (feedback.mensaje = "Usuario no registrado")
              : (feedback.mensaje = "Login erróneo");
            return done(null, false);
          }
          if (!validoPass(password, user.password.hash, user.password.salt)) {
            console.log(user)
            console.log(password)
            console.log(user.password.hash)
            feedback.provider
              ? (feedback.mensaje = "Password incorrecto")
              : (feedback.mensaje = "Login erróneo");
            return done(null, false);
          }
          feedback.mensaje = "Login correcto";
          return done(null, user);
        });
      }
    )
  );
  
  passport.serializeUser(function (user, done) {
    console.log("-> Serialize");
    done(null, user);
  });
  
  passport.deserializeUser(function (user, done) {
    console.log("-> Deserialize");
    app.locals.db.collection("usuarios").findOne(
      { email: user.email },
      function (err, usuario) {
        if (err) {
          return done(err);
        }
        if (!usuario) {
          return done(null, null);
        }
        return done(null, usuario); //console.log(user)
      }
    );
  });
  
  //-------------------- LOGIN ------------------------------
  
  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/api",
      failureRedirect: "/api/fail",
      failureFlash: true,
    })
  );
  
  app.all("/api", function (req, res) {
    // Utilizar .all como verbo => Las redirecciones desde un cliente Rest las ejecuta en POST, desde navegador en GET
    console.log("api")
    res.send({ logged: true, mensaje: feedback.mensaje , user: req.user });
  });
  
  app.all("/api/fail", function (req, res) {
    console.log("api fail")
    res.send({ logged: false, mensaje: feedback.mensaje, });
  });
  
  //app
  //  .route("/api")
  //  .get(res.send({ logged: true, mensaje: "Login correcto" }))
  //  .post(res.send({ logged: true, mensaje: "Login correcto" }))
  
  //-------------------- LOGOUT -----------------------------
  
  app.post("/logout", function (req, res) {
    req.logOut();
    res.send({ mensaje: "Logout Correcto" });
  });
  
  //-------------------- RUTAS ------------------------------
  
  //la ruta del registro la tengo por router en registro.js
  
  app.all("/perfil", function (req, res) {
    req.isAuthenticated()
      ? res.send({
          logged: true,
          mensaje: "Todo correcto: información sensible",
          user: req.user,
        })
      : res.send({ logged: false, mensaje: "Necesitas logearte. Denegado" });
  });


//-----------FUNCIONES CRYPTO PASSWORD--------

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

/**
 *
 * @param {*} password -> Recibe el password a comprobar
 * @param {*} hash -> Recibe el hash almacenado a comprobar
 * @param {*} salt -> Recibe el salt almacenado a comprobar
 * @returns -> Booleano ( true si es el correcto, false en caso contrario)
 */

function validoPass(password, hash, salt) {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
}



//---------ESCUCHA--------


app.listen(puerto, function (err) {
  err
    ? console.log("🔴 Servidor fallido")
    : console.log("🟢 Servidor funcionando en el puerto:" + puerto);
});
