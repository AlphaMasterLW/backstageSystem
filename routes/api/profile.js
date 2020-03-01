// profile
const express = require('express');
const router = express.Router();
const passport = require('passport');

/**
 * $route GET api/users/test
 * @desc 返回请求的json数据
 * @access public
 */
router.get('/', function (req, res) {
    res.json({
        "msg": "profile"
    })
});

module.exports = router;