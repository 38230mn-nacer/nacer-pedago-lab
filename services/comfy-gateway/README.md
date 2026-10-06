# Nacer Comfy Gateway

Gateway métier entre Nacer OS et Comfy API.

## Objectif

Nacer OS appelle des services stables comme `creer-visuel-pedagogique-v1` sans connaître les détails internes du graph Comfy.

Le même code peut cibler :
- Comfy Cloud ;
- un deployment Comfy API ;
- plus tard un ComfyUI auto-hébergé derrière l'API v2.

## Démarrage local en mode mock

```bash
npm install
cp .env.example .env
npm run dev
```

Puis :

```bash
curl http://localhost:8787/health
curl http://localhost:8787/api/v1/services
```

Le mode mock teste le contrat HTTP sans lancer de génération GPU.

## Mode live

Configurer :
- `NACER_COMFY_MODE=live`
- `NACER_GATEWAY_TOKEN`
- `COMFY_API_KEY`
- `COMFY_BASE_URL`
- le workflow API JSON et son manifeste.

En mode live, `POST /api/v1/visuels-pedagogiques/generer` exige :

```
Authorization: Bearer <NACER_GATEWAY_TOKEN>
```

Utiliser `X-Request-Id` pour la traçabilité. Ce header n'est pas un mécanisme de déduplication.

## Documentation API

Voir `openapi.yaml`.

## Principe de sécurité

Le gateway média n'accepte pas de données personnelles élèves. Le schéma est strict et rejette les champs inconnus. La personnalisation élève est calculée en amont par Nacer OS puis transformée en intention pédagogique non identifiante.
