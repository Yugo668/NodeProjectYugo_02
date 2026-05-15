import userIcon from './assets/user.png';
import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // --- TUS ESTADOS DEL CRUD ---
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idUsuarioEditando, setIdUsuarioEditando] = useState(null);

  const API_URL = "http://localhost:3000/usuarios";
  const AUTH_URL = "http://localhost:3000/auth/login";

  useEffect(() => {
    if (isLoggedIn) obtenerUsuarios();
  }, [isLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(AUTH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      if (res.ok) {
        const token = await res.text();
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
      } else {
        alert("Credenciales incorrectas para el administrador");
      }
    } catch (error) {
      console.error("Error en login:", error);
    }
  };

  const obtenerUsuarios = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsuarios(data);
    } catch (error) { console.error(error); }
  };

  const guardarUsuario = async () => {
    if (nombre.trim() === "" || email.trim() === "") {
      alert("Nombre y Email son obligatorios");
      return;
    }
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido, email, telefono }),
      });
      if (res.ok) { alert("Usuario Registrado"); obtenerUsuarios(); limpiarFormulario(); }
    } catch (error) { console.error(error); }
  };

  const eliminarUsuario = async (id) => {
    if (!confirm("¿Deseas eliminar este usuario?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) { obtenerUsuarios(); }
    } catch (error) { console.error(error); }
  };

  const prepararEdicion = (usuario) => {
    setNombre(usuario.nombre); setApellido(usuario.apellido);
    setEmail(usuario.email); setTelefono(usuario.telefono);
    setModoEdicion(true); setIdUsuarioEditando(usuario.id);
  };

  const actualizarUsuario = async () => {
    try {
      const res = await fetch(`${API_URL}/${idUsuarioEditando}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido, email, telefono }),
      });
      if (res.ok) { obtenerUsuarios(); cancelarEdicion(); }
    } catch (error) { console.error(error); }
  };

  const limpiarFormulario = () => { setNombre(""); setApellido(""); setEmail(""); setTelefono(""); };
  const cancelarEdicion = () => { limpiarFormulario(); setModoEdicion(false); setIdUsuarioEditando(null); };
  const cerrarSesion = () => { localStorage.removeItem("token"); setIsLoggedIn(false); };

  return (
  <div className="App"> 
    {!isLoggedIn ? (
      <div className="contenedor_1">
        <div className="formulario">
          <h1>Acceso Administrador</h1>
          <div className="img-usuario">
            <img src={userIcon} alt="Usuario" className='img'/>
          </div>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" onChange={(e) => setLoginEmail(e.target.value)} required />
            <input type="password" placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)} required />
            <div className='login-button'>
              <button type="submit">Entrar al Sistema</button>
            </div>
          </form>
        </div>
      </div>
    ) : (
      <div className="contenedor_2">
        <div className="header-app">
          <h1>Gestión de Usuarios</h1>
        </div>

        <div className="formulario">
          <h2>{modoEdicion ? "Editar usuario" : "Registrar usuario"}</h2>
          <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />

          {modoEdicion ? (
            <div className="grupo-botones">
              <button onClick={actualizarUsuario}>Actualizar</button>
              <button className="boton-cancelar" onClick={cancelarEdicion}>Cancelar</button>
            </div>
          ) : (
            <button onClick={guardarUsuario}>Guardar usuario</button>
          )}
        </div>

        <div className="lista">
          <h2>Lista de usuarios registrados</h2>
          {usuarios.length === 0 ? (
            <p>No hay registros...</p>
          ) : (
            usuarios.map((u) => (
              <div key={u.id} className="card-paciente">
                <p><strong>Nombre:</strong> {u.nombre} {u.apellido}</p>
                <p><strong>Email:</strong> {u.email}</p>
                <p><strong>Teléfono:</strong> {u.telefono}</p>
                <div className="grupo-botones">
                  <button onClick={() => prepararEdicion(u)}>Editar</button>
                  <button className="boton-eliminar" onClick={() => eliminarUsuario(u.id)}>Eliminar</button>
                </div>
              </div>
            ))
          )}
        </div>
        <button className="boton-cancelar" onClick={cerrarSesion}>Cerrar Sesión</button>
      </div>
    )}
  </div>
  );
}

export default App;