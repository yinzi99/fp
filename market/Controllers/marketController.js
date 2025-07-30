const dummyDataService = require('../services/dummyDataService');
const { successResponse } = require('share-utils');
const paramValidator = require('share-utils');

/**
 * 股票接口控制器
 */
const getAllStockList = async(req, res, next) => {
    try {
        paramValidator.validateOfGetAllStock(req);
        const stocks = await dummyDataService.getAllStockList(req.query);
        successResponse(res, stocks);
    } catch (error) {
        next(error); // 交给错误处理中间件
    }
};

const getStockInfoByCode = async(req, res, next) => {
    try {
        const { code } = req.params; // 仅从路径参数获取code
        paramValidator.validateCode(code);
        const stock = await dummyDataService.getStockInfoByCode(code);
        successResponse(res, stock);
    } catch (error) {
        next(error);
    }
};


const getStockHistoryByCode = async(req, res, next) => {
    try {
        const { code } = req.params;
        paramValidator.validateCode(code);
        const history = await dummyDataService.getStockHistoryByCode(code, req.query);
        successResponse(res, history);
    } catch (error) {
        next(error);
    }
};

const getRecommondedStocks = async(res, next) => {
    try {
        const recommended = await dummyDataService.getRecommondedStocks();
        successResponse(res, recommended);
    } catch (error) {
        next(error);
    }
};

/**
 * 基金接口控制器（与股票接口模式一致）
 */
const getAllFundList = async(req, res, next) => {
    try {
        paramValidator.validateOfGetAllFund(req); // 复用股票的参数验证逻辑
        const funds = await dummyDataService.getAllFundList(req.query);
        successResponse(res, funds);
    } catch (error) {
        next(error);
    }
};

const getFundInfoByCode = async(req, res, next) => {
    try {
        const { code } = req.params;
        paramValidator.validateCode(code);
        const fund = await dummyDataService.getFundInfoByCode(code);
        successResponse(res, fund);
    } catch (error) {
        next(error);
    }
};


const getFundHistoryByCode = async(req, res, next) => {
    try {
        const { code } = req.params;
        paramValidator.validateCode(code);
        const history = await dummyDataService.getFundHistoryByCode(code, req.query);
        successResponse(res, history);
    } catch (error) {
        next(error);
    }
};

const getRecommondedFunds = async(req, res, next) => {
    try {
        const recommended = await dummyDataService.getRecommondedFunds();
        successResponse(res, recommended);
    } catch (error) {
        next(error);
    }
};


module.exports = {
    getAllStockList,
    getStockInfoByCode,
    getStockHistoryByCode,
    getRecommondedStocks,
    getAllFundList,
    getFundInfoByCode,
    getFundHistoryByCode,
    getRecommondedFunds
};