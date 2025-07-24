const dummyDataService = require('../services/dummyDataService');
const { successResponse } = require('../middleware/responseFormatter');
const { validateFundListParams} = require('../utils/paramValidator');
/**
 * 股票接口控制器
 */
const getAllStockList = async (req, res, next) => {
  try {
    const stocks = await dummyDataService.getAllStockList(req.query);
    successResponse(res, stocks);
  } catch (error) {
    next(error); // 交给错误处理中间件
  }
};

const getStockInfoByCode = async (req, res, next) => {
  try {
    const { code } = req.params; // 仅从路径参数获取code
    // 不处理req.query.code（避免查询参数干扰）
    const stock = await dummyDataService.getStockInfoByCode(code);
    successResponse(res, stock);
  } catch (error) {
    next(error);
  }
};

const getStockBriefByCode = async (req, res, next) => {
  try {
    const { code } = req.params;
    const brief = await dummyDataService.getStockBriefByCode(code);
    successResponse(res, brief);
  } catch (error) {
    next(error);
  }
};

const getStockHistoryByCode = async (req, res, next) => {
  try {
    const { code } = req.params;
    const history = await dummyDataService.getStockHistoryByCode(code, req.query);
    successResponse(res, history);
  } catch (error) {
    next(error);
  }
};

const getRecommondedStocks = async (req, res, next) => {
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
const getAllFundList = async (req, res, next) => {
  try {
    console.log('Received query params:', req.query);
    
    // 执行验证
    validateFundListParams(req.query);
    console.log('Params passed validation');
    const funds = await dummyDataService.getAllFundList(req.query);
    successResponse(res, funds);
  } catch (error) {
    next(error);
  }
};

const getFundInfoByCode = async (req, res, next) => {
  try {
    const { code } = req.params;
    const fund = await dummyDataService.getFundInfoByCode(code);
    successResponse(res, fund);
  } catch (error) {
    next(error);
  }
};

const getFundBriefByCode = async (req, res, next) => {
  try {
    const { code } = req.params;
    const brief = await dummyDataService.getFundBriefByCode(code);
    successResponse(res, brief);
  } catch (error) {
    next(error);
  }
};

const getFundHistoryByCode = async (req, res, next) => {
  try {
    const { code } = req.params;
    const history = await dummyDataService.getFundHistoryByCode(code, req.query);
    successResponse(res, history);
  } catch (error) {
    next(error);
  }
};

const getRecommondedFunds = async (req, res, next) => {
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
  getStockBriefByCode,
  getStockHistoryByCode,
  getRecommondedStocks,
  getAllFundList,
  getFundInfoByCode,
  getFundBriefByCode,
  getFundHistoryByCode,
  getRecommondedFunds
};
    