// login & register

const express = require('express');
const router = express.Router();

const User = require('../../models/User');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

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
            const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar: avatar,
                password: req.body.password
            })
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, function(err, hash){
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

/**
 * $route POST api/users/login
 * @desc 返回token jwt passport
 * @access public
 */
router.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({email: email})
        .then(user => {
            if(!user){
                return res.status(404).json({
                    "email": "用户不存在"
                })
            }else{
                // 密码匹配
                bcrypt.compare(password, user.password, function(err, result) {
                    // result == true
                    if(err) throw err;
                    if(result){
                        let rule = {
                            id: user.id,
                            name: user.name
                        }
                        // jwt.sign('规则','加密名字','参数',callback)
                        jwt.sign(rule, keys.secretOrKey, { expiresIn: '7d' }, (err, token) => {
                            res.status(200).json({
                                success: true,
                                token: "liwei_" + token
                            })
                        })
                    }else {
                        return res.status(200).json({
                            "msg": "密码错误"
                        })
                    }
                });
            }
        })
})

module.exports = router;