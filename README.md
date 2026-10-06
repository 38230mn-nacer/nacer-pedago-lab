# Nacer Pedago Lab

Laboratoire de ressources pédagogiques interactives pour **Maths au Cube**.

## Structure

- `apps/` : applications pédagogiques interactives
- `animations/` : animations explicatives
- `simulations/` : simulations maths / sciences physiques
- `shared/` : ressources communes
- `docs/` : cahiers pédagogiques et roadmap

## Première application — Second degré interactif

Chemin : `apps/second-degre-interactif/`

Fonctions :
- modifier a, b, c ;
- visualiser la parabole ;
- lire les formes développée, canonique et factorisée ;
- afficher sommet, axe, discriminant et racines ;
- choisir la forme la plus pertinente selon la question ;
- s'entraîner avec un mode défi.

Aucune installation : ouvrir `index.html` dans un navigateur.

## Graphify — cartographie du projet

Ce dépôt est préparé pour une utilisation avec Graphify afin de construire un graphe de connaissances du projet.

Sous Windows / PowerShell :

```powershell
winget install astral-sh.uv
uv tool install graphifyy
graphify install --project --platform codex
graphify .
```

Le graphe généré est stocké dans `graphify-out/` et n'est pas versionné.

Voir `docs/GRAPHIFY_NACER_OS.md` pour la stratégie d'intégration dans Nacer OS.
