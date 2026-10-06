# Prompt Comfy Agent — NACER_CREER_VISUEL_PEDAGOGIQUE_V1

Construis un workflow réutilisable de création de **visuels pédagogiques** pour Nacer OS.

## But
Recevoir un prompt pédagogique structuré et produire un visuel clair, original, stable et exploitable en cours, visio ou capsule.

## Contraintes
- Une seule entrée texte clairement identifiable.
- Une seule sortie image finale clairement identifiable.
- Graph minimal et lisible.
- Format 16:9 au minimum.
- Espace prévu pour annotations et formules ajoutées ensuite.
- Aucun secret ni clé API dans le workflow.
- Ne jamais inventer de formule, valeur, mesure, symbole ou texte mathématique exact.

## Règles pédagogiques
Le visuel doit :
- faire comprendre l'idée principale en moins de 5 secondes ;
- guider l'œil : entrée → progression → conclusion ;
- privilégier quelques éléments forts ;
- révéler une relation utile, pas décorer ;
- éviter les clichés graphiques génériques ;
- respecter, selon le besoin :
  problème concret → image/représentation → intuition → formalisation → automatisme → transfert.

## Tests obligatoires
1. Symétrie centrale 5e : faire percevoir le demi-tour autour d'un centre.
2. Dérivée 1re : faire percevoir le passage vers la pente locale/tangente.
3. Série de Fourier BTS : faire percevoir la reconstruction d'un signal périodique par superposition de composantes sinusoïdales.

Quand les trois tests sont cohérents :
- conserver le nom `NACER_CREER_VISUEL_PEDAGOGIQUE_V1` ;
- indiquer l'ID du nœud d'entrée prompt ;
- indiquer l'ID du nœud de sortie ;
- ne plus modifier ces interfaces sans changer de version.
