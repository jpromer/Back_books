# Imagen base
FROM node:14-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de la aplicación al contenedor
COPY package*.json ./
COPY . .

# Instalar dependencias
RUN npm install 

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]