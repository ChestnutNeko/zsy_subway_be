/**
 * MySQL底层操作
 */
// const commonLogger = require('../../../../logger/func/loggers')(__filename).commonLogger;
const subwayDao = module.exports;

// 新增失物
subwayDao.insertLosts = function(params) {
    let sql = "INSERT INTO get_the_lost_list (goods_name, goods_city, goods_value, goods_date, goods_location, goods_telephone) VALUES (?,?,?,?,?,?)";
    let args = [params.name, params.city, params.value, params.date, params.location, params.telephone];

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
subwayDao.getGoodsList = function(isCount, goodsName = "", limit, offset) {
    let sql = "";
    let args = [];
    if (isCount === 1) {
        sql = "SELECT COUNT(*) num FROM get_the_lost_list";
    } else {
        sql = "SELECT goods_name goodsName, goods_city goodsCity, goods_value goodsValue, goods_date goodsDate, goods_location goodsLocation, goods_telephone goodsTelephone " +
            " FROM get_the_lost_list";
    }
    if (!!goodsName) {
        sql += " WHERE lost_name LIKE (?)"
        args.push("%" + goodsName + "%");
    }
    if (isCount != 1) {
        sql += '  ORDER BY goods_date LIMIT ? OFFSET ?';
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
subwayDao.collectGoodsList = function(isCount, goodsName = "", limit, offset) {
    let sql = "";
    let args = [];
    if (isCount === 1) {
        sql = "SELECT COUNT(*) num FROM personal_goods";
    } else {
        sql = "SELECT goods_name goodsName, goods_city goodsCity, goods_value goodsValue, goods_date goodsDate, goods_location goodsLocation, goods_telephone goodsTelephone " +
            " FROM personal_goods";
    }
    if (!!goodsName) {
        sql += " WHERE goods_name LIKE (?)"
        args.push("%" + goodsName + "%");
    }
    if (isCount != 1) {
        sql += '  ORDER BY goods_date LIMIT ? OFFSET ?';
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

// 失物收藏（相当于将失物列表数据新增到失物收藏表中）
subwayDao.collectLosts = function(params) {
    let sql = "INSERT INTO the_lost_collect_list (goods_name, goods_city, goods_value, goods_date, goods_location, goods_telephone) VALUES (?,?,?,?,?,?)";
    let args = [params.id];

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
    let sql = "INSERT INTO collect_routes (start, end, position) VALUES (?,?,?)";
    let args = [params.start, params.end, params.position];

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
        sql = "SELECT routes_id, routesId, user_name, userName, routes_name, routesName, routes_start, routesStart, routes_end, routesEnd, routes_position, routesPosiotion " +
            " FROM personal_routes";
    }
    if (!!routesName) {
        sql += " WHERE routes_name LIKE (?)"
        args.push("%" + routesName + "%");
    }
    if (isCount != 1) {
        sql += '  ORDER BY routes_id LIMIT ? OFFSET ?';
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
    let sql = "DELETE FROM collect_routes WHERE id = ?";
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
    let sql = "UPDATE person_info SET ? WHERE id = ?";
    let args = [parmas.id, params.name, parmas.password, params.city, params.telephone, params.subway, params.email];

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
    let sql = "SELECT * FROM user_info WHERE name = ? AND password = ?";
    let args = [parmas.name, params.password];

    return process.mysqlHelper.userQueryPromise(sql, args)
        .then(function(result) {
            commonLogger.debug("[subwayDao] [userInfo] result: ", result);
            return result;
        }).catch(function(error) {
            commonLogger.error("[subwayDao] [userInfo] error: ", error.message);
            throw new Error("mysql error");
        });
}

// 所有信息展示（管理员查看）
subwayDao.allInfo = function(params) {
    let sql = "SELECT * FROM person_info";

    return process.mysqlHelper.userQueryPromise(sql, args)
        .then(function(result) {
            commonLogger.debug("[subwayDao] [allInfo] result: ", result);
            return result;
        }).catch(function(error) {
            commonLogger.error("[subwayDao] [allInfo] error: ", error.message);
            throw new Error("mysql error");
        });
}