## 📊 **Database: `portfolio_manager`**

This database is designed to support a personal asset management system that tracks cash accounts, portfolio holdings, market assets, transactions, and daily snapshots.

------

### 📁 1. Table: `users`

Stores user account information.

| Field           | Type         | Description                   |
| --------------- | ------------ | ----------------------------- |
| `id`            | CHAR(36)     | Unique user identifier (UUID) |
| `username`      | VARCHAR(50)  | Unique username               |
| `email`         | VARCHAR(100) | User email (optional, unique) |
| `password_hash` | VARCHAR(255) | Hashed user password          |
| `balance`       | DECIMAL(12, 2)| Current account balance      |
| `created_at`    | TIMESTAMP    | Account creation time         |
| `updated_at`    | TIMESTAMP    | Last modification time        |

------

### 📁 2. Table: `cash_transfers_record`

Records fund transfers between a user’s accounts.

| Field           | Type           | Description               |
| --------------- | -------------- | ------------------------- |
| `id`            | CHAR(36)       | Unique transfer ID        |
| `user_id`       | CHAR(36)       | Related user ID           |
| `amount`        | DECIMAL(12, 2) | Money                     |
| `comment`       | TEXT           | Optional note             |
| `transfer_date` | TIMESTAMP      | Timestamp of the transfer |

------

### 📁 3. Table: `holdings`

Tracks the user’s current portfolio holdings.

| Field           | Type           | Description                         |
| --------------- | -------------- | ----------------------------------- |
| `id`            | CHAR(36)       | Unique holding ID                   |
| `user_id`       | CHAR(36)       | Related user ID                     |
| `asset_code`    | VARCHAR(50)    | Asset code (FK to `market_assets`)  |
| `quantity`      | DECIMAL(12, 2) | Number of units/shares held         |
| `average_price` | DECIMAL(10, 2) | Average purchase price              |
| `account_id`    | CHAR(36)       | Account in which the holding exists |
| `created_at`    | TIMESTAMP      | Time of initial holding             |
| `updated_at`    | TIMESTAMP      | Last modification time              |

------

### 📁 4. Table: `transactions`

Stores detailed buy/sell transactions for each user.

| Field              | Type           | Description                                |
| ------------------ | -------------- | ------------------------------------------ |
| `id`               | CHAR(36)       | Unique transaction ID                      |
| `user_id`          | CHAR(36)       | Linked user ID                             |
| `asset_code`       | VARCHAR(50)    | Asset being traded                         |
| `transaction_type` | ENUM           | Either `buy` or `sell`                     |
| `quantity`         | DECIMAL(12, 2) | Number of units traded                     |
| `price`            | DECIMAL(10, 2) | Price per unit                             |
| `total_amount`     | DECIMAL(12, 2) | Total transaction value (quantity × price) |
| `account_id`       | CHAR(36)       | Account used for transaction               |
| `transaction_date` | TIMESTAMP      | Date and time of the transaction           |

------

### 📁 5. Table: `portfolio_snapshots`

Daily snapshot of each user's portfolio value and profit.

| Field             | Type           | Description                |
| ----------------- | -------------- | -------------------------- |
| `id`              | CHAR(36)       | Unique snapshot ID         |
| `user_id`         | CHAR(36)       | Linked user ID             |
| `snapshot_date`   | DATE           | Date of the snapshot       |
| `total_cash`      | DECIMAL(12, 2) | Total cash at the time     |
| `total_stock`     | DECIMAL(12, 2) | Total stock market value   |
| `total_fund`      | DECIMAL(12, 2) | Total fund market value    |
| `total_value`     | DECIMAL(12, 2) | Combined total asset value |
| `profit_day`      | DECIMAL(12, 2) | Profit earned that day     |
| `profit_rate_day` | DECIMAL(5, 2)  | Daily profit rate (%)      |


CREATE DATABASE IF NOT EXISTS finance_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE finance_db;

-- 1. users表，存储用户账户信息
CREATE TABLE users (
  id CHAR(36) NOT NULL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  balance DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. cash_transfers_record表，记录用户账户间资金转账
CREATE TABLE cash_transfers_record (
  id CHAR(36) NOT NULL PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  comment TEXT,
  transfer_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 3. holdings表，记录用户当前资产持仓
CREATE TABLE holdings (
  id CHAR(36) NOT NULL PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  asset_code VARCHAR(50) NOT NULL,
  quantity DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  average_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  account_id CHAR(36) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 4. transactions表，记录用户买卖交易明细
CREATE TABLE transactions (
  id CHAR(36) NOT NULL PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  asset_code VARCHAR(50) NOT NULL,
  transaction_type ENUM('buy', 'sell') NOT NULL,
  quantity DECIMAL(12,2) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(12,2) NOT NULL,
  account_id CHAR(36) NOT NULL,
  transaction_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 5. portfolio_snapshots表，用户每日组合快照及收益
CREATE TABLE portfolio_snapshots (
  id CHAR(36) NOT NULL PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  snapshot_date DATE NOT NULL,
  total_cash DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  total_stock DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  total_fund DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  total_value DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  profit_day DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  profit_rate_day DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE KEY user_snapshot_unique (user_id, snapshot_date)
) ENGINE=InnoDB;

