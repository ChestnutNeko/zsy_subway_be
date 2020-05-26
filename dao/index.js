var dbConfig = require('../config/dbconfig');

// 新增失物
insertLosts = (req, res) => {
    let { theLostName, theLostCity, theLostValue, theLostPosition, theLostTelephone } = req.body;
    var sql = 'INSERT INTO the_lost_list (the_lost_name, the_lost_city, the_lost_value, the_lost_position, the_lost_telephone) VALUES (?,?,?,?,?)';
    var sqlArr = [theLostName, theLostCity, theLostValue, theLostPosition, theLostTelephone];
    var callback = (err, data) => {
        if(err) {
            console.log('??????', err)
            res.send({
                'msg': 'error'
            });
        } else {
            res.send({
                'code': 0,
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
                'msg': 'error'
            });
        } else {
            res.send({
                'code': 0,
                'data': data,
                'msg': '获取失物列表成功'
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
                'msg': 'error'
            });
        } else {
            res.send({
                'code': 0,
                'data': data
            });
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callback);
}

// 收藏失物
collectLosts = (req, res) => {
    let { theLostId, userId, theLostName, theLostCity, theLostValue, theLostPosition, theLostTelephone } = req.body;
    var sql = 'INSERT INTO personal_goods (the_lost_id, user_id, the_lost_name, the_lost_city, the_lost_value, the_lost_position, the_lost_telephone) VALUES (?,?,?,?,?,?,?)';
    var sqlArr = [theLostId, userId, theLostName, theLostCity, theLostValue, theLostPosition, theLostTelephone];
    var callback = (err, data) => {
        if(err) {
            console.log('??收藏失物', err)
            res.send({
                'msg': 'error'
            });
        } else {
            res.send({
                'code': 0,
                'msg': '收藏成功，请到个人中心查看'
            });
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callback);
}

// 取消收藏失物
deleteLosts = (req, res) => {
    let { id } = req.body;
    var sql = 'DELETE FROM personal_goods WHERE id = ?';
    var sqlArr = [id];
    var callback = (err, data) => {
        if(err) {
            res.send({
                'msg': 'error'
            });
        } else {
            res.send({
                'code': 0,
                'msg': '取消收藏失物成功'
            });
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callback);
}

// 收藏路线
collectRoutes = (req, res) => {
    let { userId, userName, routesName, routesStart, routesEnd } = req.body;
    var sql = 'INSERT INTO personal_routes (user_id, user_name, routes_name, routes_start, routes_end) VALUES (?,?,?,?,?)';
    var sqlArr = [userId, userName, routesName, routesStart, routesEnd];
    var callback = (err, data) => {
        if(err) {
            console.log('??收藏路线', err)
            res.send({
                'msg': 'error'
            });
        } else {
            res.send({
                'code': 0,
                'msg': '收藏成功，请到个人中心查看'
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
                'msg': 'error'
            });
        } else {
            res.send({
                'code': 0,
                'data': data
            });
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callback);
}

// 取消收藏路线
deleteRoutes = (req, res) => {
    let { id } = req.body;
    var sql = 'DELETE FROM personal_routes WHERE routes_id = ?';
    var sqlArr = [id];
    var callback = (err, data) => {
        if(err) {
            res.send({
                'msg': 'error'
            });
        } else {
            res.send({
                'code': 0,
                'msg': '取消收藏路线成功'
            });
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callback);
}

// 更新用户信息
updateUser = (req, res) => {
    let { id, name, password, city, telephone, subway, email } = req.body;
    var sql = 'UPDATE user_info SET user_name=?,user_password=?,user_city=?,user_telephone=?,user_subway=?,user_email=? WHERE user_id=?';
    var sqlArr = [id, name, password, city, telephone, subway, email ];
    var callback = (err, data) => {
        if(err) {
            res.send({
                'msg': 'error'
            });
        } else {
            res.send({
                'code': 0,
                'msg': '更新成功'
            });
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callback);
}

// 获取个人信息
getUserInfo = (req, res) => {
    let { username, password } = req.body;
    var sql = 'select * from user_info where user_name=? and user_password=?';
    var sqlArr = [username, password];
    var callback = (err, data) => {
        if(err) {
            res.send({
                'msg': 'error'
            });
        } else {
            res.send({
                'code': 0,
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
                'msg': 'error'
            });
        } else {
            res.send({
                'code': 0,
                'list': data
            });
        }
    }
    dbConfig.sqlConnect(sql, sqlArr, callback);
}

module.exports = {
    insertLosts,
    getGoodsList,
    collectGoodsList,
    collectLosts,
    deleteLosts,
    collectRoutes,
    getRoutesList,
    deleteRoutes,
    updateUser,
    getUserInfo,
    getAllInfo
}