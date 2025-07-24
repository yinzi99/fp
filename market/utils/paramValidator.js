const { BusinessError } = require('./errors');

/**
 * 正确处理可选参数的验证函数：
 * - 对未传递的参数（undefined）完全放行
 * - 仅拦截传递了但无效的值
 */
const validateFundListParams = (query) => {
  const { page, limit, sort, order } = query;
  const validSortFields = ['latest_net_value', 'change_percent'];
  const validOrders = ['asc', 'desc'];

  // 1. 验证page：仅当传递了page时才检查（可选参数）
  if (page !== undefined) { // 注意：只处理明确传递了page的情况
    const pageNum = Number(page);
    // 无效情况：非数字、小于1、非整数
    if (isNaN(pageNum) || pageNum < 1 || !Number.isInteger(pageNum)) {
      throw new BusinessError('Invalid parameter');
    }
  }

  // 2. 验证limit：仅当传递了limit时才检查（可选参数）
  if (limit !== undefined) { // 只处理明确传递了limit的情况
    const limitNum = Number(limit);
    // 无效情况：非数字、小于1、非整数、大于100
    if (isNaN(limitNum) || limitNum < 1 || !Number.isInteger(limitNum) || limitNum > 100) {
      throw new BusinessError('Invalid parameter');
    }
  }

  // 3. 验证sort：仅当传递了sort时才检查（可选参数）
  if (sort !== undefined) { // 只处理明确传递了sort的情况
    if (!validSortFields.includes(sort)) {
      throw new BusinessError('Invalid parameter');
    }
  }

  // 4. 验证order：仅当传递了order时才检查（可选参数）
  if (order !== undefined) { // 只处理明确传递了order的情况
    // 无效情况：order不是asc/desc，或者传递了order但没传递sort
    if (!validOrders.includes(order) || sort === undefined) {
      throw new BusinessError('Invalid parameter');
    }
  }

  // 所有传递的参数都有效（未传递的参数不影响）
};

module.exports = { validateFundListParams };
