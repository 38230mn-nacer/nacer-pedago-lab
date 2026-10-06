# Runbook — passer de MOCK à SERVICE LIVE

## A. Tester le gateway sans Comfy

Depuis `services/comfy-gateway` :

```bash
npm install
cp .env.example .env
npm run dev
```

Vérifier :
- `GET /health`
- `GET /api/v1/services`
- `POST /api/v1/visuals/generate`

Exemple :

```json
{
  "topic": "Symétrie centrale",
  "level": "5e",
  "objective": "Comprendre qu'une symétrie centrale équivaut à un demi-tour.",
  "keyIdea": "Le point et son image sont opposés autour du centre O.",
  "cognitiveStage": "image-representation",
  "format": "visio-16-9",
  "mustShow": [
    "un centre O visuellement dominant",
    "un point et son image de part et d'autre de O",
    "un mouvement de rotation de 180 degrés suggéré graphiquement"
  ],
  "mustAvoid": [
    "axes de symétrie",
    "décoration non pédagogique"
  ],
  "variants": 1
}
```

## B. Construire le workflow Comfy

Dans Comfy Cloud + Comfy Agent :
- créer `NACER_VISUAL_PEDAGO_V1` ;
- une entrée texte clairement identifiable ;
- une sortie image explicite ;
- pas de texte mathématique rasterisé ;
- tester 5e / 1re / BTS ;
- figer la version retenue.

## C. Export API

Exporter le workflow au format API et déposer :

`workflows/nacer_visual_pedago_v1/workflow_api.json`

Puis remplacer les placeholders de `manifest.json` par les vrais IDs de nœuds.

## D. Déployer

Sur la Comfy Developer Platform :
1. créer un Build à partir du workflow ;
2. vérifier modèles, custom nodes et dépendances ;
3. créer une Release immuable ;
4. créer un Deployment ;
5. récupérer l'URL `https://<deployment>.run.comfy.app` ;
6. créer une clé API.

## E. Activer

Dans `.env` :

```env
NACER_COMFY_MODE=live
NACER_GATEWAY_TOKEN=<secret-long-et-aleatoire>
COMFY_BASE_URL=https://<deployment>.run.comfy.app
COMFY_API_KEY=comfyui-...
```

Relancer le gateway. Le contrat HTTP côté Nacer OS ne change pas. En mode live, les appels de génération utilisent `Authorization: Bearer <NACER_GATEWAY_TOKEN>`.

## F. Critère de passage en production

Le workflow est accepté uniquement si les trois tests de référence passent :
1. symétrie centrale 5e ;
2. dérivée 1re ;
3. série de Fourier BTS.

Pour chacun :
- idée centrale comprise en moins de 5 s ;
- exactitude conceptuelle ;
- aucune formule inventée ;
- lisibilité visio ;
- espace disponible pour annotation ;
- résultat suffisamment stable sur plusieurs exécutions.

## G. Prochaine brique

Après validation de `visual-pedago-v1`, dupliquer le modèle de service pour `capsule-v1` plutôt que réinventer l'architecture.
