# Asset Portfolio documents

## The User storys

[User story 1.0](./documents/UserStories.md)
![flow of function dev](./chart/fanni/processOfDev.drawio.svg)

## The main structure of project

![system structure](./chart/fanni/simple_structure.drawio.svg)

In this section, we divide all our business into three parts.

The first part is the external API, which serves as the source of market data. We use our dummydata project to mock its functionality. You can check it out here: [dummydata](https://github.com/yinzi99/dummydata.git).

The backend is divided into `Personal Service` and `Market Service`. The Personal Service handles individual business logic, while the Market Service manages market-related operations. To ensure system independence, all market information is obtained exclusively from the Market Service.

The frontend consists of two pages: `mywallet` and `market`. These are responsible for user


## The data flow of market service

[market service document](./documents/MarkerServiceStream.drawio)


## API Specification



| Method | Endpoint                                      | Description                        | Params                    | Example Response |
|--------|-----------------------------------------------|------------------------------------|---------------------------|------------------|
| GET    | /api/market/stock                            | Get stock list                     | `page`, `limit`, `order` | `[{"code":"601398","name":"工商银行","latest_price":7.68,"market_cap":"2.73万亿",...}]` |
| GET    | /api/market/stock/{code}                     | Get stock details by code          | `code`                    | `{"code":"601398","name":"工商银行","latest_price":7.81,"market_cap":"2.73万亿",...}` |
| GET    | /api/market/stock/{code}/brief               | Get brief info of a stock          | `code`                    | `{"code":"601939","name":"建设银行","latest_price":9.45,"change_percent":-1.87}` |
| GET    | /api/market/stock/{code}/history             | Get stock historical data          | `code`, `start`, `end`    | `[{"date":"2025-01-01","price":9.46}, ...]` |
| GET    | /api/market/fund                             | Get fund list                      | `page`, `limit`, `type`, `sort`, `order` | `[{"fund_code":"011722","short_name":"前海开源深圳特区精选股票A","fund_type":"股票型",...}]` |
| GET    | /api/market/fund/{code}                      | Get fund details by code           | `code`                    | `{"fund_code":"011709","short_name":"中欧嘉益一年持有期混合C","fund_type":"混合型-偏股",...}` |
| GET    | /api/market/fund/{code}/brief                | Get brief info of a fund           | `code`                    | `{"fund_code":"011709","short_name":"中欧嘉益一年持有期混合C","latest_net_value":1.0149,"change_percent":-0.06}` |
| GET    | /api/market/fund/{code}/history              | Get fund net value history         | `code`, `start`, `end`    | `[{"date":"2025-01-01","net_value":1.1968}, ...]` |
| GET    | /api/market/fund/recommended                 | Get recommended funds              | -                         | `[{"fund_code":"011722","short_name":"前海开源深圳特区精选股票A",...}]` |
