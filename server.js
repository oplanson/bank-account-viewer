const express = require('express');
const cors = require('cors');
const path = require('path');
const { accounts, transactions } = require('./data/accounts');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// API Routes

// Get all accounts
app.get('/api/accounts', (req, res) => {
  // BUG #1 - SECURITY ISSUE: Logging sensitive data
  // This is intentional for the demo - BOB Shell should fix this
  console.log('Fetching all accounts:', JSON.stringify(accounts, null, 2));
  console.log('Account details:', accounts.map(acc => ({
    id: acc.id,
    owner: acc.owner.email,
    balance: acc.balance,
    accountNumber: acc.accountNumber
  })));
  
  res.json({
    success: true,
    data: accounts,
    count: accounts.length
  });
});

// Get account by ID
app.get('/api/accounts/:id', (req, res) => {
  const accountId = parseInt(req.params.id);
  const account = accounts.find(acc => acc.id === accountId);
  
  if (!account) {
    return res.status(404).json({
      success: false,
      error: 'Account not found'
    });
  }
  
  // BUG #1 - SECURITY ISSUE: Logging sensitive account details
  console.log(`Account ${accountId} accessed:`, {
    accountNumber: account.accountNumber,
    owner: account.owner,
    balance: account.balance
  });
  
  res.json({
    success: true,
    data: account
  });
});

// Get transactions for an account
app.get('/api/transactions/:accountId', (req, res) => {
  const accountId = parseInt(req.params.accountId);
  const accountTransactions = transactions[accountId];
  
  if (!accountTransactions) {
    return res.status(404).json({
      success: false,
      error: 'No transactions found for this account'
    });
  }
  
  res.json({
    success: true,
    data: accountTransactions,
    count: accountTransactions.length
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Serve index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║   Bank Account Viewer - Demo Application  ║
╚════════════════════════════════════════════╝

Server running on: http://localhost:${PORT}
Environment: ${process.env.NODE_ENV || 'development'}

⚠️  Known Issues (for demo):
  - Issue #1: Security - Sensitive data in logs
  - Issue #2: UI - Negative balance display

Press Ctrl+C to stop the server
  `);
});

module.exports = app;