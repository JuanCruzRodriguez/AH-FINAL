# GESTIÓN DE PELÍCULAS Y SERIES VISTAS

Este repositorio contiene el proyecto desarrollado para el segundo parcial de **Aplicaciones Híbridas**. Es una aplicación web completa con frontend en React y backend en Node.js/Express, que permite gestionar películas, series y usuarios con autenticación y roles.

---

## Tecnologías utilizadas

- **Frontend:** React, React Router, Bootstrap
- **Backend:** Node.js, Express
- **Base de datos:** MongoDB con Mongoose
- **Autenticación:** JWT (JSON Web Tokens)
- **Control de versiones:** Git y GitHub

---

## Funcionalidades

### Usuarios
- Registro y login de usuarios.
- Diferenciación por roles: `USER` y `ADMIN`.
- Perfil de usuario con posibilidad de edición.
- Los administradores pueden listar, editar y eliminar usuarios.

### Películas
- Listado de películas.
- Agregar, editar y eliminar películas (solo usuarios autenticados).

### Series
- Listado de series.
- Agregar, editar y eliminar series (solo usuarios autenticados).

### Navegación y seguridad
- Rutas protegidas para usuarios autenticados.
- Rutas exclusivas para administradores.
- Logout seguro con confirmación.

---

## Estructura del proyecto

AH-PARCIAL2/
├─ frontend/
└─ backend/ 


---

## Instalación

### Backend
1. Instalar dependencias:
```bash
cd backend
npm install
```

2. Configurar variables de entorno en .env:
```bash
MONGO_URI=<tu_conexion_mongodb>
JWT_SECRET=<clave_secreta_para_jwt>
PORT=3000
```

3. Iniciar servidor:
```bash
npm start
```


### Frontend
1. Instalar dependencias:
```bash
cd frontend
npm install
```

2. Iniciar servidor de desarrollo:
```bash
npm run dev
```

3. Acceder a la aplicación en:
```bash
http://localhost:5173
```

## Uso

- Los usuarios pueden registrarse y loguearse.

- Los administradores tienen acceso al panel de administración de usuarios (/admin/users).

- Desde el menú de navegación, los usuarios pueden acceder a películas, series y su perfil.
