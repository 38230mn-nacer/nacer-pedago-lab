# NACER_VISUAL_PEDAGO_V1

Premier workflow Comfy destiné à devenir un service Nacer OS.

## Rôle

Produire la **couche visuelle** d'un support pédagogique. Les formules, valeurs exactes, labels géométriques et textes longs ne doivent pas être confiés au modèle d'image : ils seront ajoutés ensuite par une couche déterministe.

## Contrat

Le service public associé est `visual-pedago-v1`.

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
- un ou plusieurs assets visuels ;
- identifiant de job Comfy ;
- version du workflow ;
- statut `verification-required`.

## Pour rendre le service LIVE

1. Construire le workflow dans Comfy Cloud avec Comfy Agent.
2. Le nommer `NACER_VISUAL_PEDAGO_V1`.
3. Prévoir un nœud texte unique recevant le prompt du service.
4. Prévoir un nœud de sortie explicite.
5. Tester sur :
   - symétrie centrale 5e ;
   - dérivée 1re ;
   - série de Fourier BTS.
6. Exporter via **File → Export (API)** en `workflow_api.json`.
7. Placer le fichier dans ce dossier.
8. Reporter les IDs de nœuds du prompt et de sortie dans `manifest.json`.
9. Déployer ce workflow via Comfy API.
10. Renseigner `COMFY_BASE_URL`, `COMFY_API_KEY` et `NACER_COMFY_MODE=live`.

Le gateway n'a alors besoin d'aucune modification de code.
