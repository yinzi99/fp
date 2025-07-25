## API 接口

| 接口名称   | 方法   | 接口地址                      | 参数                      |
|------------|--------|-----------------------------|---------------------------|
| 仪表盘数据 | GET    | `/api/portfolio/dashboard`  | 无                        |
| 总资产     | GET    | `/api/portfolio/total`      | 无                        |
| 资产明细   | GET    | `/api/portfolio/details`    | 无                        |
| 资产走势   | GET    | `/api/portfolio/trend`      | `period=day/week/month/year` |
| 股票持仓   | GET    | `/api/portfolio/holdings`   | `type=stock`              |
| 基金持仓   | GET    | `/api/portfolio/holdings`   | `type=fund`               |
| 账户列表   | GET    | `/api/portfolio/accounts`   | 无                        |
例如：http://localhost:3000/api/portfolio/holdings?type=fund
### 仪表盘数据返回结果
{"totalAssets":
{"total_value":"303731.38","profit_rate_day":"-0.86","profit_day":"-2633.38"},
"assetDetails":
{"cash":"98754.72","stock":"191888.6000","fund":"15584.9400","total":"98754.72191888.600015584.9400"},
"holdings":
{"stocks":
      [{"asset_code":"F417","name":"Rowe and Sons Stock","quantity":"497.00","average_price":"191.61","total_value":"95230.1700"},
       {"asset_code":"H970","name":"Stokes and Sons Stock","quantity":"359.00","average_price":"161.90","total_value":"58122.1000"},
       {"asset_code":"C566","name":"Schmeler and Sons Stock","quantity":"460.00","average_price":"74.47","total_value":"34256.2000"},
       {"asset_code":"D453","name":"Schneider - Kulas Stock","quantity":"171.00","average_price":"25.03","total_value":"4280.1300"}],
 "funds":
      [{"asset_code":"3488756468","name":"Flatley, Lowe and Jacobson Fund","quantity":"294.00","average_price":"53.01","total_value":"15584.9400"}]},
"trendData":
      {"labels":["2025-07-14","2025-07-15","2025-07-16","2025-07-17","2025-07-18","2025-07-19","2025-07-20","2025-07-21","2025-07-22"],
        "data":["306349.43","305807.10","306800.93","306068.02","304703.15","307935.19","306785.94","306364.76","303731.38"]}}

### 总资产
{"totalValue":"303731.38",
"profitRate":"-0.86",
"dailyProfit":"-2633.38"}

### 资产明细
{"cash":"98754.72",
"stock":"191888.6000",
"fund":"15584.9400",
"total":"98754.72191888.600015584.9400"}

### 资产走势
[{"snapshot_date":"2025-07-14T16:00:00.000Z","total_value":"306349.43"},
{"snapshot_date":"2025-07-15T16:00:00.000Z","total_value":"305807.10"},
{"snapshot_date":"2025-07-16T16:00:00.000Z","total_value":"306800.93"},
{"snapshot_date":"2025-07-17T16:00:00.000Z","total_value":"306068.02"},
{"snapshot_date":"2025-07-18T16:00:00.000Z","total_value":"304703.15"},
{"snapshot_date":"2025-07-19T16:00:00.000Z","total_value":"307935.19"},
{"snapshot_date":"2025-07-20T16:00:00.000Z","total_value":"306785.94"},
{"snapshot_date":"2025-07-21T16:00:00.000Z","total_value":"306364.76"},
{"snapshot_date":"2025-07-22T16:00:00.000Z","total_value":"303731.38"}]

### 股票持仓
[{"asset_code":"F417","name":"Rowe and Sons Stock","quantity":"497.00","average_price":"191.61","total_value":"95230.1700"},
{"asset_code":"H970","name":"Stokes and Sons Stock","quantity":"359.00","average_price":"161.90","total_value":"58122.1000"},
{"asset_code":"C566","name":"Schmeler and Sons Stock","quantity":"460.00","average_price":"74.47","total_value":"34256.2000"},
{"asset_code":"D453","name":"Schneider - Kulas Stock","quantity":"171.00","average_price":"25.03","total_value":"4280.1300"}]

### 账户列表
[{"id":"7949289116","name":"trever.little's Main Account","account_type":"main","balance":"98754.72"}]
