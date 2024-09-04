FROM nginx:stable-alpine

# Créer un répertoire de travail dans l'image
WORKDIR /usr/share/nginx/html

# Copier les fichiers du projet dans le répertoire de travail
COPY . .

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

