var dbConfig = require('../config/dbconfig');

// 获取个人信息
getUserInfo = (req, res) => {
    let { username, password } = req.query;
    var sql = 'select * from user_info where user_name=? and user_password=?';
    var sqlArr = [username, password];
    var callback = (err, data) => {
        if(err) {
            console.log('error');
        } else {
            res.send({
                'data': data,
                'msg': '登陆成功'
            });
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callback);
}

// 获取全部用户信息
getAllInfo = (req, res) => {
    var sql = 'select * from user_info';
    var sqlArr = [];
    var callback = (err, data) => {
        if(err) {
            res.send({
                'code': 404,
                'msg': 'user_info error'
            })
        } else {
            res.send({
                'list': data
            });
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callback);
}

module.exports = {
    getUserInfo,
    getAllInfo
}