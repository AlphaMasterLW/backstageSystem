// login & register

const express = require('express');
const router = express.Router();

/**
 * $route GET api/users/test
 * @desc 返回请求的json数据
 * @access public
 */
router.get('/test', function (req, res) {
    res.json({
        "msg": "你好啊"
    })
});

module.exports = router;