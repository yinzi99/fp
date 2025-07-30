const { validateCode, BusinessError } = require('share-utils');
function validateResCode(req) {
    try {
        const code = req.params.code;
        const day = req.query.day;
        validateCode(code); // 验证 code 合法性
        return {
            code,
            day: day !== undefined ? parseInt(day, 10) : undefined
        };
    } catch (err) {
        throw new BusinessError(err.message);
    }
}
module.exports = { validateResCode };
