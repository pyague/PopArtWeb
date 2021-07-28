import './App.css';

import {useState, useEffect} from "react"
import {BrowserRouter, Route, Link} from "react-router-dom"

//Servicio JS

//Módulos
/* import Productos from './Módulos/Productos'; */
import Cabecera from './Módulos/Cabecera';
import Main from "./Módulos/Main"
import Footer from './Módulos/Footer';
import Registro from "./Módulos/Registro"
import Login from "./Módulos/Login"
import Areapersonal from "./Módulos/Areapersonal"
import Productos from "./Módulos/Productos"
import Faqs from "./Módulos/Faqs"
import Info from "./Módulos/Info"
import Funcionamiento from './Módulos/Funcionamiento';

function App() {
const url="http://localhost:3001"
const[user, setUser]=useState({}) //aqui el logged
const[artist, setArtist]=useState() //aqui true/false artista
const[username, setUsername]=useState("") //aqui se guarda el email de quien inicia la sesión
const[nombre, setNombre]=useState("")

return (
    <BrowserRouter>
      <Cabecera user={user} artist={artist} setArtist={setArtist} setUser={setUser} nombre={nombre}/>
      <Route exact path="/">
      <Main user={user} artist={artist} setArtist={setArtist} username={username} setUsername={setUsername}/>
      </Route>
      <Route exact path="/productos">
      <Productos user={user} artist={artist} setArtist={setArtist} username={username} setUsername={setUsername}/>
      </Route>
      <Route exact path="/areapersonal">
      <Areapersonal user={user} artist={artist} setArtist={setArtist} username={username} setUsername={setUsername}/>
      </Route>
      <Route exact path="/faqs">
        <Faqs/>
      </Route>
      <Route exact path="/funcionamiento">
        <Funcionamiento/>
      </Route>
      <Route exact path="/info">
        <Info/>
      </Route>
      <Route exact path="/login">
      <Login user={user} setUser={setUser} artist={artist} setArtist={setArtist} username={username} setUsername={setUsername} setNombre={setNombre}/>
      </Route>
      <Route exact path="/registro">
        <Registro/>
      </Route>
      <Footer/>
    </BrowserRouter>
    )
}

export default App;