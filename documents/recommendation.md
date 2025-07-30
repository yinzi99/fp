### Fund Recommendation — Core Workflow

- Filter funds from database (Fund size ≥ 1 billion CNY)
- Fetch historical NAV data (default: 30 days)
- Calculate return rate, volatility, and maximum drawdown
- Apply multi-factor weighted scoring
- Output Top 5 high-quality funds

### Stock Recommendation — Core Workflow

- Initial filtering (P/E ratio ≤ 100, turnover rate ≥ 0)
- Fetch historical stock price data (default: 30 days)
- Calculate return rate, volatility, max drawdown, and valuation score (1 / P/E)
- Apply multi-factor scoring model
- Output Top 5 recommended stocks

------

### **Scoring Weight Comparison**

| Metric          | Fund Weight | Stock Weight  |
| --------------- | ----------- | ------------- |
| Return Rate     | 50%         | 40%           |
| Volatility      | 30%         | 25%           |
| Max Drawdown    | 20%         | 20%           |
| Valuation Score | —           | 15% (1 / P/E) |