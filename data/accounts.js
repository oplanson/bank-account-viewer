// In-memory data store for bank accounts
// This simulates a database without requiring actual database setup

const accounts = [
  {
    id: 1,
    accountNumber: "FR7612345678901234567890123",
    accountType: "Compte Courant",
    owner: {
      firstName: "Alice",
      lastName: "Martin",
      email: "alice.martin@example.com",
      phone: "+33 6 12 34 56 78"
    },
    balance: 2500.50,
    currency: "EUR",
    openedDate: "2020-01-15",
    status: "active"
  },
  {
    id: 2,
    accountNumber: "FR7698765432109876543210987",
    accountType: "Compte Épargne",
    owner: {
      firstName: "Bob",
      lastName: "Dupont",
      email: "bob.dupont@example.com",
      phone: "+33 6 98 76 54 32"
    },
    balance: 15000.00,
    currency: "EUR",
    openedDate: "2019-06-20",
    status: "active"
  },
  {
    id: 3,
    accountNumber: "FR7611223344556677889900112",
    accountType: "Compte Courant",
    owner: {
      firstName: "Claire",
      lastName: "Bernard",
      email: "claire.bernard@example.com",
      phone: "+33 6 11 22 33 44"
    },
    balance: -150.75,  // Negative balance - will cause display issue
    currency: "EUR",
    openedDate: "2021-03-10",
    status: "active"
  }
];

const transactions = {
  1: [
    { id: 101, date: "2026-02-01", description: "Salaire", amount: 2500.00, type: "credit" },
    { id: 102, date: "2026-02-02", description: "Loyer", amount: -800.00, type: "debit" },
    { id: 103, date: "2026-02-03", description: "Courses", amount: -125.50, type: "debit" },
    { id: 104, date: "2026-02-04", description: "Restaurant", amount: -45.00, type: "debit" }
  ],
  2: [
    { id: 201, date: "2026-01-15", description: "Virement épargne", amount: 500.00, type: "credit" },
    { id: 202, date: "2026-01-20", description: "Intérêts", amount: 12.50, type: "credit" }
  ],
  3: [
    { id: 301, date: "2026-02-01", description: "Salaire", amount: 1800.00, type: "credit" },
    { id: 302, date: "2026-02-02", description: "Loyer", amount: -950.00, type: "debit" },
    { id: 303, date: "2026-02-03", description: "Courses", amount: -200.00, type: "debit" },
    { id: 304, date: "2026-02-04", description: "Facture électricité", amount: -150.75, type: "debit" },
    { id: 305, date: "2026-02-05", description: "Essence", amount: -650.00, type: "debit" }
  ]
};

module.exports = {
  accounts,
  transactions
};