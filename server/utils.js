const dayjs = require('dayjs')

const getCurrentDate = () => dayjs().format('YYYY-MM-DD HH:mm')

// 定义 JWT 密钥
const JWT_SECRET = '1234567abcdefg';

module.exports = {
  getCurrentDate,
  JWT_SECRET
}
