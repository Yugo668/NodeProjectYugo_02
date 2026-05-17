VISTA FRONTEND - REACT


Vista del Logueo:



<img width="439" height="465" alt="image" src="https://github.com/user-attachments/assets/bc8334fa-3c25-4c16-a278-e8ee9749eaa0" />



email: admin@gmail.com

password: 1234

Sistema de Registros:
<img width="763" height="526" alt="image" src="https://github.com/user-attachments/assets/3661ebeb-44be-4183-b2ad-bb8e08613259" />

Vista de los registros en la lista 'Kardex General de Productos':
<img width="746" height="897" alt="image" src="https://github.com/user-attachments/assets/672d9a4b-cbd8-4da2-a950-98569e85539e" />

Edicion en los campos de los productos (Ejemplo: Fluoxetina):
<img width="761" height="726" alt="image" src="https://github.com/user-attachments/assets/d48ff537-8fad-4271-b345-3a9f5e5aa16b" />

Vista eliminacion de productos (Ejemplo: Fluoxetina):
<img width="764" height="211" alt="image" src="https://github.com/user-attachments/assets/786ac868-a00d-4ae5-8633-f54390644024" />

THUNDER CLIENT PRUEBA DEL BACKEND

Registro de Usuario con thunder:
<img width="1240" height="223" alt="image" src="https://github.com/user-attachments/assets/e24660bd-86ac-49a5-8171-d41be6ea4cd4" />
En POST: http://localhost:3000/auth/register

Vista del token generado con el mismo usuario:
<img width="1620" height="220" alt="image" src="https://github.com/user-attachments/assets/a73b52d7-0b84-4215-9635-26e35dda9dac" />
JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvIjoiam9qb2xldGUiLCJzdGF0dXMiOiJhZG1pbl9hY3RpdmUiLCJ1aWQiOiJjSEoxWldKaFFHZHRZV2xzTG1OdmJRPT0iLCJpYXQiOjE3Nzg5OTQzMDV9.w5gvFtMqlc7f04WDB_thsMrtyEhCZOmUBhHqm0P3us0

Vista en el Dashboard ubicando el JWT:
<img width="1249" height="245" alt="image" src="https://github.com/user-attachments/assets/e2f3cc97-660f-4749-b5ec-781cb71e8662" />

Query de la Base de datos con MySql Workbench:

CREATE DATABASE IF NOT EXISTS nova_salud;
USE nova_salud;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(50) DEFAULT 'cajero',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_comercial VARCHAR(150) NOT NULL,
    principio_activo VARCHAR(150),
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    stock_minimo INT NOT NULL DEFAULT 10,
    fecha_vencimiento DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    total DECIMAL(10, 2) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS detalle_ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    venta_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (venta_id) REFERENCES ventas(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

INSERT INTO productos (nombre_comercial, principio_activo, precio, stock, stock_minimo, fecha_vencimiento) VALUES
('Paracetamol 500mg', 'Paracetamol', 0.60, 120, 20, '2028-12-31'),
('Amoxicilina 500mg', 'Amoxicilina', 1.50, 8, 15, '2027-08-22'),
('Ibuprofeno 400mg', 'Ibuprofeno', 0.80, 95, 15, '2028-04-15'),
('Omeprazol 20mg', 'Omeprazol', 1.80, 4, 12, '2027-11-02');

SELECT * FROM productos;
