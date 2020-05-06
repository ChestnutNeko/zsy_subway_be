/**
 * MySQL底层操作
 */

const commonLogger = require('../logger/index')(__filename).commonLogger;
const subwayDao = module.exports;

// 新增失物
subwayDao.insertLosts = function(params) {
    let sql = "INSERT INTO the_lost_list (the_lost_name, the_lost_city, the_lost_value, the_lost_position, the_lost_telephone) VALUES (?,?,?,?,?)";
    let args = [params.theLostName, params.theLostCity, params.theLostValue, params.theLostPosition, params.theLostTelephone];

    return process.mysqlHelper.userQueryPromise(sql, args)
        .then(function(result) {
            commonLogger.debug("[subwayDao] [insertLosts] result: ", result);
            return result;
        }).catch(function(error) {
            commonLogger.error("[subwayDao] [insertLosts] error: ", error.message);
            throw new Error("mysql error");
        });
}

// 获取失物列表+模糊查询
subwayDao.getGoodsList = function(isCount, theLostName = "", limit, offset) {
    let sql = "";
    let args = [];
    if (isCount === 1) {
        sql = "SELECT COUNT(*) num FROM the_lost_list";
    } else {
        sql = "SELECT the_lost_id theLostId, the_lost_name theLostName, the_lost_city theLostCity, the_lost_value theLostValue, the_lost_date theLostDate, the_lost_position theLostPosition, the_lost_telephone theLostTelephone, the_lost_collect theLostCollect " +
            " FROM the_lost_list";
    }
    if (!!theLostName) {
        sql += " WHERE the_lost_name LIKE (?)"
        args.push("%" + theLostName + "%");
    }
    if (isCount != 1) {
        sql += '  ORDER BY the_lost_date LIMIT ? OFFSET ?';
        args.push(limit, offset);
    }
    commonLogger.debug("[subwayDao] [getGoodsList] sql: ", sql);
    commonLogger.debug("[subwayDao] [getGoodsList] args: ", args);
    return process.mysqlHelper.userQueryPromise(sql, args)
        .then(function(result) {
            commonLogger.debug("[subwayDao] [getGoodsList] result: ", result);
            return result;
        }).catch(function(error) {
            console.log(error);
            commonLogger.error("[subwayDao] [getGoodsList] error: ", error.message);
            throw new Error("mysql error");
        });
}

// 失物收藏列表+模糊查询
subwayDao.collectGoodsList = function(isCount, theLostName = "", limit, offset) {
    let sql = "";
    let args = [];
    if (isCount === 1) {
        sql = "SELECT COUNT(*) num FROM personal_goods";
    } else {
        sql = "SELECT id id, the_lost_id theLostId, user_id userId, the_lost_name theLostName, the_lost_city theLostCity, the_lost_value theLostValue, the_lost_date theLostDate, the_lost_position theLostPosition, the_lost_telephone theLostTelephone, the_lost_collect theLostCollect " +
            " FROM personal_goods";
    }
    if (!!goodsName) {
        sql += " WHERE the_lost_name LIKE (?)"
        args.push("%" + theLostName + "%");
    }
    if (isCount != 1) {
        sql += '  ORDER BY the_lost_date LIMIT ? OFFSET ?';
        args.push(limit, offset);
    }
    commonLogger.debug("[subwayDao] [collectGoodsList] sql: ", sql);
    commonLogger.debug("[subwayDao] [collectGoodsList] args: ", args);
    return process.mysqlHelper.userQueryPromise(sql, args)
        .then(function(result) {
            commonLogger.debug("[subwayDao] [collectGoodsList] result: ", result);
            return result;
        }).catch(function(error) {
            console.log(error);
            commonLogger.error("[subwayDao] [collectGoodsList] error: ", error.message);
            throw new Error("mysql error");
        });
}

// 失物收藏（添加到个人收藏中）
subwayDao.collectLosts = function(params) {
    let sql = "INSERT INTO personal_goods (id, the_lost_id, user_id, the_lost_name, the_lost_city, the_lost_value, the_lost_date, the_lost_position, the_lost_telephone, the_lost_collect) VALUES (?,?,?,?,?,?,?,?,?,?)";
    let args = [params.id, params.theLostId, params.userId, params.theLostName, params.theLostCity, params.theLostValue,params.theLostDate, params.theLostPosition, params.theLostTelephone, params.theLostCollect];

    return process.mysqlHelper.userQueryPromise(sql, args)
        .then(function(result) {
            commonLogger.debug("[subwayDao] [collectLosts] result: ", result);
            return result;
        }).catch(function(error) {
            commonLogger.error("[subwayDao] [collectLosts] error: ", error.message);
            throw new Error("mysql error");
        });
}

// 取消失物收藏（删除）
subwayDao.deleteLosts = function(params) {
    let sql = "DELETE FROM personal_goods WHERE id = ?";
    let args = [params.id];

    return process.mysqlHelper.userQueryPromise(sql, args)
        .then(function(result) {
            commonLogger.debug("[subwayDao] [deleteLosts] result: ", result);
            return result;
        }).catch(function(error) {
            commonLogger.error("[subwayDao] [deleteLosts] error: ", error.message);
            throw new Error("mysql error");
        });
}

// 路线收藏（新增）
subwayDao.collectRoutes = function(params) {
    let sql = "INSERT INTO personal_routes (user_id, routes_name, routes_start, routes_end, routes_time, routes_collect) VALUES (?,?,?)";
    let args = [params.userId, params.routesName, params.routesStart, params.routesEnd, params.routesTime, params.routesCollect];

    return process.mysqlHelper.userQueryPromise(sql, args)
        .then(function(result) {
            commonLogger.debug("[subwayDao] [collectRoutes] result: ", result);
            return result;
        }).catch(function(error) {
            commonLogger.error("[subwayDao] [collectRoutes] error: ", error.message);
            throw new Error("mysql error");
        });
}

// 路线收藏列表+模糊查询
subwayDao.getRoutesList = function(isCount, routesName = "", limit, offset) {
    let sql = "";
    let args = [];
    if (isCount === 1) {
        sql = "SELECT COUNT(*) num FROM personal_routes";
    } else {
        sql = "SELECT id id, routes_id routesId, user_name userName, routes_name routesName, routes_start routesStart, routes_end routesEnd, routes_time routesTime, routes_collect routesCollect " +
            " FROM personal_routes";
    }
    if (!!routesName) {
        sql += " WHERE routes_name LIKE (?)"
        args.push("%" + routesName + "%");
    }
    if (isCount != 1) {
        sql += '  ORDER BY routes_time LIMIT ? OFFSET ?';
        args.push(limit, offset);
    }
    commonLogger.debug("[subwayDao] [getRoutesList] sql: ", sql);
    commonLogger.debug("[subwayDao] [getRoutesList] args: ", args);
    return process.mysqlHelper.userQueryPromise(sql, args)
        .then(function(result) {
            commonLogger.debug("[subwayDao] [getRoutesList] result: ", result);
            return result;
        }).catch(function(error) {
            console.log(error);
            commonLogger.error("[subwayDao] [getRoutesList] error: ", error.message);
            throw new Error("mysql error");
        });
}

// 取消路线收藏（删除）
subwayDao.deleteRoutes = function(params) {
    let sql = "DELETE FROM personal_routes WHERE id = ?";
    let args = [params.id];

    return process.mysqlHelper.userQueryPromise(sql, args)
        .then(function(result) {
            commonLogger.debug("[subwayDao] [deleteRoutes] result: ", result);
            return result;
        }).catch(function(error) {
            commonLogger.error("[subwayDao] [deleteRoutes] error: ", error.message);
            throw new Error("mysql error");
        });
}

// 根据用户id修改个人信息
subwayDao.updateUser = function(params) {
    let sql = "UPDATE user_info SET ? WHERE user_id = ?";
    let args = [parmas.userId, params.userName, parmas.userPassword, params.userCity, params.userTelephone, params.userSubway, params.userEmail];

    return process.mysqlHelper.userQueryPromise(sql, args)
        .then(function(result) {
            commonLogger.debug("[subwayDao] [updateUser] result: ", result);
            return result;
        }).catch(function(error) {
            commonLogger.error("[subwayDao] [updateUser] error: ", error.message);
            throw new Error("mysql error");
        });
}

// 登录（根据用户名和密码）
subwayDao.userInfo = function(params) {
    let sql = "SELECT * FROM user_info WHERE user_name = ? AND user_password = ?";
    let args = [parmas.userName, params.userPassword];

    return process.mysqlHelper.userQueryPromise(sql, args)
        .then(function(result) {
            commonLogger.debug("[subwayDao] [userInfo] result: ", result);
            return result;
        }).catch(function(error) {
            commonLogger.error("[subwayDao] [userInfo] error: ", error.message);
            throw new Error("mysql error");
        });
}

// 用户信息列表（管理员查看）
subwayDao.allInfo = function(isCount, userName = "", limit, offset) {
    let sql = "";
    let args = [];
    if (isCount === 1) {
        sql = "SELECT COUNT(*) num FROM user_info";
    } else {
        sql = "SELECT user_id userId, user_name userName, user_password userPassword, user_type userType, user_city userCity, user_telephone userTelephone, user_subway userSubway, user_email userEmail " +
            " FROM user_info";
    }
    if (!!userName) {
        sql += " WHERE user_info LIKE (?)"
        args.push("%" + userName + "%");
    }
    if (isCount != 1) {
        sql += '  ORDER BY user_id LIMIT ? OFFSET ?';
        args.push(limit, offset);
    }
    commonLogger.debug("[subwayDao] [allInfo] sql: ", sql);
    commonLogger.debug("[subwayDao] [allInfo] args: ", args);
    return process.mysqlHelper.userQueryPromise(sql, args)
        .then(function(result) {
            commonLogger.debug("[subwayDao] [allInfo] result: ", result);
            return result;
        }).catch(function(error) {
            console.log(error);
            commonLogger.error("[subwayDao] [allInfo] error: ", error.message);
            throw new Error("mysql error");
        });
}