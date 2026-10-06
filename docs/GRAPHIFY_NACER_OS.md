# Graphify dans Nacer OS

## Objectif

Utiliser Graphify comme couche de cartographie et de navigation de Nacer OS, afin qu'un assistant IA puisse interroger les relations entre les ressources au lieu de relire systématiquement tout le corpus.

## Phase 1 — pilote sur nacer-pedago-lab

Ce dépôt sert de terrain de test contrôlé.

Installation Windows / PowerShell :

```powershell
.\scripts\install-graphify.ps1
```

Le script :
1. vérifie `winget` ;
2. installe `uv` si nécessaire ;
3. installe le package officiel `graphifyy` ;
4. installe le skill Graphify pour Codex au niveau du projet ;
5. construit le premier graphe.

## Fichiers générés

Graphify crée typiquement :

```text
graphify-out/
├── graph.html
├── GRAPH_REPORT.md
└── graph.json
```

Ces fichiers sont volontairement exclus de Git.

## Phase 2 — structure cible Nacer OS

Le but n'est pas de mettre toutes les données personnelles dans un dépôt public.

Architecture recommandée :

```text
NACER-OS/
├── 00_INDEX/
├── PEDAGOGIE/
│   ├── BTS/
│   ├── BAC_PRO/
│   ├── LYCEE_GENERAL/
│   └── COLLEGE/
├── RESSOURCES/
│   ├── EXERCICES/
│   ├── CORRIGES/
│   ├── FICHES/
│   ├── CAPSULES/
│   └── TP/
├── OUTILS/
│   ├── APPS/
│   ├── SCRIPTS/
│   └── AUTOMATISATIONS/
├── PROGRAMMES_OFFICIELS/
└── PROJETS/
    └── nacer-pedago-lab/
```

## Données à ne pas injecter dans un graphe public

Ne pas placer dans un dépôt public ni dans un corpus partagé :
- identités complètes d'élèves ;
- données de santé ;
- coordonnées ;
- identifiants / mots de passe ;
- documents administratifs privés ;
- données familiales ;
- évaluations nominatives sensibles.

Pour les élèves, utiliser des identifiants ou pseudonymes si un graphe pédagogique est nécessaire.

## Stratégie d'usage

Graphify doit surtout servir à :
- relier notions, exercices, corrections et compétences ;
- retrouver une ressource sans parcourir des dizaines de fichiers ;
- identifier les dépendances entre applications et contenus ;
- préparer des parcours de remédiation ;
- cartographier les ressources d'une notion ;
- éviter de recharger un gros corpus dans le contexte IA.

Il ne remplace pas la mémoire conversationnelle de ChatGPT et n'augmente pas les quotas du modèle.

## Phase 3 — graphe global

Après validation du pilote :

1. créer un espace privé `nacer-os-knowledge` ;
2. n'y mettre que les contenus non sensibles utiles à l'IA ;
3. relier les dépôts pédagogiques et documents de référence ;
4. construire un graphe unique ou plusieurs graphes par domaine ;
5. comparer la qualité et le coût contextuel avant/après Graphify.

## Critères de validation

Le pilote est considéré utile si Graphify permet réellement de :
- retrouver plus vite une ressource ;
- répondre à une question transversale entre plusieurs fichiers ;
- réduire les lectures répétitives ;
- produire des chemins explicables entre concepts ;
- rester simple à maintenir.

Sinon, ne pas complexifier Nacer OS inutilement.
