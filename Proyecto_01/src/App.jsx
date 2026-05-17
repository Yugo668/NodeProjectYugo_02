import userIcon from './assets/user.png';
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [errorLogin, setErrorLogin] = useState("");
  const [notificacionExito, setNotificacionExito] = useState("");
  const [idConfirmarEliminar, setIdConfirmarEliminar] = useState(null);

  const [nombreComercial, setNombreComercial] = useState("");
  const [principioActivo, setPrincipioActivo] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [stockMinimo, setStockMinimo] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  
  const [productos, setProductos] = useState([]);
  const [alertas, setAlertas] = useState([]);

  const [modoEdicion, setModoEdicion] = useState(false);
  const [idProductoEditando, setIdProductoEditando] = useState(null);

  const API_URL = "http://localhost:3000/productos"; 
  const DASHBOARD_URL = "http://localhost:3000/dashboard";
  const AUTH_URL = "http://localhost:3000/auth/login";

  useEffect(() => {
    const tokenExistente = localStorage.getItem("token");
    if (tokenExistente) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      obtenerProductos();
      obtenerAlertasPanel();
    }
  }, [isLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorLogin("");
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
        setErrorLogin("Credenciales incorrectas para la botica");
      }
    } catch (error) { 
      console.error(error); 
      setErrorLogin("Error de conexión con el servidor");
    }
  };

  const obtenerProductos = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(API_URL, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      setProductos(data);
    } catch (error) { console.error(error); }
  };

  const obtenerAlertasPanel = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(DASHBOARD_URL, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      setAlertas(data.alertas_reposicion || []);
    } catch (error) { console.error(error); }
  };

  const guardarProducto = async () => {
    const token = localStorage.getItem("token");
    const url = modoEdicion ? `${API_URL}/${idProductoEditando}` : API_URL;
    const metodo = modoEdicion ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: metodo,
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ 
          nombre_comercial: nombreComercial, principio_activo: principioActivo, 
          precio, stock, stock_minimo: stockMinimo, fecha_vencimiento: fechaVencimiento 
        }),
      });
      if (res.ok) { 
        setNotificacionExito(modoEdicion ? "✅ Medicamento actualizado con éxito" : "✅ Medicamento registrado con éxito"); 
        setTimeout(() => setNotificacionExito(""), 3000);

        obtenerProductos(); 
        obtenerAlertasPanel();
        limpiarFormulario(); 
      }
    } catch (error) { console.error(error); }
  };

  const activarEdicion = (p) => {
    setModoEdicion(true);
    setIdProductoEditando(p.id);
    setNombreComercial(p.nombre_comercial);
    setPrincipioActivo(p.principio_activos || p.principio_activo);
    setPrecio(p.precio);
    setStock(p.stock);
    setStockMinimo(p.stock_minimo);
    setFechaVencimiento(p.fecha_vencimiento);
  };

  const ejecutarEliminacion = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/${id}`, { 
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) { 
        setIdConfirmarEliminar(null); 
        obtenerProductos(); 
        obtenerAlertasPanel(); 
      }
    } catch (error) { console.error(error); }
  };

  const limpiarFormulario = () => {
    setNombreComercial(""); setPrincipioActivo(""); setPrecio("");
    setStock(""); setStockMinimo(""); setFechaVencimiento("");
    setModoEdicion(false); setIdProductoEditando(null);
  };

  const cerrarSesion = () => { localStorage.removeItem("token"); setIsLoggedIn(false); };

  return (
    <div className="App"> 
      {!isLoggedIn ? (
        <div className="contenedor_1">
          <form 
            className="formulario" 
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <h1>Nova Salud - Control</h1>
            <div className="img-usuario" style={{ display: "flex", justifyContent: "center", marginBottom: "15px" }}>
              <img src={userIcon} alt="Usuario" className='img' style={{ width: '80px' }} />
            </div>
            <input type="email" placeholder="Ingrese su email" onChange={(e) => setLoginEmail(e.target.value)} required />
            <input type="password" placeholder="Ingrese su contraseña" onChange={(e) => setLoginPassword(e.target.value)} required />
            
            {errorLogin && <p style={{ color: 'red', fontSize: '14px', margin: '10px 0 0 0' }}>{errorLogin}</p>}
            
            <button type="submit" style={{ marginTop: "15px" }}>Iniciar Sesión</button>
          </form>
        </div>
      ) : (
        <div className="contenedor_2">
          <div className="header-app" style={{ textAlign: "center", marginBottom: "20px" }}>
            <h1>Sistema de Gestión de Stock - Botica Nova Salud</h1>
          </div>

          {alertas.length > 0 && (
            <div className="alertas-inventario" style={{ background: '#ffcccc', padding: '10px', borderRadius: '5px', margin: '15px 0' }}>
              <h3 style={{ color: 'red'}}>⚠️ ALERTA AUTOMÁTICA DE REPOSICIÓN:</h3>
              <ul>
                {alertas.map(a => (
                  <li key={a.id}><strong>{a.nombre_comercial}</strong> requiere compra inmediata (Stock actual: {a.stock} | Mínimo: {a.stock_minimo})</li>
                ))}
              </ul>
            </div>
          )}

          <div className="formulario">
            <h2>{modoEdicion ? "Modificar Medicamento" : "Registrar Medicamento"}</h2>
            <input type="text" placeholder="Nombre Comercial" value={nombreComercial} onChange={(e) => setNombreComercial(e.target.value)} />
            <input type="text" placeholder="Principio Activo" value={principioActivo} onChange={(e) => setPrincipioActivo(e.target.value)} />
            <input type="number" placeholder="Precio S/." value={precio} onChange={(e) => setPrecio(e.target.value)} />
            <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
            <input type="number" placeholder="Stock Mínimo Alerta" value={stockMinimo} onChange={(e) => setStockMinimo(e.target.value)} />
            <input type="date" value={fechaVencimiento} onChange={(e) => setFechaVencimiento(e.target.value)} />
            
            {notificacionExito && <div style={{ background: '#e2f0d9', color: '#385723', padding: '8px', borderRadius: '5px', margin: '10px 0', fontSize: '14px', textAlign: 'center' }}>{notificacionExito}</div>}
            
            <div className="grupo-botones" style={{ justifyContent: "center", width: "100%" }}>
              <button onClick={guardarProducto}>
                {modoEdicion ? "Actualizar Medicamento" : "Guardar en Inventario"}
              </button>
              {modoEdicion && (
                <button className="boton-cancelar" style={{ marginTop: 0 }} onClick={limpiarFormulario}>
                  Cancelar
                </button>
              )}
            </div>
          </div>

          <div className="lista">
            <h2>Kardex General de Productos</h2>
            {productos.map((p) => (
              <div key={p.id} className="card-paciente">
                <p><strong>Medicamento:</strong> {p.nombre_comercial} ({p.principio_activo || p.principio_activos})</p>
                <p><strong>Precio:</strong> S/. {p.precio} | <strong>Stock Físico:</strong> {p.stock} unids.</p>
                <p><strong>Vencimiento:</strong> {p.fecha_vencimiento}</p>
                
                <div className="grupo-botones">
                  {idConfirmarEliminar === p.id ? (
                    <>
                      <span>¿Seguro?</span>
                      <button onClick={() => ejecutarEliminacion(p.id)}>Sí, borrar</button>
                      <button className="boton-cancelar" style={{ marginTop: 0 }} onClick={() => setIdConfirmarEliminar(null)}>Cancelar</button>
                    </>
                  ) : (
                    <>
                      <button className="boton-cancelar" style={{ marginTop: 0 }} onClick={() => activarEdicion(p)}>Editar</button>
                      <button onClick={() => setIdConfirmarEliminar(p.id)}>Eliminar</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "40px", paddingTop: "20px", borderTop: "2px solid #f0f0f0" }}>
            <button className="boton-cancelar" style={{ marginTop: 0 }} onClick={cerrarSesion}>
              Cerrar Sesión
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default App;