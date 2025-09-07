# Etapa 1: Imagen base
# Le decimos a Docker que comience con una imagen oficial de Node.js.
# La versión 18-alpine es ligera y buena para producción.
FROM node:18-alpine

# Etapa 2: Establecer el directorio de trabajo
# Creamos una carpeta llamada /app dentro del contenedor donde vivirá nuestro código.
WORKDIR /app

# Etapa 3: Instalar dependencias
# Copiamos solo el package.json y package-lock.json para instalar las dependencias.
# Docker es inteligente y solo reinstalará si estos archivos cambian.
COPY package*.json ./
RUN npm install

# Etapa 4: Copiar el código fuente
# Copiamos el resto de los archivos de tu backend al contenedor.
COPY . .

# Etapa 5: Exponer el puerto
# Le informamos a Docker que la aplicación usará el puerto 3000.
EXPOSE 3000

# Etapa 6: Comando de inicio
# Le decimos al contenedor qué comando ejecutar cuando se inicie, en este caso, el script "start".
CMD ["npm", "start"]