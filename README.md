# 🏟️ Kinal Sport Admin API

Sistema integral de gestión para complejos deportivos desarrollado con **Node.js**, **Express** y **MongoDB**. Esta API permite administrar instalaciones, gestionar el flujo de reservaciones, organizar equipos y coordinar torneos deportivos.

## 🚀 Características Principales

* **Gestión de Media:** Integración con **Cloudinary** para almacenamiento de fotos de canchas y logos de equipos.
* **Seguridad:** Implementación de **Helmet**, **CORS** y **Rate Limiting** para protección contra ataques comunes.
* **Arquitectura:** Controladores desacoplados, validaciones mediante middlewares y manejo centralizado de errores.
* **Persistencia:** Base de datos NoSQL con **Mongoose**, incluyendo paginación y borrado lógico.

---

## 🛠️ Stack Tecnológico

* **Backend:** Node.js / Express
* **Base de Datos:** MongoDB / Mongoose
* **Almacenamiento:** Cloudinary (vía Multer)
* **Seguridad:** Helmet, CORS, Morgan (Logging)

---

## 📂 Estructura de Endpoints

La URL base para todas las peticiones es: 
`http://localhost:3001/kinalSportAdmin/v1`

### 🏟️ Canchas (Fields)
Administra las instalaciones disponibles (Fútbol 5, 7, 11).
- `GET /fields` - Listado paginado de canchas.
- `GET /fields/:id` - Obtener detalle de una cancha.
- `POST /fields` - Crear nueva cancha (Soporta carga de imagen).
- `PUT /fields/:id` - Actualizar datos o imagen.
- `PUT /fields/:id/activate` | `/deactivate` - Control de estado.

ejemplo:
{
  "fieldName": "Estadio Kinal Central",
  "fieldType": "SINTETICA",
  "capacity": "FUTBOL_11",
  "pricePerHour": 250,
  "description": "Cancha con iluminación profesional y graderío techado."
}

### 📅 Reservaciones (Reservations)
Control de alquiler de espacios por clientes.
- `GET /reservations` - Listado de reservas (con datos del campo vinculados).
- `GET /reservations/:id` - Detalle de reserva.
- `POST /reservations` - Crear nueva reservación.
- `PUT /reservations/:id` - Actualizar estado (PENDIENTE/CONFIRMADA/CANCELADA).
- `DELETE /reservations/:id` - Borrado lógico.

ejemplo:
{
  "field": "65f1a2b3c4d5e6f7a8b9c0d1", 
  "customerName": "Juan Alcantara",
  "customerEmail": "juan.alcantara@gmail.com",
  "reservationDate": "2024-05-15T00:00:00.000Z",
  "startTime": "14:00",
  "endTime": "16:00",
  "totalPrice": 500,
  "status": "PENDIENTE"
}

### 🛡️ Equipos (Teams)
Gestión de escuadras y personal de apoyo.
- `GET /teams` - Listado paginado de equipos.
- `POST /teams` - Crear equipo con logo (Cloudinary).
- `PUT /teams/:id` - Editar información del equipo.
- `DELETE /teams/:id` - Desactivación de equipo.

ejemplo:
{
  "teamName": "Gatos de Kinal FC",
  "description": "Equipo representativo de la jornada matutina.",
  "coach": "Roberto Gómez",
  "captain": "Carlos Pérez"
}

### 🏆 Torneos (Tournaments)
Organización de competiciones por categorías.
- `GET /tournaments` - Ver torneos activos.
- `POST /tournaments` - Crear nuevo torneo (Masculino, Femenino, Mixto).
- `PUT /tournaments/:id` - Editar fechas y límites de equipos.
- `DELETE /tournaments/:id` - Cancelación/Desactivación lógica.

ejemplo:
{
  "tournamentName": "Copa Inter-Kinal 2024",
  "category": "MASCULINO",
  "startDate": "2024-06-01",
  "endDate": "2024-06-30",
  "maxTeams": 16
}

---

## ⚙️ Gestión de Imágenes

El sistema incluye una lógica automática de limpieza:
1. **Subida:** Las imágenes se organizan en carpetas `teams/` y `fields/` en Cloudinary.
2. **Reemplazo:** Al actualizar una foto, el sistema elimina automáticamente el archivo anterior de Cloudinary usando su `public_id` para optimizar el espacio.
3. **Respaldo:** Se asignan imágenes por defecto si no se carga un archivo durante la creación.

---

## 🛡️ Seguridad y Middlewares

- **Request Limit:** Restricción de peticiones para evitar ataques DoS.
- **Field/Team Validators:** Validación estricta de tipos de datos antes de procesar cualquier solicitud.
- **Cleanup Middleware:** En caso de error durante la creación, el sistema limpia archivos temporales para mantener el servidor optimizado.

---

## 🔧 Instalación y Configuración

1.  **Clonar:** `git clone https://github.com/KennethMC26/server-admin.git`
2.  **Instalar dependencias:** `npm install`
3.  **Variables de Entorno:** Configurar un archivo `.env` con:
    * `PORT=3001`
    * `MONGO_URI=tu_conexion_mongodb`
    * `CLOUDINARY_URL=tu_url_cloudinary`
4.  **Ejecutar:** `npm start`