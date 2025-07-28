const express = require('express');
const router = express.Router();
const marketController = require('../controllers/marketController');

// 股票接口 - 固定路径路由放前面，动态参数路由放后面
router.get('/stocks', marketController.getAllStockList);
router.get('/stock/recommended', marketController.getRecommondedStocks);
router.get('/stock/:code/history', marketController.getStockHistoryByCode);
router.get('/stock/:code', marketController.getStockInfoByCode);


// 基金接口
router.get('/funds', marketController.getAllFundList);
router.get('/fund/:code', marketController.getFundInfoByCode);
router.get('/fund/:code/history', marketController.getFundHistoryByCode);
router.get('/fund/recommended', marketController.getRecommondedFunds); // 推荐基金接口

module.exports = router;