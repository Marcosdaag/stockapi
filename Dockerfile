# Imagen base oficial de Node
FROM node:20

# Crea y usa un directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración primero
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de tu proyecto
COPY . .

# Expone el puerto en el que corre tu API
EXPOSE 3000

# Comando para ejecutar la app
CMD ["npm", "start"]
