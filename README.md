# 🛒 API de Gestión de Pedidos y Stock.
https://marcosdaag-stockapi.mintlify.app/

API desarrollada con **Node.js**, **Express** y **Mongo** (Atlas Database) para gestionar productos y pedidos en un pequeño mercado, diseñada para **uso exclusivo de los vendedores**.


## ✨ Funcionalidades principales

### 🏷️ Productos (CRUD)
- ➕ **Crear** productos.
- 📋 Listar todos los productos disponibles.
- ✏️ **Editar** productos existentes.
- 🗑️ **Eliminar** productos.
- 📦 **Actualizar stock** y otras propiedades del producto.

### 🧾 Pedidos
- 🛍️ **Crear pedidos**, restando automáticamente el stock correspondiente.
- 📊 **Guardar información de cada pedido**: productos, cantidad, fecha y total.
- 💰 **Calcular descuentos y precio de venta** (opcional).

### 📩 Contacto
- 📰 **Formulario**, contactarse vial email.
- 🔁 **Resend**, libreria y herramienta resend para la gestion de emails https://resend.com/.


</br>

## 🔑 Autenticación y Usuarios

### 👤 Creación de usuarios
- Los usuarios se crean manualmente y sus contraseñas se almacenan de forma segura 🔒, hasheadas con `bcryptjs`.
- Cada usuario tiene un rol (`vendedor`, `developer`) que define sus permisos dentro de la API.
- Los usuarios iniciales se pueden crear mediante un script interno ⚙️, pero **no se suben credenciales al repositorio**.

### 🔐 Login con JWT
- Los usuarios se autentican haciendo login con su nombre de usuario y contraseña.
- Si las credenciales son correctas ✅, la API devuelve un **token JWT** que representa al usuario.
- Este token debe enviarse en el header `Authorization` de cada petición a rutas privadas.

### 🛡️ Middleware de seguridad
- Todas las rutas privadas están protegidas mediante un middleware que valida el token JWT.
- Si el token es inválido o ha expirado ❌, la API devuelve un error (401 o 403).
- El token permite a la API identificar al usuario y su rol, y controlar el acceso a las distintas funcionalidades (productos, pedidos, etc.).

</br>

## ✅ Constante up del deploy mediante
https://uptimerobot.com/

## 🐳 Probar la API con Docker

Podés usar la imagen directamente desde GitHub Packages:

```bash
# Descargar la imagen
docker pull ghcr.io/marcosdaag/stockapi:latest

# Ejecutar la API
docker run -p 3000:3000 ghcr.io/marcosdaag/stockapi:latest
```

</br>

### 📖 UML - Diagrama de clases
[![Diagrama-de-clases.png](https://i.postimg.cc/fLLdY0hy/Diagrama-de-clases.png)](https://postimg.cc/yJMWHxxC)

### 📖 UML - Diagrama de secuencia
[![Diagrama-de-secuencia.png](https://i.postimg.cc/vZF5CB5N/Diagrama-de-secuencia.png)](https://postimg.cc/BXp8KJYT)

- VARIABLES DE ENTORNO NECESARIAS
- APP_NAME="Subject del email"
- EMAIL_PASS="Key para envio de emails"
- EMAIL_USER= email al que llegan los mensajes
- JWT_SECRET= 
- MONGO_URI= conexion a la data base
- PORT=
- RESEND_API_KEY= api key de resend
