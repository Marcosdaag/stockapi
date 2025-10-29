Etapa base
FROM stockapi

Crear carpeta de trabajo dentro del contenedor
WORKDIR /app

Copiar archivos necesarios
COPY package*.json ./

Instalar dependencias
RUN npm install --production

Copiar el código fuente
COPY . .

Exponer puerto 8080
EXPOSE 8080

Comando que se ejecuta al iniciar el contenedor
CMD ["npm", "start"]