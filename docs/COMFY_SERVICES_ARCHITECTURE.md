# Nacer OS — Workflows as Services

## Principe

Nacer définit l'intention. Nacer OS appelle un **service versionné**. Le service exécute un workflow Comfy immuable, retourne un résultat traçable, puis exige une vérification avant stockage durable.

```
Nacer / Nacer OS
      |
      v
Contrat métier stable
      |
      v
Nacer Comfy Gateway
      |
      v
Comfy API Deployment
      |
      v
Build -> Release immuable -> Deployment
      |
      v
Asset + jobId + workflowVersion
      |
      v
VERIFY -> APPROVE -> STORE
```

## Pourquoi un gateway Nacer

Nacer OS ne doit jamais connaître les IDs de nœuds Comfy.

Le gateway :
- transforme une demande pédagogique structurée en prompt d'exécution ;
- choisit la version de workflow ;
- masque les détails Comfy ;
- porte un identifiant de traçabilité stable ;
- réserve la déduplication fiable à une couche persistante dédiée (à ajouter ensuite) ;
- retourne la traçabilité ;
- impose la vérification humaine ;
- permet de changer Cloud / deployment / local sans changer Nacer OS.

## Catalogue cible

| Service | Workflow | État |
|---|---|---|
| `visual-pedago-v1` | `NACER_VISUAL_PEDAGO_V1` | scaffold implémenté |
| `capsule-v1` | `NACER_CAPSULE_V1` | prochain |
| `professeur-nacer-v1` | `PROFESSEUR_NACER_V1` | ensuite |
| `content-variants-v1` | `NACER_CONTENT_VARIANTS_V1` | ensuite |

## État de validation

Un asset passe par :

`generated -> verification-required -> approved -> stored`

Un résultat Comfy n'entre jamais automatiquement dans la mémoire durable de Nacer OS.

## Données élèves

Les services média ne reçoivent pas d'informations personnelles élèves. Le contrat `visual-pedago-v1` est volontairement strict et rejette les champs inconnus. Nacer OS peut personnaliser pédagogiquement la demande en amont, mais transmet uniquement les informations nécessaires au média.

## Couche mathématique déterministe

Les modèles d'image ne doivent pas être la source de vérité pour :
- équations ;
- fractions ;
- valeurs numériques ;
- noms de points ;
- tableaux ;
- graphiques exacts.

Le service visuel crée la structure graphique. Une couche SVG/HTML/Canvas déterministe doit ensuite poser les contenus mathématiques vérifiés.

## Portabilité

Le SDK officiel Comfy API v2 permet d'exécuter le même code sur :
- Comfy Cloud ;
- un deployment Comfy API ;
- un ComfyUI auto-hébergé derrière le proxy v2.

Le changement de surface se fait principalement par `COMFY_BASE_URL`.

## Retry et déduplication

Ne pas utiliser naïvement le même `Idempotency-Key` Comfy comme clé métier Nacer OS. Comfy API v2 rejette la réutilisation d'une clé déjà consommée. Le gateway utilise donc `X-Request-Id` uniquement pour la traçabilité. Une déduplication métier fiable devra stocker `requestId`, état et `comfyJobId` dans une base persistante avant de promettre un retry exactement-une-fois.
