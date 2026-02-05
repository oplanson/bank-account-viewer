# Issues GitHub pour la Démonstration

Ce document contient les descriptions des issues à créer dans GitHub pour la démonstration BOB Shell.

## Issue #1 - Vulnérabilité de Sécurité: Exposition de Données Sensibles dans les Logs

### Labels
`security`, `bug`, `high-priority`

### Titre
🔒 Security: Sensitive data exposed in server logs

### Description

**Description du problème:**

Le serveur expose des données sensibles (numéros de compte, emails, soldes) dans les logs console. Cela représente une vulnérabilité de sécurité majeure car les logs peuvent être accessibles par des personnes non autorisées.

**Localisation:**
- Fichier: `server.js`
- Lignes: 25-30, 50-56

**Comportement actuel:**
```javascript
console.log('Fetching all accounts:', JSON.stringify(accounts, null, 2));
console.log('Account details:', accounts.map(acc => ({
    id: acc.id,
    owner: acc.owner.email,
    balance: acc.balance,
    accountNumber: acc.accountNumber
})));
```

**Comportement attendu:**
Les logs ne doivent contenir que des informations non sensibles (IDs, timestamps, types d'opérations) sans exposer:
- Numéros de compte complets
- Emails des clients
- Soldes des comptes
- Informations personnelles

**Solution proposée:**
1. Remplacer les logs détaillés par des logs génériques
2. Masquer les données sensibles (ex: `FR76****...***123`)
3. Utiliser un niveau de log approprié (info vs debug)
4. Implémenter une fonction de sanitization des logs

**Impact:**
- Sécurité: HIGH
- Conformité RGPD: Violation potentielle
- Risque: Exposition de données clients

**Reproduction:**
1. Démarrer le serveur: `npm start`
2. Accéder à `http://localhost:3000`
3. Observer la console serveur
4. Constater l'exposition des données sensibles

**Environnement:**
- Node.js: 14+
- Express: 4.18.2

---

## Issue #2 - Bug d'Affichage: Solde Négatif Affiché en Vert

### Labels
`bug`, `ui`, `css`

### Titre
🎨 UI Bug: Negative balance displayed in green instead of red

### Description

**Description du problème:**

Les soldes négatifs sont affichés en vert au lieu de rouge, ce qui est trompeur pour l'utilisateur. Un solde négatif devrait être clairement identifiable visuellement comme un problème.

**Localisation:**
- Fichier: `public/styles.css`
- Ligne: 120

**Comportement actuel:**
```css
.balance-negative {
    color: #27ae60;  /* Vert - INCORRECT */
}
```

**Comportement attendu:**
```css
.balance-negative {
    color: #e74c3c;  /* Rouge - CORRECT */
}
```

**Impact visuel:**
- Le compte de Claire Bernard (ID: 3) a un solde de -150.75€
- Ce solde est affiché en vert, suggérant une situation positive
- L'utilisateur peut ne pas réaliser que le compte est à découvert

**Solution:**
Changer la couleur de `.balance-negative` de `#27ae60` (vert) à `#e74c3c` (rouge)

**Impact:**
- UX: MEDIUM
- Confusion utilisateur: Possible
- Accessibilité: Amélioration nécessaire

**Reproduction:**
1. Démarrer l'application: `npm start`
2. Ouvrir `http://localhost:3000`
3. Observer le compte de Claire Bernard
4. Constater que le solde négatif (-150.75€) est affiché en vert

**Captures d'écran:**
Le solde négatif apparaît en vert au lieu de rouge, ce qui est contre-intuitif.

**Environnement:**
- Navigateurs: Tous
- CSS: styles.css

**Notes additionnelles:**
Cette correction devrait également s'appliquer aux transactions de type "debit" pour maintenir la cohérence visuelle.

---

## Instructions pour Créer les Issues

### Via GitHub CLI (gh)

```bash
# Issue #1 - Sécurité
gh issue create \
  --title "🔒 Security: Sensitive data exposed in server logs" \
  --body-file issue-1-security.md \
  --label "security,bug,high-priority" \
  --repo owner/bank-account-viewer

# Issue #2 - UI
gh issue create \
  --title "🎨 UI Bug: Negative balance displayed in green instead of red" \
  --body-file issue-2-ui.md \
  --label "bug,ui,css" \
  --repo owner/bank-account-viewer
```

### Via Interface Web GitHub

1. Aller sur le repository
2. Cliquer sur "Issues" > "New Issue"
3. Copier-coller le titre et la description
4. Ajouter les labels appropriés
5. Créer l'issue

---

## Corrections Attendues par BOB Shell

### Issue #1 - Correction Sécurité

**Fichier: server.js**

Avant:
```javascript
console.log('Fetching all accounts:', JSON.stringify(accounts, null, 2));
console.log('Account details:', accounts.map(acc => ({
    id: acc.id,
    owner: acc.owner.email,
    balance: acc.balance,
    accountNumber: acc.accountNumber
})));
```

Après:
```javascript
console.log(`Fetching all accounts - Count: ${accounts.length}`);
// Sensitive data removed from logs for security
```

### Issue #2 - Correction UI

**Fichier: public/styles.css**

Avant:
```css
.balance-negative {
    color: #27ae60;  /* BUG: Should be red */
}
```

Après:
```css
.balance-negative {
    color: #e74c3c;  /* Fixed: Red for negative balances */
}
```

---

## Validation des Corrections

### Tests pour Issue #1
1. Démarrer le serveur
2. Faire des requêtes API
3. Vérifier que les logs ne contiennent plus de données sensibles
4. Confirmer que seules les informations génériques sont loggées

### Tests pour Issue #2
1. Ouvrir l'application
2. Vérifier le compte de Claire Bernard
3. Confirmer que le solde négatif est affiché en rouge
4. Vérifier la cohérence sur tous les écrans

---

*Ces issues sont créées intentionnellement pour la démonstration de BOB Shell*