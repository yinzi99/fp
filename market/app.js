const express = require('express');
const cors = require('cors');
const marketRoutes = require('./routes/market');
const errorHandler = require('./middleware/errorHandler');
const { errorResponse } = require('./middleware/responseFormatter');

const app = express();
const PORT = 3001;

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api/market', marketRoutes);

// 404处理：未匹配的路由
app.use((req, res) => {
  errorResponse(res, "Endpoint not found");
});

// 注册全局错误处理中间件
app.use(errorHandler);

// 启动服务
app.listen(PORT, () => {
  console.log(`Market service running on http://localhost:${PORT}`);
});

module.exports = app;
    