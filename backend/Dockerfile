# Usamos una imagen base de Node.js
FROM node:16

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiamos los archivos de nuestra aplicación a la imagen
COPY package*.json ./

# Instalamos las dependencias de la aplicación
RUN npm install

# Copiamos el resto de los archivos de tu proyectos
COPY . .

# Exponemos el puerto que usará la aplicación
EXPOSE 5000

# Configuramos el comando para iniciar la aplicación
CMD ["npm", "start"]
