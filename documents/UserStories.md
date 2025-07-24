# Asset Portfolio User Stories Summary 1.0

In this section, our team discussed and defined the core functionalities that our project will provide in edition1.0. We have organized these user stories (US) into a table in the following paragraph for clarity.

The "Goal" column represents each business function, the "Input" column specifies the required actions or data for each function, and the "Output" column describes what the system will return after the action is performed.

The main advantage of this approach is that it allows us to systematically review and clarify all planned functionalities, ensuring a clear separation between front-end and back-end responsibilities. This structure helps the team maintain a comprehensive understanding of the system's requirements and facilitates efficient collaboration.

However, one limitation is that this section focuses solely on the back-end business logic. The front-end design was discussed separately and will be provided in a dedicated document. This ensures that the front-end can be developed independently while still aligning with the back-end functionalities described

## Personal asset

| Goal                                          | Input                        | Output                                                                   |
| --------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------ |
| Tansfer money in  cash account                | amount, comment              | the account number changed successfully                                  |
| Transfer money in cash account                | destination, amount, comment | the account number changed successfully                                  |
| Watching portfolio Summary & yesterday income | None                         | the total asset (cash, stock, bond)number, yesterday total income & rate |
| Listing cash/stock/bond                       | category                     | the list of cash/stock/bond user holding,                                |
| Visualize Asset Allocation & line             |                              | the allocation pie & line                                                |
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
