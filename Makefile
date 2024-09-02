# Nom du fichier docker-compose par défaut
COMPOSE_FILE=docker-compose.yml

# Par défaut, toutes les commandes utiliseront ce fichier docker-compose
COMPOSE=docker-compose -f $(COMPOSE_FILE)

# Cible par défaut : lancer les services
.PHONY: up
up:
	$(COMPOSE) up

# Arrêter les services
.PHONY: down
down:
	$(COMPOSE) down

# Redémarrer les services
.PHONY: restart
restart: down up

# Voir les logs de tous les services
.PHONY: logs
logs:
	$(COMPOSE) logs -f

# Construire ou reconstruire les images Docker
.PHONY: build
build:
	$(COMPOSE) build

# Stopper et supprimer les conteneurs, réseaux, images et volumes
.PHONY: clean
clean:
	$(COMPOSE) down --rmi all --volumes --remove-orphans

# Afficher l'état des services
.PHONY: ps
ps:
	$(COMPOSE) ps

# Ouvrir un shell interactif dans le conteneur backend
.PHONY: shell-backend
shell-backend:
	$(COMPOSE) exec backend /bin/sh

# Ouvrir un shell interactif dans le conteneur frontend
.PHONY: shell-frontend
shell-frontend:
	$(COMPOSE) exec frontend /bin/sh
