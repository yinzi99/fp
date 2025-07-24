# Asset Portfolio User Stories Summary 1.0

## Personal asset

| Goal                                          | Input                        | Output                                                                   |
| --------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------ |
| Tansfer money in  cash account                | amount, comment              | the account number changed successfully                                  |
| Transfer money in cash account                | destination, amount, comment | the account number changed successfully                                  |
| Watching portfolio Summary & yesterday income | None                         | the total asset (cash, stock, bond)number, yesterday total income & rate |
| Listing cash/stock/bond                       | click a singe category       | the list of cash/stock/bond user holding,                                |
| Visualize Asset Allocation & line             |                         | the allocation pie & line                                                |
| Visualize single cash/stock/bond              | cash/stock/bond code         | the line of cash/stock/bond                                              |
| View single Cash/stock/bond Details           | cash/stock/bond code         | the detail of cash/stock/bond                                            |
|                                               |                              |                                                                          |
|                                               |                              |                                                                          |
|                                               |                              |                                                                          |

## Market

| goal                   | input                        | output                                                     |
| ---------------------- | ---------------------------- | ---------------------------------------------------------- |
| Searching a stock/bond | stock/bond code              | the stock/bond information from api                        |
| Listing all stock/bond | None                         | the all stock/bond code List                               |
| Buying a stock/bond    | stock code, share            | the cash balance reduced, the stock/bond holding increased |
| Selling a stock/bond   | stock code, share            | the stock/bond holding reduced, the cash balance increased |
| Visulize a stock/bond  | stock code , optional period | the stock/bond price in each day                           |
