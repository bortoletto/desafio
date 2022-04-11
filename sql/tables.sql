CREATE TABLE accounts (
    account_id INT IDENTITY(1,1) PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE transactions (
    transaction_id INT IDENTITY(1,1),
    transaction_date DATE,
    transaction_type int NOT NULL,
    transaction_amount NUMERIC(10,2) NOT NULL,
    account_id int FOREIGN KEY REFERENCES accounts(account_id)
);