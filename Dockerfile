# Usa una imagen base de Node.js
FROM node:18-alpine

# Define el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json ./
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto que usa tu API
EXPOSE 3000

# Comando para ejecutar la app
CMD ["npm", "start"]