// Bank Account Viewer - Frontend JavaScript

const API_BASE_URL = 'http://localhost:3000/api';
let selectedAccountId = null;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadAccounts();
});

// Load all accounts
async function loadAccounts() {
    try {
        const response = await fetch(`${API_BASE_URL}/accounts`);
        const result = await response.json();
        
        if (result.success) {
            displayAccounts(result.data);
        } else {
            showError('Erreur lors du chargement des comptes');
        }
    } catch (error) {
        console.error('Error loading accounts:', error);
        showError('Impossible de charger les comptes');
    }
}

// Display accounts in grid
function displayAccounts(accounts) {
    const container = document.getElementById('accounts-container');
    container.innerHTML = '';
    
    accounts.forEach(account => {
        const card = createAccountCard(account);
        container.appendChild(card);
    });
}

// Create account card element
function createAccountCard(account) {
    const card = document.createElement('div');
    card.className = 'account-card';
    card.onclick = () => selectAccount(account.id);
    
    const balanceClass = account.balance >= 0 ? 'balance-positive' : 'balance-negative';
    
    card.innerHTML = `
        <div class="account-header">
            <span class="account-type">${account.accountType}</span>
        </div>
        <div class="account-owner">${account.owner.firstName} ${account.owner.lastName}</div>
        <div class="account-number">${formatAccountNumber(account.accountNumber)}</div>
        <div class="account-balance ${balanceClass}">
            ${formatCurrency(account.balance)}
        </div>
        <span class="account-status status-${account.status}">${account.status}</span>
    `;
    
    return card;
}

// Select an account and show details
async function selectAccount(accountId) {
    selectedAccountId = accountId;
    
    // Update card selection
    document.querySelectorAll('.account-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.target.closest('.account-card').classList.add('selected');
    
    // Load account details
    await loadAccountDetails(accountId);
    
    // Load transactions
    await loadTransactions(accountId);
    
    // Show details section
    document.getElementById('details-section').style.display = 'block';
    
    // Scroll to details
    document.getElementById('details-section').scrollIntoView({ behavior: 'smooth' });
}

// Load account details
async function loadAccountDetails(accountId) {
    try {
        const response = await fetch(`${API_BASE_URL}/accounts/${accountId}`);
        const result = await response.json();
        
        if (result.success) {
            displayAccountDetails(result.data);
        }
    } catch (error) {
        console.error('Error loading account details:', error);
        showError('Impossible de charger les détails du compte');
    }
}

// Display account details
function displayAccountDetails(account) {
    const container = document.getElementById('account-details');
    
    const balanceClass = account.balance >= 0 ? 'balance-positive' : 'balance-negative';
    
    container.innerHTML = `
        <div class="detail-row">
            <span class="detail-label">Titulaire</span>
            <span class="detail-value">${account.owner.firstName} ${account.owner.lastName}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Email</span>
            <span class="detail-value">${account.owner.email}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Téléphone</span>
            <span class="detail-value">${account.owner.phone}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Numéro de compte</span>
            <span class="detail-value">${formatAccountNumber(account.accountNumber)}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Type de compte</span>
            <span class="detail-value">${account.accountType}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Solde actuel</span>
            <span class="detail-value ${balanceClass}" style="font-size: 1.5em; font-weight: bold;">
                ${formatCurrency(account.balance)}
            </span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Date d'ouverture</span>
            <span class="detail-value">${formatDate(account.openedDate)}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Statut</span>
            <span class="detail-value">
                <span class="account-status status-${account.status}">${account.status}</span>
            </span>
        </div>
    `;
}

// Load transactions
async function loadTransactions(accountId) {
    try {
        const response = await fetch(`${API_BASE_URL}/transactions/${accountId}`);
        const result = await response.json();
        
        if (result.success) {
            displayTransactions(result.data);
        }
    } catch (error) {
        console.error('Error loading transactions:', error);
        showError('Impossible de charger les transactions');
    }
}

// Display transactions table
function displayTransactions(transactions) {
    const container = document.getElementById('transactions-container');
    
    if (transactions.length === 0) {
        container.innerHTML = '<p class="loading">Aucune transaction disponible</p>';
        return;
    }
    
    let tableHTML = `
        <table class="transactions-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th style="text-align: right;">Montant</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    transactions.forEach(transaction => {
        const amountClass = transaction.type === 'credit' ? 'transaction-credit' : 'transaction-debit';
        const amountSign = transaction.amount >= 0 ? '+' : '';
        
        tableHTML += `
            <tr>
                <td>${formatDate(transaction.date)}</td>
                <td>${transaction.description}</td>
                <td>${transaction.type === 'credit' ? 'Crédit' : 'Débit'}</td>
                <td class="${amountClass}" style="text-align: right;">
                    ${amountSign}${formatCurrency(transaction.amount)}
                </td>
            </tr>
        `;
    });
    
    tableHTML += `
            </tbody>
        </table>
    `;
    
    container.innerHTML = tableHTML;
}

// Utility functions

function formatCurrency(amount) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount);
}

function formatAccountNumber(accountNumber) {
    // Format: FR76 1234 5678 9012 3456 7890 123
    return accountNumber.replace(/(.{4})/g, '$1 ').trim();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

function showError(message) {
    const container = document.getElementById('accounts-container');
    container.innerHTML = `<div class="error">${message}</div>`;
}