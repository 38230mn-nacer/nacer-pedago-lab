# NACER_CREER_VISUEL_PEDAGOGIQUE_V1 — Créer un visuel pédagogique

Premier workflow Comfy destiné à devenir un service Nacer OS.

## Rôle

Produire la couche visuelle d'un support pédagogique. Les formules, valeurs exactes, labels géométriques et textes longs sont ajoutés ensuite par une couche déterministe.

## Contrat

Service associé : `creer-visuel-pedagogique-v1`.

Entrées stables :
- notion ;
- niveau ;
- objectif ;
- idée centrale ;
- étape cognitive ;
- format ;
- éléments indispensables ;
- éléments interdits ;
- nombre de variantes.

Sortie :
- un ou plusieurs visuels ;
- identifiant de job Comfy ;
- version du workflow ;
- statut de validation.

## Passage en mode LIVE

1. Construire le workflow dans Comfy Cloud avec Comfy Agent.
2. Le nommer `NACER_CREER_VISUEL_PEDAGOGIQUE_V1`.
3. Prévoir une entrée texte unique pour le prompt.
4. Prévoir une sortie image explicite.
5. Tester sur symétrie centrale 5e, dérivée 1re et série de Fourier BTS.
6. Exporter en `workflow_api.json`.
7. Renseigner les IDs de nœuds dans `manifest.json`.
8. Déployer via Comfy API.
9. Renseigner les variables d'environnement du gateway.
