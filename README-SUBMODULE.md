# Sample App - Git Submodule

## 📦 À propos

Ce répertoire est un **sous-module Git** pointant vers le repository:
**https://github.com/oplanson/bank-account-viewer**

## 🔄 Utilisation du Sous-module

### Cloner le repository principal avec les sous-modules

```bash
git clone --recurse-submodules https://github.com/votre-repo/demos-ao.git
```

### Si déjà cloné sans les sous-modules

```bash
git submodule init
git submodule update
```

### Mettre à jour le sous-module vers la dernière version

```bash
cd demo-04-BOBShell/sample-app
git pull origin main
cd ../..
git add demo-04-BOBShell/sample-app
git commit -m "Update sample-app submodule"
```

### Vérifier l'état du sous-module

```bash
git submodule status
```

## 📝 Pourquoi un sous-module?

L'application `bank-account-viewer` est maintenue dans son propre repository pour:

1. **Séparation des préoccupations** - L'app peut évoluer indépendamment
2. **Réutilisabilité** - Peut être utilisée dans d'autres contextes
3. **Versioning indépendant** - Versions distinctes de l'app et de la démo
4. **Issues GitHub** - Les issues sont gérées dans le repository de l'app
5. **Pull Requests** - Les corrections BOB Shell créent des PRs dans l'app

## 🔗 Liens

- **Repository de l'app**: https://github.com/oplanson/bank-account-viewer
- **Issues**: https://github.com/oplanson/bank-account-viewer/issues
- **Documentation complète**: Voir le README.md dans ce répertoire

## ⚠️ Important

Ne modifiez pas directement les fichiers dans ce sous-module depuis le repository principal. 
Faites les modifications dans le repository `bank-account-viewer` et mettez à jour le sous-module.