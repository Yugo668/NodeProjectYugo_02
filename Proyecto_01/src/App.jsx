import { useState, useEffect } from "react";
import "./App.css";

function App() {
  
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  
  const [usuarios, setUsuarios] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idUsuarioEditando, setIdUsuarioEditando] = useState(null);

  const API_URL = "http://localhost:3000/usuarios";

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const limpiarFormulario = () => {
    setNombre("");
    setApellido("");
    setEmail("");
    setTelefono("");
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
      
      if (res.ok) {
        alert("Usuario Registrado");
        obtenerUsuarios();
        limpiarFormulario();
      }
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };

  const eliminarUsuario = async (id) => {
    if (!confirm("¿Deseas eliminar este usuario?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) {
        obtenerUsuarios();
        if (id === idUsuarioEditando) cancelarEdicion();
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const prepararEdicion = (usuario) => {
    setNombre(usuario.nombre);
    setApellido(usuario.apellido);
    setEmail(usuario.email);
    setTelefono(usuario.telefono);
    setModoEdicion(true);
    setIdUsuarioEditando(usuario.id);
  };

  const actualizarUsuario = async () => {
    if (nombre.trim() === "" || email.trim() === "") {
      alert("Completa los campos obligatorios");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/${idUsuarioEditando}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido, email, telefono }),
      });

      if (res.ok) {
        obtenerUsuarios();
        cancelarEdicion();
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  const cancelarEdicion = () => {
    limpiarFormulario();
    setModoEdicion(false);
    setIdUsuarioEditando(null);
  };

  return (
    <div className="contenedor">
      <h1>Registro de Usuarios</h1>

      <div className="formulario">
        <h2>{modoEdicion ? "Editar usuario" : "Registrar usuario"}</h2>

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />

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
          <p>Cargando datos o no hay registros...</p>
        ) : (
          usuarios.map((u) => (
            <div key={u.id} className="card-paciente">
              <p><strong>Nombre:</strong> {u.nombre} {u.apellido}</p>
              <p><strong>Email:</strong> {u.email}</p>
              <p><strong>Teléfono:</strong> {u.telefono}</p>

              <button onClick={() => prepararEdicion(u)}>Editar</button>
              <button onClick={() => eliminarUsuario(u.id)}>Eliminar</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;