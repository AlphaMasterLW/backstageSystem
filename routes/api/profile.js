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
router.post('/add',  passport.authenticate('jwt', { session: false }), (req, res) => {
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

module.exports = router;