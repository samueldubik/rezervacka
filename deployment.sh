#!/bin/bash

export DOCKER_HOST=ssh://root@147.232.191.26

echo "Stopping existing services"

docker compose -f docker-compose.rezervacie.yml stop

docker compose -f docker-compose.rezervacie.yml build

echo "RUNNING APP"

docker compose -f docker-compose.rezervacie.yml up -d

echo "DONE deployment !"
