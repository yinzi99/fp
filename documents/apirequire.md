Here is a detailed README.md document for your stock and fund management API, presented in English:

```markdown
# Financial Portfolio Management API

This API provides comprehensive financial portfolio management capabilities, including personal wallet management, stock and fund trading, market data retrieval, and financial news aggregation.

## Base URL
```
https://api.example.com/v1
```

## Authentication
All endpoints require authentication via JWT token. Include the token in the request header as:
```
Authorization: Bearer <token>
```

## Endpoints

### 1. Wallet Management

#### `GET /mywallet`
Retrieves comprehensive information about the user's financial portfolio.

**Response Body:**
```json
{
    "total_assets": 128560.45,
    "yesterday_income": 2850.20,
    "yesterday_income_rate": 0.023,
    "balance": 35200.00,
    "stock_assets": 65840.30,
    "stock_yesterday_income": 1150.75,
    "stock_yesterday_income_rate": 0.018,
    "fund_assets": 27520.15,
    "fund_yesterday_income": -120.30,
    "fund_yesterday_income_rate": -0.005,
    "holdings": [
        {
            "type": "stock",
            "name": "Xiaomi Corporation",
            "code": "01810.HK",
            "value": 12560.50,
            "yesterday_rate": 0.023
        }
    ],
    "last_7_days_assets": [120500, 121800, 123200, 122500, 124100, 125600, 126800]
}
```

#### `POST /mywallet/charge`
Manages wallet top-up and withdrawal operations.

**Request Body:**
```json
{
    "type": 0,
    "amount": 123
}
```
- `type`: 0 for top-up, 1 for withdrawal
- `amount`: Transaction amount

**Response Body:**
```json
{
    "balance": 35323.00,
    "total_assets": 128683.45
}
```

#### `POST /mywallet/detail`
Retrieves detailed information about a specific holding.

**Request Body:**
```json
{
    "type": "GP",
    "code": "01810.HK",
    "day": 7
}
```
- `type`: "GP" for stocks, "JJ" for funds
- `code`: Financial instrument code
- `day`: Time period (7/30/365 days)

**Response Body:**
```json
{
    "historical_values": [12000, 12200, 12400, 12300, 12500, 12600, 12560],
    "holding_quantity": 500,
    "cost_basis": 12000.00,
    "total_profit": 560.50,
    "current_price": 25.12,
    "daily_change_rate": 0.023
}
```

### 2. Market Data

#### `GET /market`
Retrieves general market information.

**Response Body:**
```json
{
    "market_indices": {
        "hang_seng": { "value": 18500.34, "change_rate": 0.012 },
        "shenzhen": { "value": 2250.67, "change_rate": 0.008 },
        "shanghai": { "value": 3050.21, "change_rate": 0.015 }
    },
    "hot_stocks": [
        { "name": "Alibaba", "code": "BABA", "price": 85.23, "change_rate": 0.021 },
        { "name": "Tencent", "code": "00700.HK", "price": 320.50, "change_rate": 0.015 }
    ],
    "hot_funds": [
        { "name": "Technology Growth Fund", "code": "F12345", "price": 1.567, "change_rate": 0.032 },
        { "name": "Blue Chip Fund", "code": "F67890", "price": 2.345, "change_rate": 0.008 }
    ]
}
```

#### `POST /market/detail`
Retrieves detailed information about a financial instrument.

**Request Body:**
```json
{
    "type": "GP",
    "code": "01810.HK",
    "day": 30
}
```

**Response Body:**
```json
{
    "historical_prices": [23.50, 23.80, 24.10, ...],
    "holding_quantity": 200,
    "holding_value": 5024.00,
    "pe_ratio": 25.3,
    "pb_ratio": 3.2,
    "dividend_yield": 0.025,
    "market_cap": 45000000000,
    "total_shares": 1800000000,
    "float_shares": 1500000000,
    "annual_return_rate": 0.152,
    "price_volatility": 0.085
}
```

#### `POST /market/getnews`
Retrieves financial news related to a specific instrument.

**Request Body:**
```json
{
    "type": "GP",
    "code": "01810.HK"
}
```

**Response Body:**
```json
[
    {
        "source": "Financial News Network",
        "title": "Xiaomi Announces New Product Lineup for 2025",
        "date": "2025/07/21"
    },
    {
        "source": "Tech Insights",
        "title": "Xiaomi's Market Share in India Grows by 15%",
        "date": "2025/07/20"
    }
]
```

#### `POST /market/transfer`
Executes buy/sell transactions.

**Request Body:**
```json
{
    "trantype": "BUY",
    "amount": 50
}
```
- `trantype`: "BUY" or "SELL"
- `amount`: Transaction quantity

**Response Body:**
```json
{
    "holding_quantity": 250,
    "holding_value": 6280.00
}
```

## Error Handling
All error responses will follow the format:
```json
{
    "error": "Error message",
    "code": 400
}
```

## Rate Limiting
API requests are rate limited to 100 requests per minute per API key.

## Versioning
This API is currently at version 1.0.0.

