# Asset Portfolio documents

## The User storys

[User story 1.0](./documents/UserStories.md)

## The main structure of project

![system structure](./chart/fanni/simple_structure.drawio.svg)

In this section, we divide all our business into three parts.

The first part is the external API, which serves as the source of market data. We use our dummydata project to mock its functionality. You can check it out here: [dummydata](https://github.com/yinzi99/dummydata.git).

The backend is divided into `Personal Service` and `Market Service`. The Personal Service handles individual business logic, while the Market Service manages market-related operations. To ensure system independence, all market information is obtained exclusively from the Market Service.

The frontend consists of two pages: `mywallet` and `market`. These are responsible for user

## Database Design
[database design ducument](./documents/Database/portfolio_manager.md)

[ER diagram](documents/Database/db_ER.png)

## The data flow of market service

[market service document](./documents/marketServiceDocument.md)
