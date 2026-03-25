# GAULS BASTARDS - Site Vitrine Moto Club

## Projet
Site vitrine optimisé SEO pour le moto club **GAULS BASTARDS**, association de motards custom basée à Marseille (13).

## Informations Club
- **Nom**: GAULS BASTARDS
- **Slogan**: RIDE CUSTOM
- **Fondation**: 1er septembre 2025
- **Localisation**: Marseille, Bouches-du-Rhône (13)
- **Types de motos**: Custom (Harley-Davidson, Indian, Shadow)
- **Ouverture**: Hommes, femmes, 125cc acceptés

## Réseaux Sociaux
- Facebook: https://www.facebook.com/GAULSBASTARDS
- Instagram: @gauls.bastards
- TikTok: @gauls13

---

## Architecture Technique

### Frontend (React + Tailwind CSS)
- `/app/frontend/src/App.js` - Application principale avec tous les composants
- `/app/frontend/src/index.css` - Styles globaux, thème old school biker
- `/app/frontend/public/index.html` - SEO meta tags, structured data

### Backend (FastAPI + MongoDB)
- `/app/backend/server.py` - API avec endpoint contact
- Collection MongoDB: `contact_messages`

### Endpoints API
- `GET /api/health` - Health check
- `POST /api/contact` - Soumission formulaire contact
- `GET /api/contact/messages` - Liste des messages (admin)

---

## Ce qui a été implémenté ✅

### Pages/Sections (Date: 25 Mars 2026)
1. **Hero** - Logo, titre, tagline, photo membres avec motos, CTAs
2. **Qui Sommes-Nous** - Description, valeurs (Fraternité, Passion, Liberté, Respect)
3. **Événements** - Calendrier des prochaines balades (4 événements exemple)
4. **Galerie** - 12 photos avec lightbox (clic pour agrandir)
5. **Contact** - Formulaire (Nom, Email, Téléphone optionnel, Message)
6. **Footer** - Réseaux sociaux, mots-clés SEO

### SEO Optimisé
- Meta title/description
- Open Graph tags (Facebook)
- Twitter Cards
- Geo tags (Marseille, 13)
- Schema.org structured data (Organization)
- Mots-clés: moto club marseille, association motard 13, balade moto bouches du rhône, etc.

### Design
- Style: Old school / Vintage Biker
- Couleurs: Noir, gris, or (accents)
- Typographies: Anton (display), Oswald (headings), Source Sans 3 (body)
- Responsive (mobile, tablette, desktop)
- Navigation fixe avec menu mobile

---

## Backlog / Améliorations Futures

### P0 (Priorité haute)
- [ ] Ajouter un vrai email de notification quand quelqu'un soumet le formulaire

### P1 (Priorité moyenne)
- [ ] Page admin pour voir/gérer les messages de contact
- [ ] Intégration Google Maps pour les points de rendez-vous
- [ ] Blog/Actualités pour le SEO

### P2 (Nice to have)
- [ ] Calendrier interactif des événements avec inscription
- [ ] Espace membres avec authentification
- [ ] Galerie avec upload photos par les membres
- [ ] Newsletter avec inscription

---

## Prochaines Actions
1. Acheter et configurer un nom de domaine (ex: gaulsbastards.fr)
2. Configurer Google Search Console et Analytics
3. Ajouter plus de photos au fur et à mesure des balades
4. Mettre à jour les événements régulièrement
