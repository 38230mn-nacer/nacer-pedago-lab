# Protocole de test Graphify — Nacer OS

## But

Vérifier si Graphify apporte un gain réel pour Nacer OS avant d'étendre son usage.

## Test A — retrouver une ressource

Question :

> Où se trouve la logique qui calcule le discriminant dans l'application du second degré, et quels fichiers l'utilisent ?

Mesurer :
- temps nécessaire ;
- nombre de fichiers parcourus ;
- qualité des liens proposés.

## Test B — question transversale

Question :

> Quels éléments du dépôt sont liés au second degré et comment sont-ils reliés entre interface, calcul et documentation ?

Mesurer :
- pertinence des relations ;
- capacité à relier plusieurs fichiers ;
- clarté du chemin explicatif.

## Test C — maintenance

Question :

> Si je modifie la représentation des racines, quelles parties du projet dois-je vérifier ?

Mesurer :
- précision des dépendances retrouvées ;
- faux positifs ;
- éléments oubliés.

## Test D — coût contextuel

Comparer deux sessions séparées :

1. assistant sans Graphify ;
2. assistant utilisant le graphe.

Pour une même tâche, noter :
- nombre approximatif de fichiers relus ;
- longueur du contexte injecté ;
- qualité de la réponse finale ;
- temps de travail ;
- erreurs ou oublis.

## Décision

Étendre Graphify à Nacer OS seulement si au moins trois bénéfices sont observés :
- navigation plus rapide ;
- moins de relecture brute ;
- meilleures relations entre fichiers ;
- réponses transversales plus fiables ;
- maintenance plus simple.

Ne pas poursuivre si le graphe ajoute plus de complexité qu'il n'en retire.
