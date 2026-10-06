# Prompt de construction pour Comfy Agent

À utiliser dans Comfy Cloud, dans un nouveau workflow nommé `NACER_VISUAL_PEDAGO_V1`.

---

Construis un workflow réutilisable de génération d'une **couche visuelle pédagogique** destinée à Nacer OS.

## Finalité

Le workflow recevra un prompt long et structuré produit par un service externe. Il doit générer un visuel pédagogique clair, original et stable, utilisable en cours, en visio ou comme base de capsule.

Ce workflow ne doit PAS générer de formules mathématiques, valeurs numériques exactes, tableaux, graphiques exacts ou textes longs : ces éléments seront ajoutés ensuite par une couche déterministe.

## Architecture obligatoire

1. Crée une entrée texte unique et clairement identifiable pour le prompt externe.
2. Fais passer cette entrée dans le modèle de génération d'image le plus adapté et disponible dans mon workspace.
3. Préserve une composition propre, lisible, avec suffisamment d'espace négatif pour ajouter ensuite annotations et formules.
4. Ajoute un contrôle de format/résolution suffisamment standard pour produire au minimum un visuel 16:9.
5. Ajoute une sortie image explicite et unique, facile à repérer dans l'export API.
6. Garde le graph minimal : pas de nœuds décoratifs, pas de branches inutiles.
7. Vérifie le workflow avant exécution.
8. N'ajoute aucun secret ou clé API dans le workflow.

## Règles pédagogiques permanentes

Le visuel doit :
- faire comprendre une idée principale en moins de 5 secondes ;
- avoir une entrée visuelle, une progression et une conclusion ;
- privilégier quelques idées fortes à une accumulation d'éléments ;
- apporter une relation visuelle que le texte exprime difficilement ;
- éviter les clichés graphiques génériques ;
- laisser de l'espace pour l'annotation du professeur ;
- respecter la séquence cognitive de Nacer OS lorsque le prompt précise une étape :
  problème concret -> image/représentation -> intuition -> formalisation -> automatisme -> transfert.

## Règle d'exactitude

N'invente jamais de formule, symbole mathématique, mesure ou valeur numérique. Si le prompt demande une notion mathématique, représente la relation spatialement ou conceptuellement et réserve des zones propres pour les labels déterministes.

## Tests de référence

Après construction, teste le même workflow avec trois prompts distincts :

### Test A — 5e
Symétrie centrale : faire percevoir immédiatement qu'il s'agit d'un demi-tour autour d'un centre, sans utiliser de formule.

### Test B — Première spécialité
Dérivée : faire percevoir le passage d'une variation moyenne à une pente locale/tangente, sans écrire de quotient ni de formule.

### Test C — BTS Électrotechnique
Série de Fourier : faire percevoir qu'un signal périodique complexe peut être reconstruit par superposition de composantes sinusoïdales, sans afficher d'équation.

Pour chaque test, recherche une composition différente adaptée au concept plutôt qu'un template identique.

## Fin de tâche

Lorsque les trois tests sont cohérents :
- conserve le workflow sous le nom `NACER_VISUAL_PEDAGO_V1` ;
- indique clairement quel nœud reçoit le prompt externe ;
- indique clairement quel nœud constitue la sortie finale ;
- ne modifie plus ces interfaces sans augmenter la version du workflow.

---
