FROM node:14-alpine

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el archivo package.json al contenedor
COPY package.json .

# Instalar las dependencias
RUN npm install

# Copiar el resto del código al contenedor
COPY . .

# Exponer el puerto 3000
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
