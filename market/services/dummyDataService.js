const axios = require('axios');
const { BusinessError } = require('../utils/errors');

const DUMMY_DATA_BASE_URL = 'http://localhost:3000';

/**
 * 股票相关接口
 */
const getAllStockList = async (params) => {
  try {
    // 参数验证
    if (params.page && isNaN(Number(params.page))) {
      throw new BusinessError("Invalid parameters: page must be a number");
    }
    if (params.limit && isNaN(Number(params.limit))) {
      throw new BusinessError("Invalid parameters: limit must be a number");
    }

    
    const response = await axios.get(`${DUMMY_DATA_BASE_URL}/api/stocks`, { params });
    return response.data;
  } catch (error) {
    if (error instanceof BusinessError) throw error;
    
    // 处理数据源错误
    if (error.response) {
      if (error.response.status === 404) {
        throw new BusinessError("No stocks found");
      }
      if (error.response.status === 400) {
        throw new BusinessError("Invalid parameters for data source");
      }
    } else {
      throw new BusinessError("Data source unavailable");
    }
  }
};

const getStockInfoByCode = async (code) => {
  try {
    // 增强参数验证：处理空字符串、空格等无效情况
    if (!code || typeof code !== 'string' || code.trim() === '') {
      throw new BusinessError("Stock code is required and must be a non-empty string");
    }

    const response = await axios.get(`${DUMMY_DATA_BASE_URL}/api/stocks/${code}`);
    const stock = response.data || null;
    
    // 验证返回数据是否有效
    if (!stock || (typeof stock === 'object' && Object.keys(stock).length === 0)) {
      throw new BusinessError(`Stock with code ${code} not found`);
    }
    
    return stock;
  } catch (error) {
    // 处理已知业务错误
    if (error instanceof BusinessError) {
      throw error;

    }
    
    // 处理数据源返回的404错误
    if (error.response && error.response.status === 404) {
      throw new BusinessError(`Stock with code ${code} not found`);
    }
    
    // 处理其他错误（网络错误、数据源异常等）
    throw new BusinessError("Failed to fetch stock details");
  }
};


const getStockBriefByCode = async (code) => {
  try {
    if (!code) throw new BusinessError("Stock code is required");
    
    const response = await axios.get(`${DUMMY_DATA_BASE_URL}/api/stocks/${code}/brief`);
    return response.data;
  } catch (error) {
    if (error instanceof BusinessError) throw error;
    throw new BusinessError(`Failed to fetch stock brief for ${code}`);
  }
};

const getStockHistoryByCode = async (code, params) => {
  try {
    if (!code) throw new BusinessError("Stock code is required");
    if (params.start && !/^\d{4}-\d{2}-\d{2}$/.test(params.start)) {
      throw new BusinessError("Start date must be in YYYY-MM-DD format");
    }

    const response = await axios.get(`${DUMMY_DATA_BASE_URL}/api/stocks/${code}/history`, { params });
    return response.data;
  } catch (error) {
    if (error instanceof BusinessError) throw error;
    throw new BusinessError(`Failed to fetch stock history for ${code}`);
  }
};

const getRecommondedStocks = async () => {
  getAllStockList({ page: 10, limit: 10 , order: 'desc'});
};

/**
 * 基金相关接口
 */
const getAllFundList = async (params) => {
  try {
    const response = await axios.get(`${DUMMY_DATA_BASE_URL}/api/funds`, { params });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new BusinessError("No funds found");
    }
    throw new BusinessError("Failed to fetch funds list");
  }
};

const getFundInfoByCode = async (code) => {
  try {
    // 增强参数验证：处理空字符串、空格等无效情况
    if (!code || typeof code !== 'string' || code.trim() === '') {
      throw new BusinessError("Fund code is required and must be a non-empty string");
    }

    const response = await axios.get(`${DUMMY_DATA_BASE_URL}/api/funds/${code}`);
    const stock = response.data || null;
    
    // 验证返回数据是否有效
    if (!stock || (typeof stock === 'object' && Object.keys(stock).length === 0)) {
      throw new BusinessError(`Fund with code ${code} not found`);
    }
    
    return stock;
  } catch (error) {
    // 处理已知业务错误
    if (error instanceof BusinessError) {
      throw error;
    }
    
    // 处理数据源返回的404错误
    if (error.response && error.response.status === 404) {
      throw new BusinessError(`Fund with code ${code} not found`);
    }
    
    // 处理其他错误（网络错误、数据源异常等）
    throw new BusinessError("Failed to fetch fund details");
  }

};

// 其他基金相关方法（省略实现，与股票接口模式一致）
const getFundBriefByCode = async (code) => {  try {
    if (!code) throw new BusinessError("Fund code is required");
    
    const response = await axios.get(`${DUMMY_DATA_BASE_URL}/api/funds/${code}/brief`);
    if (!response || (typeof response === 'object' && Object.keys(response).length === 0)) {
      throw new BusinessError(`Fund with code ${code} not found`);
    }
    return response.data;
  } catch (error) {
    if (error instanceof BusinessError) {
      throw error;
    }
    
    // 处理数据源返回的404错误
    if (error.response && error.response.status === 404) {
      throw new BusinessError(`Fund with code ${code} not found`);
    }
    
    // 处理其他错误（网络错误、数据源异常等）
    throw new BusinessError("Failed to fetch fund details");
  
  }};
const getFundHistoryByCode = async (code, params) => { /* 实现逻辑 */ };
const getRecommondedFunds = async () => { 

  getAllFundList({ page: 5, limit: 10 , sort: 'change_percent', order: 'desc'});
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
    