# Template — Workflow Comfy vers Service Nacer OS

Chaque nouveau service média suit le même chemin.

## 1. Contrat métier

Définir les entrées utiles au métier, sans exposer les IDs de nœuds Comfy.

Exemple :
- notion ;
- niveau ;
- objectif ;
- format ;
- contraintes.

## 2. Workflow

Créer le graph dans Comfy et séparer clairement :
- entrées contrôlables ;
- cœur de génération ;
- sortie(s).

## 3. Tests de référence

Définir au moins trois cas très différents. Le workflow n'est pas accepté tant qu'ils ne passent pas.

## 4. Export API

Exporter le workflow en API format sous le nom `workflow_api.json`.

## 5. Manifest

Copier `manifest.example.json`, renseigner :
- service ;
- workflow ;
- version ;
- IDs des nœuds d'entrée ;
- IDs des nœuds de sortie.

## 6. Release

Créer un Build Comfy, puis une Release immuable et un Deployment.

## 7. Gateway

Ajouter ou réutiliser un endpoint métier dans `services/comfy-gateway`.

Le code Nacer OS appelle le **service**, jamais le graph directement.

## 8. Validation

Cycle obligatoire :

`generated -> verification-required -> approved -> stored`

## Definition of Done

Un workflow est devenu un service uniquement si :
- le contrat HTTP est versionné ;
- le workflow API est versionné ;
- les entrées/sorties sont documentées ;
- trois tests de référence passent ;
- la release Comfy est immuable ;
- le job est traçable ;
- les données personnelles inutiles sont exclues ;
- un contrôle humain est prévu avant stockage durable.
