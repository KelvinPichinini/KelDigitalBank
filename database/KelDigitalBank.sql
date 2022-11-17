DROP SCHEMA IF EXISTS KelDigitalBank;
CREATE SCHEMA KelDigitalBank;

CREATE TABLE KelDigitalBank.Users (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  accountId INTEGER NOT NULL,
  FOREIGN KEY (accountId) REFERENCES KelDigitalBank.Accounts (id)
);

CREATE TABLE KelDigitalBank.Accounts (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  balance TEXT NOT NULL,
);

CREATE TABLE KelDigitalBank.Transactions (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  value TEXT NOT NULL,
  debitedAccountId TEXT NOT NULL,
  creditedAccountId TEXT NOT NULL,
  FOREIGN KEY (debitedAccountId) REFERENCES KelDigitalBank.Accounts (id),
  FOREIGN KEY (creditedAccountId) REFERENCES KelDigitalBank.Accounts (id)
);