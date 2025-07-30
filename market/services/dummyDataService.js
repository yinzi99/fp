const axios = require('axios');
const { BusinessError } = require('share-utils');
const { DUMMY_DATA_BASE_URL } = require('../config/config')


const getAllStockList = async(params) => {
    try {
        const response = await axios.get(`${DUMMY_DATA_BASE_URL}/api/stocks`, { params });
        return response.data;
    } catch (error) {
        throw new BusinessError(error.message || error.response.data);
    }
};

const getStockInfoByCode = async(code) => {
    try {
        const response = await axios.get(`${DUMMY_DATA_BASE_URL}/api/stocks/${code}`);
        const stock = response.data;
        return stock;
    } catch (error) {
        if (error) {
            throw new BusinessError(error.message || error.response.data);
        }
    }
};



const getStockHistoryByCode = async(code, days) => {
    try {
        const response = await axios.get(`${DUMMY_DATA_BASE_URL}/api/stocks/${code}/history`, { days });
        return response.data;
    } catch (error) {
        if (error) {
            throw new BusinessError(error.message || error.response.data);
        }
    }
};

// @KikiHuang2000 TODO: 实现推荐股票逻辑
const getRecommondedStocks = async() => {
    try {
        const response = await axios.get(`${DUMMY_DATA_BASE_URL}/api/stock/recommended`);
        return response.data;
    } catch (error) {
        if (error) {
            throw new BusinessError(error.message || error.response.data);
        }
    }
};


const getAllFundList = async(params) => {
    try {
        const response = await axios.get(`${DUMMY_DATA_BASE_URL}/api/funds`, { params });
        return response.data;
    } catch (error) {
        if (error) {
            throw new BusinessError(error.message || error.response.data);
        }
    }
};

const getFundInfoByCode = async(code) => {
    try {
        const response = await axios.get(`${DUMMY_DATA_BASE_URL}/api/funds/${code}`);
        const stock = response.data || null;
        return stock;
    } catch (error) {
        if (error) {
            throw new BusinessError(error.message || error.response.data);
        }
    };
}


const getFundHistoryByCode = async(_code, _params) => {
    try {
        const response = await axios.get(`${DUMMY_DATA_BASE_URL}/api/funds/${_code}/history`, { params: _params });
        return response.data;
    } catch (error) {
        if (error) {
            throw new BusinessError(error.message || error.response.data);
        }
    }
};

// @KikiHuang2000 TODO: 实现基金推荐逻辑
const getRecommondedFunds = async() => {
    try {
        const response = await axios.get(`${DUMMY_DATA_BASE_URL}/api/fund/recommended`);
        return response.data;
    } catch (error) {
        if (error) {
            throw new BusinessError(error.message || error.response.data);
        }
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