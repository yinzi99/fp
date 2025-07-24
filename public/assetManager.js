// 页面加载时获取所有资产数据
document.addEventListener('DOMContentLoaded', function() {
  fetchAllAssetData();
});

// 获取所有资产数据的函数
async function fetchAllAssetData() {
  try {
    // 发起GET请求获取所有资产数据
    const response = await fetch('/mywallet', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 可以添加其他必要的请求头，如认证信息
      }
    });
    
    if (!response.ok) {
      throw new Error('获取资产数据失败');
    }
    
    // 解析响应数据
    const data = await response.json();
    
    // 更新所有卡片显示
    updateAllAssetCards(data);
    
  } catch (error) {
    console.error('获取资产数据出错:', error);
    // 可以在这里添加错误处理，如显示错误提示
  }
}

// 更新所有资产卡片显示的数据
function updateAllAssetCards(data) {
  // 确保数据存在
  if (!data) return;
  
  // 更新总资产卡片
  updateTotalAssetCard(data);
  
  // 更新余额卡片
  updateBalanceCard(data);
  
  // 更新股票资产卡片
  updateStockCard(data);
  
  // 更新基金资产卡片
  updateFundCard(data);
}

// 更新总资产卡片
function updateTotalAssetCard(data) {
  // 更新总资产金额
  const totalAssetElement = document.getElementById('totalAssetAmount');
  if (totalAssetElement && data.totalAssetAmount !== undefined) {
    totalAssetElement.textContent = `¥${parseFloat(data.totalAssetAmount).toFixed(2)}`;
  }
  
  // 更新总资产涨幅率
  const totalRateElement = document.getElementById('totalAssetRate');
  if (totalRateElement && data.totalAssetRate !== undefined) {
    const rate = parseFloat(data.totalAssetRate);
    if (rate > 0) {
      totalRateElement.className = 'text-success text-sm font-medium flex items-center';
      totalRateElement.innerHTML = `<i class="fas fa-arrow-up mr-1"> </i>${rate.toFixed(2)}%`;
    } else if (rate < 0) {
      totalRateElement.className = 'text-danger text-sm font-medium flex items-center';
      totalRateElement.innerHTML = `<i class="fas fa-arrow-down mr-1"> </i>${Math.abs(rate).toFixed(2)}%`;
    } else {
      totalRateElement.className = 'text-gray-500 text-sm font-medium flex items-center';
      totalRateElement.innerHTML = `<i class="fas fa-minus mr-1"> </i>${rate.toFixed(2)}%`;
    }
  }
  
  // 更新总资产昨日收益
  const totalProfitElement = document.getElementById('totalAssetProfit');
  if (totalProfitElement && data.totalAssetProfit !== undefined) {
    const profit = parseFloat(data.totalAssetProfit);
    totalProfitElement.textContent = `昨日收益: ¥${profit.toFixed(2)}`;
  }
}

// 更新余额卡片
function updateBalanceCard(data) {
  // 更新余额
  const balanceElement = document.getElementById('currentBalance');
  if (balanceElement && data.balance !== undefined) {
    balanceElement.textContent = `¥${parseFloat(data.balance).toFixed(2)}`;
  }
}

// 更新股票资产卡片
function updateStockCard(data) {
  // 更新股票持有总额
  const stockTotalElement = document.getElementById('stockTotalAmount');
  if (stockTotalElement && data.stockTotalAmount !== undefined) {
    stockTotalElement.textContent = `¥${parseFloat(data.stockTotalAmount).toFixed(2)}`;
  }
  
  // 更新股票涨幅率
  const stockRateElement = document.getElementById('stockRate');
  if (stockRateElement && data.stockRate !== undefined) {
    const rate = parseFloat(data.stockRate);
    if (rate > 0) {
      stockRateElement.className = 'text-success text-sm font-medium flex items-center';
      stockRateElement.innerHTML = `<i class="fas fa-arrow-up mr-1"> </i>${rate.toFixed(2)}%`;
    } else if (rate < 0) {
      stockRateElement.className = 'text-danger text-sm font-medium flex items-center';
      stockRateElement.innerHTML = `<i class="fas fa-arrow-down mr-1"> </i>${Math.abs(rate).toFixed(2)}%`;
    } else {
      stockRateElement.className = 'text-gray-500 text-sm font-medium flex items-center';
      stockRateElement.innerHTML = `<i class="fas fa-minus mr-1"> </i>${rate.toFixed(2)}%`;
    }
  }
  
  // 更新股票昨日收益
  const stockProfitElement = document.getElementById('stockYesterdayProfit');
  if (stockProfitElement && data.stockYesterdayProfit !== undefined) {
    const profit = parseFloat(data.stockYesterdayProfit);
    stockProfitElement.textContent = `昨日收益: ¥${profit.toFixed(2)}`;
  }
}

// 更新基金资产卡片
function updateFundCard(data) {
  // 更新基金持有总额
  const fundTotalElement = document.getElementById('fundTotalAmount');
  if (fundTotalElement && data.fundTotalAmount !== undefined) {
    fundTotalElement.textContent = `¥${parseFloat(data.fundTotalAmount).toFixed(2)}`;
  }
  
  // 更新基金涨幅率
  const fundRateElement = document.getElementById('fundRate');
  if (fundRateElement && data.fundRate !== undefined) {
    const rate = parseFloat(data.fundRate);
    if (rate > 0) {
      fundRateElement.className = 'text-success text-sm font-medium flex items-center';
      fundRateElement.innerHTML = `<i class="fas fa-arrow-up mr-1"> </i>${rate.toFixed(2)}%`;
    } else if (rate < 0) {
      fundRateElement.className = 'text-danger text-sm font-medium flex items-center';
      fundRateElement.innerHTML = `<i class="fas fa-arrow-down mr-1"> </i>${Math.abs(rate).toFixed(2)}%`;
    } else {
      fundRateElement.className = 'text-gray-500 text-sm font-medium flex items-center';
      fundRateElement.innerHTML = `<i class="fas fa-minus mr-1"> </i>${rate.toFixed(2)}%`;
    }
  }
  
  // 更新基金昨日收益
  const fundProfitElement = document.getElementById('fundYesterdayProfit');
  if (fundProfitElement && data.fundYesterdayProfit !== undefined) {
    const profit = parseFloat(data.fundYesterdayProfit);
    fundProfitElement.textContent = `昨日收益: ¥${profit.toFixed(2)}`;
  }
}

// 充值提现相关功能
let currentOperationType = 0;

function openAmountModal(type) {
  currentOperationType = type;
  document.getElementById('modalTitle').textContent = type === 0 ? '充值金额' : '提现金额';
  document.getElementById('amountInput').value = '';
  document.getElementById('amountModal').classList.remove('hidden');
}

function closeAmountModal() {
  document.getElementById('amountModal').classList.add('hidden');
}

async function submitAmount() {
  const amount = parseFloat(document.getElementById('amountInput').value);
  
  if (isNaN(amount) || amount <= 0) {
    alert('请输入有效的金额');
    return;
  }
  
  try {
    const response = await fetch('/mywallet/charge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 可以添加其他必要的请求头，如认证信息
      },
      body: JSON.stringify({
        type: currentOperationType,
        amount: amount
      })
    });
    
    if (!response.ok) {
      throw new Error('请求失败');
    }
    
    const result = await response.json();
    
    // 操作成功后重新获取所有资产数据，更新所有卡片
    fetchAllAssetData();
    
    closeAmountModal();
    alert(`${currentOperationType === 0 ? '充值' : '提现'}成功！`);
    
  } catch (error) {
    console.error('操作失败:', error);
    alert('操作失败，请稍后重试');
  }
}
    