FROM node:20-alpine

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Exponer puerto de Vite
EXPOSE 5173

# Comando para desarrollo con hot reload forzado
CMD ["npm", "run", "dev", "--", "--host", "--force"]

