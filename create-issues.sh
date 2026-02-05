#!/bin/bash

# create-issues.sh
# Script to automatically create GitHub issues for the demo

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}=========================================="
echo "Creating GitHub Issues for Demo"
echo "==========================================${NC}"
echo ""

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}Error: GitHub CLI (gh) is not installed${NC}"
    echo "Install it from: https://cli.github.com/"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo -e "${RED}Error: Not authenticated with GitHub CLI${NC}"
    echo "Run: gh auth login"
    exit 1
fi

# Get repository info
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || echo "")

if [ -z "$REPO" ]; then
    echo -e "${YELLOW}Warning: Not in a GitHub repository${NC}"
    echo -n "Enter repository (owner/repo): "
    read REPO
fi

echo -e "${GREEN}Repository: $REPO${NC}"
echo ""

# Issue #1 - Security
echo -e "${BLUE}Creating Issue #1 - Security...${NC}"

ISSUE1_BODY="**Description du problème:**

Le serveur expose des données sensibles (numéros de compte, emails, soldes) dans les logs console. Cela représente une vulnérabilité de sécurité majeure car les logs peuvent être accessibles par des personnes non autorisées.

**Localisation:**
- Fichier: \`server.js\`
- Lignes: 25-30, 50-56

**Comportement actuel:**
\`\`\`javascript
console.log('Fetching all accounts:', JSON.stringify(accounts, null, 2));
console.log('Account details:', accounts.map(acc => ({
    id: acc.id,
    owner: acc.owner.email,
    balance: acc.balance,
    accountNumber: acc.accountNumber
})));
\`\`\`

**Comportement attendu:**
Les logs ne doivent contenir que des informations non sensibles (IDs, timestamps, types d'opérations) sans exposer:
- Numéros de compte complets
- Emails des clients
- Soldes des comptes
- Informations personnelles

**Solution proposée:**
1. Remplacer les logs détaillés par des logs génériques
2. Masquer les données sensibles (ex: \`FR76****...***123\`)
3. Utiliser un niveau de log approprié (info vs debug)
4. Implémenter une fonction de sanitization des logs

**Impact:**
- Sécurité: HIGH
- Conformité RGPD: Violation potentielle
- Risque: Exposition de données clients

**Reproduction:**
1. Démarrer le serveur: \`npm start\`
2. Accéder à \`http://localhost:3000\`
3. Observer la console serveur
4. Constater l'exposition des données sensibles"

gh issue create \
    --repo "$REPO" \
    --title "🔒 Security: Sensitive data exposed in server logs" \
    --body "$ISSUE1_BODY" \
    --label "security,bug,high-priority" && \
    echo -e "${GREEN}✓ Issue #1 created${NC}" || \
    echo -e "${RED}✗ Failed to create Issue #1${NC}"

echo ""

# Issue #2 - UI Bug
echo -e "${BLUE}Creating Issue #2 - UI Bug...${NC}"

ISSUE2_BODY="**Description du problème:**

Les soldes négatifs sont affichés en vert au lieu de rouge, ce qui est trompeur pour l'utilisateur. Un solde négatif devrait être clairement identifiable visuellement comme un problème.

**Localisation:**
- Fichier: \`public/styles.css\`
- Ligne: 120

**Comportement actuel:**
\`\`\`css
.balance-negative {
    color: #27ae60;  /* Vert - INCORRECT */
}
\`\`\`

**Comportement attendu:**
\`\`\`css
.balance-negative {
    color: #e74c3c;  /* Rouge - CORRECT */
}
\`\`\`

**Impact visuel:**
- Le compte de Claire Bernard (ID: 3) a un solde de -150.75€
- Ce solde est affiché en vert, suggérant une situation positive
- L'utilisateur peut ne pas réaliser que le compte est à découvert

**Solution:**
Changer la couleur de \`.balance-negative\` de \`#27ae60\` (vert) à \`#e74c3c\` (rouge)

**Impact:**
- UX: MEDIUM
- Confusion utilisateur: Possible
- Accessibilité: Amélioration nécessaire

**Reproduction:**
1. Démarrer l'application: \`npm start\`
2. Ouvrir \`http://localhost:3000\`
3. Observer le compte de Claire Bernard
4. Constater que le solde négatif (-150.75€) est affiché en vert"

gh issue create \
    --repo "$REPO" \
    --title "🎨 UI Bug: Negative balance displayed in green instead of red" \
    --body "$ISSUE2_BODY" \
    --label "bug,ui,css" && \
    echo -e "${GREEN}✓ Issue #2 created${NC}" || \
    echo -e "${RED}✗ Failed to create Issue #2${NC}"

echo ""
echo -e "${GREEN}=========================================="
echo "Issues Created Successfully!"
echo "==========================================${NC}"
echo ""

# List created issues
echo -e "${BLUE}Created issues:${NC}"
gh issue list --repo "$REPO" --limit 5

echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Verify issues on GitHub"
echo "2. Configure BOB Shell demo with this repository"
echo "3. Run the orchestrator to auto-fix these issues"
echo ""