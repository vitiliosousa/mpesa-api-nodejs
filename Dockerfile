# Usa imagem oficial do Node.js
FROM node:22

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia package.json e package-lock.json primeiro
COPY package*.json ./

# Instala dependências
RUN npm install --production

# Copia o restante do projeto
COPY . .

# Expõe a porta que o backend usa
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "server.js"]
