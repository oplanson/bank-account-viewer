# Bank Account Viewer - Sample Application

## Description

Application web simple pour visualiser des comptes bancaires. Cette application est utilisée comme base de démonstration pour BOB Shell.

## ⚠️ Anomalies Connues

Cette application contient **intentionnellement** 2 anomalies pour la démonstration:

1. **Issue #1 - Vulnérabilité de sécurité**: Exposition de données sensibles dans les logs
2. **Issue #2 - Problème graphique**: Affichage incorrect du solde négatif

## Architecture

- **Backend**: Node.js + Express
- **Frontend**: HTML/CSS/JavaScript vanilla
- **Stockage**: Cache en mémoire (pas de base de données)

## Installation

```bash
npm install
```

## Démarrage

```bash
npm start
```

L'application sera accessible sur http://localhost:3000

## Structure

```
sample-app/
├── package.json
├── server.js           # Serveur Express
├── data/
│   └── accounts.js     # Données des comptes en mémoire
├── public/
│   ├── index.html      # Page principale
│   ├── styles.css      # Styles CSS
│   └── app.js          # JavaScript frontend
└── README.md
```

## API Endpoints

- `GET /api/accounts` - Liste tous les comptes
- `GET /api/accounts/:id` - Détails d'un compte
- `GET /api/transactions/:accountId` - Transactions d'un compte

## Données de Test

L'application contient 3 comptes clients fictifs:
- Alice Martin (Compte Courant)
- Bob Dupont (Compte Épargne)
- Claire Bernard (Compte Courant)

## Pour la Démonstration

1. Démarrer l'application
2. Observer les anomalies
3. Créer les issues dans GitHub
4. Lancer BOB Shell pour les corriger automatiquement

---

*Application de démonstration - Ne pas utiliser en production*