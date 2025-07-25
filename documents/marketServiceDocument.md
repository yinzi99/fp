# The data flow of market service

![Data flow of marketService](../chart/fanni/dataFlowAboutMarketService.svg)

This is the simple description about flow, `market service` get market data from dummydata, and supply data for `peronal service` and `market page `.

## The exactly invoking steam

![invoking steam](../chart/fanni/MarkerServiceStream.drawio.svg)

In this part, the developer only confirm Which function i need to compelete to get data from exteral api and return data to its router.

## API Specification

| Method | Endpoint | Description | Params | Success Response Example | Failure Response Example |
|--------|----------|-------------|--------|--------------------------|--------------------------|
| GET | /api/market/stocks | Get stock list | page (int, optional), limit (int, optional), sort (string, optional: price/change), order (string, optional: asc/desc) | `{ "status": "yes", "data": [{"code":"601398","name":"Industrial and Commercial Bank of China","price":7.68,"change":0.23}], "message": "success" }` | `{ "status": "no", "data": null, "message": "Invalid parameter: page must be a positive integer" }` |
| GET | /api/market/stocks/{code} | Get stock details | code (string, required) | `{ "status": "yes", "data": {"code":"601398","name":"Industrial and Commercial Bank of China","price":7.68,"market_cap":2.3e+12,"pe":5.8,"pb":0.6}, "message": "success" }` | `{ "status": "no", "data": null, "message": "Stock with code 999999 not found" }` |
| GET | /api/market/stocks/{code}/brief | Get stock brief | code (string, required) | `{ "status": "yes", "data": {"code":"601398","name":"Industrial and Commercial Bank of China","price":7.68,"change_percent":0.32}, "message": "success" }` | `{ "status": "no", "data": null, "message": "Stock code is required (non-empty string)" }` |
| GET | /api/market/stocks/{code}/history | Get stock history | code (string, required), start (string, optional: YYYY-MM-DD), end (string, optional: YYYY-MM-DD), type (string, optional: price/volume) | `{ "status": "yes", "data": [{"date":"2025-07-01","price":7.68,"volume":12500000}], "message": "success" }` | `{ "status": "no", "data": null, "message": "Start date format error (must be YYYY-MM-DD)" }` |
| GET | /api/market/stocks/recommended | Get recommended stocks | limit (int, optional: 1-20, default=10) | `{ "status": "yes", "data": [{"code":"601398","name":"Industrial and Commercial Bank of China","price":7.68,"change_percent":0.32}], "message": "success" }` | `{ "status": "no", "data": null, "message": "Data source unavailable (retry later)" }` |
| GET | /api/market/funds | Get fund list | page (int, optional), limit (int, optional), sort (string, optional: net_value/return), order (string, optional: asc/desc), type (string, optional: stock/bond/mixed) | `{ "status": "yes", "data": [{"code":"011722","name":"Qianhai Open Source","net_value":1.01,"return_1y":8.75,"type":"stock"}], "message": "success" }` | `{ "status": "no", "data": null, "message": "Invalid parameter: sort must be net_value or return" }` |
| GET | /api/market/funds/{code} | Get fund details | code (string, required) | `{ "status": "yes", "data": {"code":"011722","name":"Qianhai Open Source","net_value":1.01,"manager":"Zhang San","establish_date":"2020-01-15","holdings":["601398","000858"]}, "message": "success" }` | `{ "status": "no", "data": null, "message": "Fund with code 999999 not found" }` |
| GET | /api/market/funds/{code}/brief | Get fund brief | code (string, required) | `{ "status": "yes", "data": {"code":"011722","name":"Qianhai Open Source","net_value":1.01,"change_percent":-0.12,"return_1y":8.75}, "message": "success" }` | `{ "status": "no", "data": null, "message": "Fund code is required (non-empty string)" }` |
| GET | /api/market/funds/{code}/history | Get fund history | code (string, required), start (string, optional: YYYY-MM-DD), end (string, optional: YYYY-MM-DD), type (string, optional: net_value/accumulated) | `{ "status": "yes", "data": [{"date":"2025-07-01","net_value":1.01,"accumulated_net_value":1.56}], "message": "success" }` | `{ "status": "no", "data": null, "message": "End date format error (must be YYYY-MM-DD)" }` |
| GET | /api/market/funds/recommended | Get recommended funds | limit (int, optional: 1-20, default=10) | `{ "status": "yes", "data": [{"code":"011722","name":"Qianhai Open Source","net_value":1.01,"return_1y":8.75}], "message": "success" }` | `{ "status": "no", "data": null, "message": "Data source unavailable (retry later)" }` |


