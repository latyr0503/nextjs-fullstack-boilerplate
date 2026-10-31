---
name: Portfolio – Abdoulaye Latyr SENE
description: Vitrine papier chaud, navigation en pastille et scène de bureau illustrée pour un développeur fullstack à Dakar
colors:
  paper: "#f4eee4"
  paper-deep: "#e6dccb"
  ink: "#2c2822"
  ink-soft: "#5c5348"
  orange: "#ff8a1e"
  navy: "#12356e"
  navy-deep: "#0c244d"
  stage-text: "#e7eef8"
  white: "#fffcf7"
typography:
  display:
    fontFamily: "var(--font-urbanist), sans-serif"
    fontSize: "clamp(3.25rem, 7vw, 6.75rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "var(--font-urbanist), sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  title:
    fontFamily: "var(--font-urbanist), sans-serif"
    fontSize: "1.35rem"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "var(--font-urbanist), sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 500
    lineHeight: 1.45
  label:
    fontFamily: "var(--font-urbanist), sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    letterSpacing: "0.04em"
rounded:
  sm: "8px"
  md: "14px"
  lg: "22px"
  xl: "28px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "36px"
  xl: "64px"
  section: "88px"
components:
  button-primary:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
  button-primary-hover:
    backgroundColor: "#ff9a3c"
  nav-pill:
    backgroundColor: "#efe6d6"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "8px 18px"
  project-card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.xl}"
---

# Design System: Portfolio – Abdoulaye Latyr SENE

## Overview

**North star : le studio papier.**

La vitrine se lit comme une pièce claire, en journée, à Dakar : papier chaud, encre brune, un orange réservé à l’action, et un bleu nuit seulement quand la page change de scène (à propos). La navigation est une pastille flottante. Le nom occupe le premier écran. Une illustration de bureau — originale, pas un modèle emprunté — occupe la droite. Les projets sont des images grandes, pas des cartes à icônes.

Le blog, l’auth et le dashboard gardent l’ancien système sombre tant qu’ils ne sont pas refondus.

## Colors

- **Paper** `#f4eee4` : fond de page.
- **Paper deep** `#e6dccb` : pastille de navigation, puits de formulaire.
- **Ink** `#2c2822` : titres et texte d’action sur orange.
- **Ink soft** `#5c5348` : texte secondaire sur papier. Jamais un gris froid.
- **Orange** `#ff8a1e` : un seul bouton d’action, « Écrire ».
- **Navy / Navy deep** : la scène À propos uniquement.
- **Stage text** `#e7eef8` : texte sur le navy.

L’orange ne sert pas de décor. Le navy ne sert pas de fond de page.

## Typography

**Urbanist** pour tout le studio. Poppins reste chargé pour le blog et les écrans non refondus.

Le display est serré, très gras, jusqu’à environ 6.75rem. Le corps reste court, autour de 17px, graisse 500. Les pastilles de section (« Sélection ») sont un petit bandeau incliné, pas une étiquette en capitales au-dessus de chaque bloc.

## Layout

Accueil plein cadre, sans container étroit sur le hero. Le nom est à gauche, la scène à droite, les deux dans le premier écran. Sous 840px, le nom passe au-dessus et la scène prend toute la largeur, collée au bas du hero.

Les titres de section sont alignés à gauche, avec assez de marge haute pour ne jamais passer sous la pastille centrale.

## Components

- **Pastille** : fond paper-deep, lien actif en navy avec texte clair.
- **Bouton Écrire** : orange, texte encre, pilule. Le contraste du blanc sur cet orange est insuffisant, le texte reste encre.
- **Carte projet** : image en coins 28px, titre dessous, une ligne de description. Pas d’ombre portée.
- **Scène** : SVG décoratif, `aria-hidden`.
- **Formulaire** : labels visibles, bordure basse encre, erreur nommée via toast.

## Do's and Don'ts

### Do

- Garder un seul orange, sur l’action principale.
- Laisser le premier écran respirer : nom, rôle, scène.
- Montrer de vrais projets avec leur capture.

### Don't

- Ne pas recopier le personnage, le logo, les modèles ni les textes de david-hckh.com.
- Ne pas remettre le thème terminal indigo sur l’accueil.
- Ne pas couvrir un titre avec la navigation.
- Ne pas masquer « Écrire » sur mobile.
