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
