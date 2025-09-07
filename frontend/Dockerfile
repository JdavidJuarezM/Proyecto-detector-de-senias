# Etapa 1: La etapa de construcción
# Usamos una imagen de Node para construir el proyecto
FROM node:18-alpine AS builder

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos el package.json y package-lock.json e instalamos dependencias
COPY package*.json ./
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Ejecutamos el script de construcción para generar los archivos estáticos
RUN npm run build

# Etapa 2: La etapa de servicio
# Usamos Nginx, un servidor web ligero y de alto rendimiento
FROM nginx:stable-alpine

# Copiamos los archivos estáticos construidos en la etapa anterior
# desde la carpeta /app/dist del 'builder' a la carpeta de Nginx que sirve contenido web
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponemos el puerto 80, que es el puerto por defecto de Nginx
EXPOSE 80

# El comando para iniciar Nginx (ya viene preconfigurado en la imagen)
CMD ["nginx", "-g", "daemon off;"]