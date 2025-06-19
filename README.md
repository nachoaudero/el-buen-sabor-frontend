# 🍽️ El Buen Sabor – Frontend

Este repositorio contiene el código fuente del **Frontend** del sistema de gestión para el restaurante _El Buen Sabor_, desarrollado como trabajo final de la materia **Laboratorio de Computación IV** de la carrera TUP (UTN – FRM).

La aplicación permite a los clientes realizar pedidos online y a los empleados del restaurante gestionar usuarios, productos, pedidos, cocina, delivery, facturación, estadísticas y más.

---

## 🧑‍💻 Integrantes del Proyecto

- Ignacio Audero
- Aarón Kibysz
- Francisco Martínez Chiappetta

---

## 📌 Tecnologías Utilizadas

- **React 18+**
- **TypeScript 5+**
- **React Bootstrap** (estilos y componentes)
- **React Router DOM** (ruteo y navegación)
- **Axios** (HTTP client)
- **Vite** o Create React App (según la base del proyecto)

### Autenticación e Integraciones

- **Google OAuth 2.0** (login con cuenta de Google)
- **JWT** (JSON Web Token para seguridad y sesión)
- **Mercado Pago** (pasarela de pago)
- **MailJS** (envío automático de mails con comprobantes)

## 🎯 Funcionalidades Implementadas

### 👤 Módulo I – Usuarios

- Registro de clientes con validación de contraseña segura y verificación de email único
- Login con usuario/contraseña o cuenta de Google
- Edición de datos personales (clientes y empleados)
- Registro y gestión de empleados por parte del administrador
- ABM de usuarios (altas, bajas, modificación de datos)
- Asignación automática de roles y permisos

### 🛒 Módulo II – Pedidos

- Landing page accesible sin login con listado de productos
- Buscador dinámico de productos
- Carrito de compras con suma/resta de unidades y cálculo de subtotal
- Confirmación de pedido con selección de método de entrega y forma de pago
- Integración con Mercado Pago para pagos online
- Generación de factura automática con envío por correo
- Historial de pedidos con acceso a facturas descargables

### 📦 Módulo III – Recepción y Entrega

- Panel del cajero con pedidos filtrados por estado
- Transiciones de estados: A confirmar, En cocina, Listo, En delivery, Entregado
- Control de pagos para permitir o impedir entregas

### 🍳 Módulo IV – Cocina

- Vista de pedidos en cocina con tiempos estimados
- Detalle de recetas y control de estado a “Listo”
- Cálculo dinámico de tiempo estimado de preparación + entrega

### 🧾 Módulo V – Facturación

- Facturación automática tras confirmación de pedido y pago
- Anulación mediante nota de crédito con reintegro automático al stock

### 🧂 Módulo VI – Gestión de Rubros, Ingredientes y Productos

- ABM completo de ingredientes, rubros e insumos
- Registro de compras con actualización de stock y costo
- Control de stock mínimo y alertas
- Creación de productos con receta, imagen, tiempo estimado y rubro
- Cálculo automático del costo de productos y control de precio

### 📊 Módulo VII – Estadísticas e Informes

- Ranking de productos más vendidos por categoría y fechas
- Ranking de clientes por cantidad de pedidos o facturación
- Informe de ingresos, costos y ganancias por rango de fechas
- Exportación de reportes a Excel
