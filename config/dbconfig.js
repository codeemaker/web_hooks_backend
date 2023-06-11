import sqlite3 from "sqlite3";

function connectDB() {
    const db = new sqlite3.Database('data.db');
  
    db.serialize(() => {
      db.run('CREATE TABLE IF NOT EXISTS userPayments (id INTEGER PRIMARY KEY, paidFrom INTEGER, paidTo INTEGER, Amount INTEGER, shortText TEXT, paymentId TEXT, payment_paid_date datetime default current_timestamp)');
      db.run('CREATE TABLE IF NOT EXISTS userAccounts (id INTEGER PRIMARY KEY, email TEXT UNIQUE, name TEXT, token TEXT, password TEXT)');
      db.run('CREATE TABLE IF NOT EXISTS destinations (id INTEGER PRIMARY KEY, accountId INTEGER, url TEXT, action TEXT, created_date datetime default current_timestamp, FOREIGN KEY (accountId) REFERENCES userAccounts(id) ON DELETE CASCADE)');
    });
  
    return db;
  }
  
  export default connectDB;
  