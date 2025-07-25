// 成功响应格式化
const successResponse = (res, data, message = "success") => {
  res.status(200).json({
    status: "yes",
    data,
    message
  });
};

// 错误响应格式化
const errorResponse = (res, message) => {
  res.status(200).json({
    status: "no",
    data: null,
    message
  });
};

module.exports = { successResponse, errorResponse };
    