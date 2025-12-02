# =========================
# Build stage
# =========================
FROM node:20-alpine AS build

# Directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json / instalar dependencias
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copiar el resto del código y construir
COPY . .
RUN npm run build

# =========================
# Production stage: Nginx
# =========================
FROM nginx:alpine

# Copiar build al directorio de Nginx
# IMPORTANTE: React CRA genera la carpeta 'build', no 'dist'
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración de Nginx (React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
