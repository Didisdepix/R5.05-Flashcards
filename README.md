# R5.05-Flashcards
# R5.05 - Projet de groupe  # API RESTful de gestion de flashcards pour réviser

## Contexte
Cette application a été réalisée par Antoine Rabuté et Lucas Demaimay dans le cadre du cours R5.05 de BUT informatique
Ce cours enseigne la maitrise des outils NodeJS, drizzle, zod.

## Objectif
Cette application purement backend a pour objectif de permettre aux utilisateurs de réviser des "flashcards" et de les organiser en collections.
Il y a possibilité d'y avoir un administrateur avec des droits particuliers.

## Installation
Pour installer le projet il faut tout d'abord cloner le dépôt GIT sur sa machine. Il faut ensuite éxécuter la commande npm install à la racine du dépôt.

## Configuration
Les variables d'environnements nécessaires au fonctionnement de l'API sont à définir dans un fichier.env
Les variables en questions sont DB_FILE et JWT_SECRET
DB_FILE doit pointer vers un fichier de base de données local.
JWT_SECRET doit être un secret récupéré via un site comme https://jwtsecrets.com/

Exemple de fichier .env:
DB_FILE=file:local.db
JWT_SECRET=357b1c1b1514e48dc7aedc766bd9d3f8

## Lancement du projet 
Avant de lancer l'application, il est nécessaire de lancer les scripts pour créer la base de donnée.
Il suffit pour cela de lancer les commandes:
npm run db:push 
npm run db:seed

Si vous souhaitez modifier les données qui seront rentrées, vous devez modifier le script seed.js
Il est possible de visualiser les données en lançant la commande:
npm run db:studio

Pour lancer le projet, il vous suffira alors de lancer la commande :
npm run dev

## Documentation
La documentation des endpoints de l'api est disponible dans le fichier API.md
