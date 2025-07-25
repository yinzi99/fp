const request = require('supertest');
const app = require('../app');

// 测试套件：股票列表接口（getAllStockList）
describe('GET /api/market/stocks', () => {
  // 测试1：正常请求应返回股票列表
  it('should return stock list with status "yes"', async () => {
    const response = await request(app).get('/api/market/stocks');
    
    // 验证HTTP状态码为200
    expect(response.statusCode).toBe(200);
    // 验证响应格式正确
    expect(response.body).toHaveProperty('status', 'yes');
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('message', 'success');
    // 验证data是数组
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  // 测试2：分页参数有效时应返回指定数量的股票
  it('should return limited stocks when using limit parameter', async () => {
    const response = await request(app).get('/api/market/stocks?limit=5');
    
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('yes');
    // 验证返回数量不超过limit
    expect(response.body.data.length).toBeLessThanOrEqual(5);
  });

  // 测试3：无效分页参数（非数字）应返回错误
  it('should return error when page is not a number', async () => {
    const response = await request(app).get('/api/market/stocks?page=abc');
    
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('no');
    expect(response.body.data).toBeNull();
    expect(response.body.message).toContain('page must be a number');
  });
});


// 测试套件：获取股票详情接口（getStockInfoByCode）
describe('GET /api/market/stock/{code}', () => {
  // 测试1：有效的股票代码应返回完整详情
  it('should return complete stock info with valid code', async () => {
    const testCode = '601229'; // 工商银行代码（已知存在于DummyData中）
    const response = await request(app).get(`/api/market/stock/${testCode}`);
    
    // 验证HTTP状态码
    expect(response.statusCode).toBe(200);
    // 验证响应基本格式
    expect(response.body).toEqual(
      expect.objectContaining({
        status: 'yes',
        message: 'success',
        data: expect.any(Object)
      })
    );
    // 验证核心字段存在且正确
    const stockData = response.body.data;
    expect(stockData.code).toBe(testCode);
    expect(stockData).toHaveProperty('name'); // 股票名称
    expect(stockData).toHaveProperty('latest_price'); // 最新价格
    expect(stockData).toHaveProperty('market_cap'); // 市值
    expect(stockData).toHaveProperty('pe_ratio'); // 市盈率
    expect(stockData).toHaveProperty('pb_ratio'); // 市净率
  });

  // 测试2：不存在的股票代码应返回错误
  it('should return error with non-existent code', async () => {
    const invalidCode = '999999'; // 不存在的代码
    const response = await request(app).get(`/api/market/stock/${invalidCode}`);
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        status: 'no',
        data: null,
        message: `Stock with code ${invalidCode} not found`
      })
    );
  });

  // 测试3：空代码参数（路径错误）应返回错误
  it('should return error with empty code', async () => {
    // 测试多种空代码场景
    const responses = await Promise.all([
      request(app).get('/api/market/stock/'), // 末尾无代码
      request(app).get('/api/market/stock//') // 双斜杠
    ]);
    
    responses.forEach(res => {
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('no');
      expect(res.body.message).toContain("Endpoint not found");
    });
  });

  // 测试4：无效格式的代码（非字符串/特殊字符）应返回错误
  it('should return error with invalid format code', async () => {
    const invalidCodes = [
      '123@45', // 含特殊字符
      ' 601398 ', // 含空格
      '601398_abc' // 附加无效字符
    ];
    
    for (const code of invalidCodes) {
      const response = await request(app).get(`/api/market/stock/${code}`);
      expect(response.body.status).toBe('no');
      // 要么提示不存在，要么提示格式错误
      expect(
        response.body.message.includes('not found')
      ).toBe(true);
    }
  });

});

// 测试套件：股票简况接口
describe('GET /api/market/stock/{code}/brief', () => {
  // 测试1：有效的股票代码应返回简况信息
  it('should return brief stock info with valid code', async () => {
    const testCode = '601939'; // 建设银行代码（DummyData中存在）
    const response = await request(app).get(`/api/market/stock/${testCode}/brief`);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('yes');
    // 验证简况数据结构（至少包含code、name、latest_price、change_percent）
    expect(response.body.data).toHaveProperty('code', testCode);
    expect(response.body.data).toHaveProperty('name');
    expect(response.body.data).toHaveProperty('latest_price');
    expect(response.body.data).toHaveProperty('change_percent');
    expect(response.body.message).toBe('success');
  });

  // 测试2：无效的股票代码应返回错误
  it('should return error with invalid code', async () => {
    const invalidCode = '888888'; // 不存在的代码
    const response = await request(app).get(`/api/market/stock/${invalidCode}/brief`);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('no');
    expect(response.body.data).toBeNull();
    expect(response.body.message).toContain(`stock brief for ${invalidCode}`);
  });
});


// 测试套件：基金相关接口完整测试
describe('Fund API Endpoints', () => {
  // 测试1：基金列表接口（GET /api/market/fund）
  describe('GET /api/market/funds', () => {
    // 基础功能验证
    it('should return status "yes" with non-empty fund list', async () => {
      const response = await request(app).get('/api/market/funds');
      
      // 验证HTTP状态码
      expect(response.statusCode).toBe(200);
      // 验证响应格式完整性
     
      // 验证返回数据不为空
      expect(response.body.data.length).toBeGreaterThan(0);
      // 验证列表项包含核心字段
      const firstFund = response.body.data[0];
      expect(firstFund).toHaveProperty('fund_code');
      expect(firstFund).toHaveProperty('short_name');
      expect(firstFund).toHaveProperty('fund_type');
      expect(firstFund).toHaveProperty('fund_size');
      expect(firstFund).toHaveProperty('industries');
      expect(firstFund).toHaveProperty('managers');
      expect(firstFund).toHaveProperty('latest_net_value');
      expect(firstFund).toHaveProperty('change_percent');
    });

    // 分页参数测试
    it('should return exact number of funds when using valid limit', async () => {
      const limit = 4;
      const response = await request(app).get(`/api/market/funds?limit=${limit}`);
      
      expect(response.body.status).toBe('yes');
      expect(response.body.data.length).toBe(limit);
    });



    // 排序功能测试
    it('should sort funds by net_value in ascending order', async () => {
      const response = await request(app).get('/api/market/funds?sort=latest_net_value&order=asc');
      const funds = response.body.data;
      
      expect(response.body.status).toBe('yes');
      // 验证排序逻辑（前一个净值 <= 后一个净值）
      for (let i = 0; i < funds.length - 1; i++) {
        expect(funds[i].latest_net_value).toBeLessThanOrEqual(funds[i + 1].latest_net_value);
      }
    });

    // 无效参数测试
    it('should return error with non-numeric limit', async () => {
      const response = await request(app).get('/api/market/funds?limit=invalid');
      
      expect(response.body.status).toBe('no');
      expect(response.body.data).toBeNull();
      expect(response.body.message).toContain('Invalid parameter');
    });

    it('should return error with negative page number', async () => {
      const response = await request(app).get('/api/market/funds?page=-3');
      
      expect(response.body.status).toBe('no');
      expect(response.body.message).toContain('Invalid parameter');
    });
  });

});



describe('Fund API Endpoints', () => {


  // 2. 基金详情接口（GET /api/market/funds/{code}）
  describe('GET /api/market/fund/{code}', () => {
    const validFundCode = '011708'; // 有效基金代码
    const invalidFundCode = '999999'; // 无效基金代码

    it('should return complete fund details with valid code', async () => {
      const response = await request(app).get(`/api/market/fund/${validFundCode}`);
      
      expect(response.statusCode).toBe(200);
      
    fundData = response.body.data;
    expect(response.body.status).toBe('yes');
    expect(fundData.fund_code).toBe(validFundCode);
    expect(fundData.short_name).toBe('中欧嘉益一年持有期混合A'); 
    expect(fundData.fund_type).toBe('混合型-偏股');
    expect(fundData.industries).toBe(null); // 行业数据可能为空
    });

    it('should return error with non-existent code', async () => {
      const response = await request(app).get(`/api/market/fund/${invalidFundCode}`);
      
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          status: 'no',
          data: null,
          message: `Fund with code ${invalidFundCode} not found`
        })
      );
  });


  });
    



  // 3. 基金简况接口（GET /api/market/funds/{code}/brief）
  describe('GET /api/market/funds/{code}/brief', () => {
    const validFundCode = '011708';
    const invalidFundCode = '888888';

    it('should return brief fund info with valid code', async () => {
      const response = await request(app).get(`/api/market/fund/${validFundCode}/brief`);
      
      expect(response.statusCode).toBe(200);
      const briefData = response.body.data;
      expect(briefData).toHaveProperty('fund_code');
      expect(briefData).toHaveProperty('short_name');
      expect(briefData).toHaveProperty('latest_net_value');
      expect(briefData).toHaveProperty('change_percent');
     
      
    });

    it('should return error with invalid code', async () => {
      const response = await request(app).get(`/api/market/fund/${invalidFundCode}/brief`);
      
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('no');
      expect(response.body.message).toContain(`Fund with code ${invalidFundCode} not found`);
    });

  });

  // 4. 基金历史数据接口（GET /api/market/funds/{code}/history）

  // 5. 推荐基金接口（GET /api/market/funds/recommended）
  describe('GET /api/market/funds/recommended', () => {
    it('should return recommended funds list with default limit', async () => {
      const response = await request(app).get('/api/market/fund/recommended');
      
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('yes');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(10); // 默认返回10条推荐基金
  
    });

    it('should return correct number of recommended funds with limit parameter', async () => {
      const limit = 3;
      const response = await request(app).get(`/api/market/fund/recommended?limit=${limit}`);
      
      expect(response.body.status).toBe('yes');
      expect(response.body.data.length).toBe(limit);
    });

    it('should contain required fields in recommended funds', async () => {
      const response = await request(app).get('/api/market/fund/recommended');
      
      response.body.data.forEach(fund => {
        expect(fund).toHaveProperty('code');
        expect(fund).toHaveProperty('name');
        expect(fund).toHaveProperty('latest_net_value');
        expect(fund).toHaveProperty('change_percent'); // 推荐基金必须包含收益率
      });
    });
  });
});
