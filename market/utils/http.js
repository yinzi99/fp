// utils/http.js
const axios = require('axios');

const http = axios.create({
  baseURL: 'http://localhost:3000/api', // DummyData API
  timeout: 5000
});

http.interceptors.response.use(
  res => res.data,
  err => Promise.reject(err?.response?.data || {
    error_code: 500,
    error_message: 'External API Error'
  })
);

module.exports = http;
