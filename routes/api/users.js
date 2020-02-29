// login & register

const express = require('express');
const router = express.Router();

const User = require('../../models/User');
const bcrypt = require('bcrypt');

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

/**
 * $route POST api/users/register
 * @desc 返回请求的json数据
 * @access public
 */
router.post('/register', function (req, res) {
    // 查询数据库中是否存在邮箱
    User.findOne({
        email: req.body.email
    }).then((user) => {
        if(user){
            return res.status(400).json({email: "邮箱已被注册"})
        }else{
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    // Store hash in your password DB.
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(error => console.log(err))
                });
            });
        }
    })
});

module.exports = router;