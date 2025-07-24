## 一 系统流程图
```
用户 → 前端界面 → API请求 → 后端服务 → 数据处理/数据库/第三方API → 响应 → 前端展示
```

## 二、功能模块设计
### 2.1 用户认证模块（待定）
- 用户注册/登录
- 密码加密存储
- JWT身份验证
- 个人信息管理

### 2.2 个人资产展示
- 总资产、股票基金资产及百分比 用户每日资产快照
- 资产涨跌走势图 用户持仓表，股价api
- 充值 关联现金账户表
- 资产明细图 关联现金账户表

### 2.3 模拟交易模块
- 股票买入/卖出 现金账户表，用户持仓表，用户交易记录表
- 交易订单管理
- 模拟资金账户 
- 持仓管理
## 三 数据库设计
### **用户表 **users

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE,
  password_hash VARCHAR(255) NOT NULL, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

| 字段名          | 含义                   |
| --------------- | ---------------------- |
| `id`            | 用户唯一标识（UUID）   |
| `username`      | 用户名（唯一）         |
| `email`         | 用户邮箱（可选、唯一） |
| `password_hash` | 加密存储密码           |
| `created_at`    | 用户创建时间           |

### **现金账户表 **accounts

```sql
CREATE TABLE accounts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR(50),
  account_type VARCHAR(20) CHECK (account_type IN ('main', 'sub')) NOT NULL,
  balance DECIMAL(12, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

| 字段名         | 含义                                         |
| -------------- | -------------------------------------------- |
| `id`           | 账户唯一标识（UUID）                         |
| `user_id`      | 所属用户的 ID（外键）                        |
| `name`         | 账户名称（如“主账户”或“券商A子账户”）        |
| `account_type` | 账户类型：`main`（主账户）或 `sub`（子账户） |
| `balance`      | 当前账户余额                                 |
| `created_at`   | 创建时间                                     |

### 用户账户间转账表 cash_transfers

```sql
CREATE TABLE cash_transfers (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  from_account UUID REFERENCES accounts(id),
  to_account UUID REFERENCES accounts(id),
  amount DECIMAL(12, 2) NOT NULL,
  comment TEXT,
  transfer_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

| 字段名          | 含义                         |
| --------------- | ---------------------------- |
| `id`            | 转账记录唯一标识（UUID）     |
| `user_id`       | 所属用户的 ID（外键）        |
| `from_account`  | 来源账户 ID（外键）          |
| `to_account`    | 目标账户 ID（外键）          |
| `amount`        | 转账金额                     |
| `comment`       | 备注信息（如“转入投资账户”） |
| `transfer_date` | 转账时间戳                   |

### 市场资产表 market_assets

```sql
CREATE TABLE market_assets (
  code VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
  type VARCHAR CHECK (type IN ('stock', 'fund')),
  exchange VARCHAR,
  description TEXT
);

```

| 字段名        | 含义                                 |
| ------------- | ------------------------------------ |
| `code`        | 资产代码（如 TSLA、000001.SZ）——主键 |
| `name`        | 资产名称（如“特斯拉”、“平安银行”）   |
| `type`        | 类型（'stock' 股票 or 'fund' 基金）  |
| `exchange`    | 所属交易所（如 NASDAQ、SSE、SZSE）   |
| `description` | 资产说明（可选）                     |

### 用户持仓表 holdings

```sql
CREATE TABLE holdings (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  asset_code VARCHAR REFERENCES market_assets(code),
  quantity DECIMAL(12, 2) NOT NULL,
  average_price DECIMAL(10, 2) NOT NULL,
  account_id UUID REFERENCES accounts(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

| 字段名          | 含义                                         |
| --------------- | -------------------------------------------- |
| `id`            | 唯一持仓记录 ID                              |
| `user_id`       | 所属用户 ID                                  |
| `asset_code`    | 所持有的资产代码（外键，关联 market_assets） |
| `quantity`      | 当前持有的份额或股数                         |
| `average_price` | 平均买入价                                   |
| `account_id`    | 持仓所在账户（外键）                         |
| `created_at`    | 创建时间（首次持仓时间）                     |

### 用户交易记录表 transactions

```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  asset_code VARCHAR REFERENCES market_assets(code),
  transaction_type VARCHAR CHECK (transaction_type IN ('buy', 'sell')),
  quantity DECIMAL(12, 2) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  total_amount DECIMAL(12, 2) NOT NULL,
  account_id UUID REFERENCES accounts(id),
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

| 字段名             | 含义                                 |
| ------------------ | ------------------------------------ |
| `id`               | 交易记录唯一 ID                      |
| `user_id`          | 所属用户 ID                          |
| `asset_code`       | 交易资产代码（如 TSLA）              |
| `transaction_type` | 交易类型（'buy' 买入 / 'sell' 卖出） |
| `quantity`         | 买入或卖出的数量                     |
| `price`            | 交易价格                             |
| `total_amount`     | 总金额（quantity × price）           |
| `account_id`       | 交易发生的账户 ID                    |
| `transaction_date` | 交易时间                             |