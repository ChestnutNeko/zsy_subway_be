var dbConfig = require('../config/dbconfig');

// 新增失物
insertLosts = (req, res) => {
    let { theLostName, theLostCity, theLostValue, theLostPosition, theLostTelephone } = req.query;
    var sql = 'INSERT INTO the_lost_list (the_lost_name, the_lost_city, the_lost_value, the_lost_position, the_lost_telephone) VALUES (?,?,?,?,?)';
    var sqlArr = [theLostName, theLostCity, theLostValue, theLostPosition, theLostTelephone];
    var callback = (err, data) => {
        if(err) {
            res.send({
                'msg': 'insertLosts error'
            })
        } else {
            res.send({
                // 'data': data,
                'msg': '新增失物成功'
            });
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callback);
}

// 失物列表
getGoodsList = (req, res) => {
    var sql = 'select * from the_lost_list';
    var sqlArr = [];
    var callback = (err, data) => {
        if(err) {
            res.send({
                'code': 404,
                'msg': 'getGoodsList error'
            })
        } else {
            res.send({
                'data': data,
                'msg': '请求成功'
            });
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callback);
}

// 收藏失物列表
collectGoodsList = (req, res) => {
    var sql = 'select * from personal_goods';
    var sqlArr = [];
    var callback = (err, data) => {
        if(err) {
            res.send({
                'code': 404,
                'msg': 'collectGoodsList error'
            })
        } else {
            res.send({
                'data': data
            });
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callback);
}

// 取消收藏失物
deleteLosts = (req, res) => {
    let { id } = req.query;
    var sql = 'DELETE FROM personal_goods WHERE id = ?';
    var sqlArr = [id];
    var callback = (err, data) => {
        if(err) {
            res.send({
                'msg': 'error'
            });
        } else {
            res.send({
                'msg': '取消收藏失物成功'
            });
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callback);
}

// 收藏路线列表
getRoutesList = (req, res) => {
    var sql = 'select * from personal_routes';
    var sqlArr = [];
    var callback = (err, data) => {
        if(err) {
            res.send({
                'code': 404,
                'msg': 'getRoutesList error'
            })
        } else {
            res.send({
                'data': data
            });
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callback);
}

// 取消收藏路线
deleteRoutes = (req, res) => {
    let { id } = req.query;
    var sql = 'DELETE FROM personal_routes WHERE routes_id = ?';
    var sqlArr = [id];
    var callback = (err, data) => {
        if(err) {
            res.send({
                'msg': 'error'
            });
        } else {
            res.send({
                'msg': '取消收藏路线成功'
            });
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callback);
}

// 获取个人信息
getUserInfo = (req, res) => {
    let { username, password } = req.query;
    var sql = 'select * from user_info where user_name=? and user_password=?';
    var sqlArr = [username, password];
    var callback = (err, data) => {
        if(err) {
            res.send({
                'msg': 'error'
            });
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
    getGoodsList,
    collectGoodsList,
    deleteLosts,
    getRoutesList,
    deleteRoutes,
    getUserInfo,
    getAllInfo
}