# HARATO — Mpanarato Olona

Application web full-stack pour la mission chrétienne malgache HARATO.

## Stack
- Frontend : React 18, Vite, React Router 6, Tailwind CSS 3, Framer Motion
- Backend : Node.js, Express, API REST
- Données : MongoDB/Mongoose si `MONGODB_URI` est défini ; sinon stockage JSON local dans `backend/.data`
- Authentification admin : JWT facultatif, activable avec `ADMIN_PASSWORD` et `JWT_SECRET`

## Démarrage local

Prérequis : Node.js 18+ et npm.

```bash
npm install
npm run install:all
```

Copier `backend/.env.example` vers `backend/.env`, puis configurer les variables si nécessaire.

```bash
npm run dev
```

Frontend : http://localhost:5173  
API : http://localhost:5000/api  
Santé : http://localhost:5000/health

Le mode JSON de secours est automatiquement utilisé si `MONGODB_URI` est absent. Les données sont écrites dans `backend/.data/` (ne pas utiliser ce stockage éphémère pour une production Render).

## Admin
- URL : http://localhost:5173/admin
- Si `ADMIN_PASSWORD` n'est pas configuré, les routes d'administration sont ouvertes (mode développement).
- Pour activer la protection, définir `ADMIN_PASSWORD` et `JWT_SECRET` dans l'environnement backend. La page `/admin/login` demandera le mot de passe.
- Les opérations CRUD utilisent le token JWT lorsque l'authentification est activée.

## Déploiement

### Backend sur Render
Créer un Web Service depuis le dépôt :
- Root Directory : `backend`
- Build Command : `npm install`
- Start Command : `npm start`
- Variables : `MONGODB_URI`, `JWT_SECRET`, `ADMIN_PASSWORD`, `CLIENT_ORIGIN`

Pour une persistance durable, connecter MongoDB Atlas. Le stockage JSON local n'est qu'un fallback de développement.

### Frontend sur Vercel
- Root Directory : `frontend`
- Framework : Vite
- Build Command : `npm run build`
- Output Directory : `dist`
- Variable : `VITE_API_URL=https://votre-api.onrender.com/api`

Ajouter le domaine frontend dans `CLIENT_ORIGIN` côté backend (ou plusieurs origines séparées par des virgules).

### Netlify
Base directory `frontend`, build `npm run build`, publish directory `dist`, variable `VITE_API_URL` comme ci-dessus.

## Collections / API
- `hafatra` : `GET/POST /api/hafatra`, `GET/PUT/DELETE /api/hafatra/:id`
- `fangatahana` : `GET/POST /api/fangatahana`, `GET/PUT/DELETE /api/fangatahana/:id`
- `POST /api/auth/login` : connexion admin
- `GET /health`

Champs d'un enseignement : `lohateny`, `andininy`, `sokajy`, `votoatiny`, `daty`.
Catégories : `Didy Folo`, `Famonjena`, `Fampitandremana`, `Fitiavana`, `Mpanarato`.

## Remarques
- Le logo fourni dans l'archive d'origine est conservé dans `frontend/public/assets/logo.jpg`.
- Les 6 enseignements de départ sont insérés automatiquement lorsque la collection est vide.
- Les demandes de prière sont privées côté interface publique : seules les personnes administrant le site peuvent les consulter.
