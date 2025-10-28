# 🛒 API de Gestión de Stock para Tiendas

API desarrollada con **Node.js**, **Express** y **MongoDB** para gestionar productos y pedidos en un pequeño mercado, diseñada para **uso exclusivo de los vendedores**.

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

## 🧱 Diagrama de Arquitectura General

![Diagrama de Arquitectura](./docs/uml/stockUML.png)

## 🔁 Flujo de Creación de Pedido

![Diagrama de Secuencia](./docs/uml/sequenceOrder.png)
