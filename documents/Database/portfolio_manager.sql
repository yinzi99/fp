-- 1. 创建数据库
CREATE DATABASE IF NOT EXISTS portfolio_manager DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE portfolio_manager;

-- 2. 创建用户表
CREATE TABLE users (
  id CHAR(36) PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE,
  password_hash VARCHAR(255) NOT NULL, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. 创建账户表（主账户 / 子账户）
CREATE TABLE accounts (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36),
  name VARCHAR(50),
  account_type ENUM('main', 'sub') NOT NULL,
  balance DECIMAL(12, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 4. 创建账户转账记录表
CREATE TABLE cash_transfers (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36),
  from_account CHAR(36),
  to_account CHAR(36),
  amount DECIMAL(12, 2) NOT NULL,
  comment TEXT,
  transfer_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (from_account) REFERENCES accounts(id),
  FOREIGN KEY (to_account) REFERENCES accounts(id)
);

-- 5. 创建市场资产表（股票/基金）
CREATE TABLE market_assets (
  code VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type ENUM('stock', 'fund') NOT NULL,
  exchange VARCHAR(50),
  description TEXT
);

-- 6. 创建用户持仓表
CREATE TABLE holdings (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36),
  asset_code VARCHAR(50),
  quantity DECIMAL(12, 2) NOT NULL,
  average_price DECIMAL(10, 2) NOT NULL,
  account_id CHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (asset_code) REFERENCES market_assets(code),
  FOREIGN KEY (account_id) REFERENCES accounts(id)
);

-- 7. 创建交易记录表
CREATE TABLE transactions (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36),
  asset_code VARCHAR(50),
  transaction_type ENUM('buy', 'sell') NOT NULL,
  quantity DECIMAL(12, 2) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  total_amount DECIMAL(12, 2) NOT NULL,
  account_id CHAR(36),
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (asset_code) REFERENCES market_assets(code),
  FOREIGN KEY (account_id) REFERENCES accounts(id)
);

-- 8. 创建每日资产快照表（用于可视化）
CREATE TABLE portfolio_snapshots (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36),
  snapshot_date DATE,
  total_cash DECIMAL(12,2),
  total_stock DECIMAL(12,2),
  total_fund DECIMAL(12,2),
  total_value DECIMAL(12,2),
  profit_day DECIMAL(12,2),
  profit_rate_day DECIMAL(5,2),
  UNIQUE KEY unique_user_date (user_id, snapshot_date),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
