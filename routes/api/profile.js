// profile
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Profile = require('../../models/Profile')

/**
 * $route POST api/profile/add
 * @desc 创建信息接口
 * @access private
 */
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    const profileFields = {}
    profileFields.type = req.body.type ? req.body.type : null;
    profileFields.describe = req.body.describe ? req.body.describe : null;
    profileFields.income = req.body.income ? req.body.income : null;
    profileFields.expend = req.body.expend ? req.body.expend : null;
    profileFields.cash = req.body.cash ? req.body.cash : null;
    profileFields.remark = req.body.remark ? req.body.remark : null;

    new Profile(profileFields).save().then((profile) => {
        res.json(profile)
    })
});

/**
 * $route GET api/profile/
 * @desc 获取所有信息
 * @access private
 */
router.get('/',  passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.find().then((profiles) => {
        if(!profiles){
            return res.status(404).json('没有任何内容')
        }
        res.status(200).json(profiles)
    }).catch(err => res.status(404).json(err))
});

/**
 * $route GET api/profile/:id
 * @desc 获取所有信息
 * @access private
 */
router.get('/:id',  passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({
        _id: req.params.id
    }).then((profile) => {
        if(!profile){
            return res.status(404).json('没有任何内容')
        }
        res.status(200).json(profile)
    }).catch(err => res.status(404).json(err))
});

module.exports = router;