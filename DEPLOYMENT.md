# Guide de Déploiement - Bank Account Viewer

## 📋 Prérequis

- Node.js 14+ installé
- npm ou yarn
- Git
- GitHub CLI (gh) pour créer les issues automatiquement
- Compte GitHub avec droits de création de repository

## 🚀 Étape 1: Créer le Repository GitHub

### Option A: Via GitHub CLI

```bash
# Créer un nouveau repository
gh repo create bank-account-viewer \
  --public \
  --description "Simple bank account viewer - BOB Shell demo application" \
  --clone

cd bank-account-viewer
```

### Option B: Via Interface Web

1. Aller sur https://github.com/new
2. Nom: `bank-account-viewer`
3. Description: "Simple bank account viewer - BOB Shell demo application"
4. Public
5. Créer le repository

```bash
git clone https://github.com/VOTRE-USERNAME/bank-account-viewer.git
cd bank-account-viewer
```

## 📦 Étape 2: Copier le Code

```bash
# Depuis le répertoire demos-ao
cp -r demo-03-BOBShell/sample-app/* bank-account-viewer/

cd bank-account-viewer
```

## 🔧 Étape 3: Initialiser le Projet

```bash
# Installer les dépendances
npm install

# Tester l'application
npm start
```

Ouvrir http://localhost:3000 pour vérifier que l'application fonctionne.

## 📝 Étape 4: Commit Initial

```bash
# Ajouter tous les fichiers
git add .

# Commit initial
git commit -m "Initial commit: Bank Account Viewer with intentional bugs for BOB Shell demo

- Node.js/Express backend
- Vanilla JS frontend
- In-memory data storage
- 2 intentional bugs:
  * Security: Sensitive data in logs
  * UI: Negative balance color"

# Pousser vers GitHub
git push origin main
```

## 🐛 Étape 5: Créer les Issues

### Option A: Script Automatique

```bash
# Créer les issues automatiquement
./create-issues.sh
```

### Option B: Manuellement via GitHub CLI

```bash
# Issue #1 - Sécurité
gh issue create \
  --title "🔒 Security: Sensitive data exposed in server logs" \
  --body "**Description:**
Le serveur expose des données sensibles dans les logs console.

**Fichier:** server.js (lignes 25-30, 50-56)

**Impact:** HIGH - Violation RGPD potentielle

**Solution:** Remplacer les logs détaillés par des logs génériques sans données sensibles." \
  --label "security,bug,high-priority"

# Issue #2 - UI
gh issue create \
  --title "🎨 UI Bug: Negative balance displayed in green instead of red" \
  --body "**Description:**
Les soldes négatifs sont affichés en vert au lieu de rouge.

**Fichier:** public/styles.css (ligne 120)

**Impact:** MEDIUM - Confusion utilisateur

**Solution:** Changer .balance-negative de #27ae60 (vert) à #e74c3c (rouge)" \
  --label "bug,ui,css"
```

### Option C: Via Interface Web

Voir le fichier `ISSUES.md` pour les descriptions complètes à copier-coller.

## ✅ Étape 6: Vérification

```bash
# Vérifier les issues créées
gh issue list

# Devrait afficher:
# #1  🔒 Security: Sensitive data exposed in server logs  security, bug, high-priority
# #2  🎨 UI Bug: Negative balance displayed in green...    bug, ui, css
```

## 🎯 Étape 7: Configuration pour BOB Shell

Mettre à jour le fichier de configuration de la démo:

```bash
cd ../demo-03-BOBShell/00-Inputs
nano variables.env
```

Configurer:
```bash
GITHUB_REPO="VOTRE-USERNAME/bank-account-viewer"
GITHUB_TOKEN="ghp_votre_token"
```

## 🧪 Étape 8: Tester la Démo

```bash
cd ../02-Scripts

# Test en dry-run
./orchestrator.sh --dry-run --max-issues 2

# Exécution réelle
./orchestrator.sh --max-issues 2
```

## 📊 Structure Finale du Repository

```
bank-account-viewer/
├── .gitignore
├── README.md
├── ISSUES.md
├── DEPLOYMENT.md
├── package.json
├── server.js
├── data/
│   └── accounts.js
└── public/
    ├── index.html
    ├── styles.css
    └── app.js
```

## 🔍 Vérification des Bugs

### Bug #1 - Sécurité

```bash
# Démarrer le serveur
npm start

# Dans un autre terminal, faire une requête
curl http://localhost:3000/api/accounts

# Observer la console du serveur
# Vous devriez voir les données sensibles loggées
```

### Bug #2 - UI

1. Ouvrir http://localhost:3000
2. Observer le compte de Claire Bernard
3. Le solde négatif (-150.75€) est affiché en VERT
4. Il devrait être en ROUGE

## 🎬 Démonstration

Une fois tout configuré:

1. **Montrer l'application** avec les bugs
2. **Montrer les issues** dans GitHub
3. **Lancer BOB Shell** pour corriger automatiquement
4. **Vérifier les PRs** créées
5. **Merger les corrections**
6. **Vérifier** que les bugs sont corrigés

## 🔧 Dépannage

### Erreur: Port 3000 déjà utilisé

```bash
# Trouver le processus
lsof -i :3000

# Tuer le processus
kill -9 PID
```

### Erreur: npm install échoue

```bash
# Nettoyer le cache
npm cache clean --force

# Réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Issues non créées

```bash
# Vérifier l'authentification GitHub CLI
gh auth status

# Se reconnecter si nécessaire
gh auth login
```

## 📞 Support

Pour toute question sur le déploiement:
- Consulter `README.md` de l'application
- Consulter `ISSUES.md` pour les détails des bugs
- Vérifier les logs du serveur

---

**Note:** Cette application contient intentionnellement des bugs pour la démonstration de BOB Shell. Ne pas utiliser en production!