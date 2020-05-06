/**
 * 后端操作
 */

const subwayDao = require('../dao/index');
const commonLogger = require('../logger/index')(__filename).commonLogger;
const mainHandler = module.exports;

// 输入失物名称、失物城市、失物价值、领取点、领取点电话增加失物
mainHandler.insertLosts = async function(req, res, next) {
    let params = req.reqInfo.params;
    let { theLostName, theLostCity, theLostValue, theLostPosition, theLostTelephone } = params
    try {
        if(!theLostName || !theLostCity || !theLostValue || !theLostPosition || !theLostTelephone ) {
            commonLogger.error("[mainHander] [insertLosts] error ", "传参错误");
            throw new Error("传参错误");
        }
        await subwayDao.insertLosts(params);
        res.resInfo.resObj = { msg: '发布成功' };
        next();
    } catch (error) {
        commonLogger.error("[mainHandler] [insertLosts] error : ", error.message);
        res.resInfo.resObj = { msg: error.message }
        next();
        return;
    }
}

// 当前页、每页多少条展示失物列表，失物名称搜索
mainHandler.getGoodsList = async function(req, res, next) {
    //取前端传参
    let params = req.reqInfo.params;
    let { page, pageSize, theLostName } = params
    try {
        //做参数校验，看传参的值是否标准，这里判断了是否传了这个值和这个值是否是数字
        if (!page || !pageSize || isNaN(page) || isNaN(pageSize)) {
            //后端打印日志
            commonLogger.error("[mainHandler] [getGoodsList] error ", "传参错误");
            //前端返回
            throw new Error("传参错误");
        }
        //一个分页列表需要查两次库表，一次是查符合条件的数据的条数，一次是查对应页数的那几条数据具体内容

        //isCount为1是返回数据条数，isCount为2是返回数据
        let limit = pageSize;
        let offset = (page - 1) * pageSize;
        let num = await subwayDao.getGoodsList(1, theLostName, limit, offset);

        //求总条数和总页数
        let totalNum = num[0].num;
        let pages = Math.ceil(totalNum / pageSize);

        let list = await subwayDao.getGoodsList(2, theLostName, limit, offset)
            //制作数据
        let data = []
        for (let i of list) {
            let tmpObj = {
                theLostId: i.theLostId,
                theLostName: i.theLostName,
                theLostCity: i.theLostCity,
                theLostValue: i.theLostValue,
                theLostDate: i.theLostDate,
                theLostPosition: i.theLostPosition,
                theLostTelephone: i.theLostTelephone,
                theLostCollect: i.theLostCollect
            };
            data.push(tmpObj);
        }

        //给前端返回
        res.resInfo.resObj = { msg: '获取列表成功', body: { page, pages, pageSize, totalNum, data } };
        next();
    } catch (error) {
        commonLogger.error("[mainHandler] [mainFunc] error : ", error.message);
        res.resInfo.resObj = { msg: error.message }
        next();
        return;
    }
}

// 当前页、每页多少条展示收藏失物列表，失物名称搜索
mainHandler.collectGoodsList = async function(req, res, next) {
    let params = req.reqInfo.params;
    let { page, pageSize, theLostName } = params
    try {
        if (!page || !pageSize || isNaN(page) || isNaN(pageSize)) {
            commonLogger.error("[mainHandler] [collectGoodsList] error ", "传参错误");
            throw new Error("传参错误");
        }
        let limit = pageSize;
        let offset = (page - 1) * pageSize;
        let num = await subwayDao.collectGoodsList(1, theLostName, limit, offset);

        let totalNum = num[0].num;
        let pages = Math.ceil(totalNum / pageSize);
        let list = await subwayDao.collectGoodsList(2, theLostName, limit, offset)
        let data = []
        for (let i of list) {
            let tmpObj = {
                id: i.id,
                theLostId: i.theLostId,
                userId: i.userId,
                theLostName: i.theLostName,
                theLostCity: i.theLostCity,
                theLostValue: i.theLostValue,
                theLostDate: i.theLostDate,
                theLostPosition: i.theLostPosition,
                theLostTelephone: i.theLostTelephone,
                theLostCollect: i.theLostCollect
            };
            data.push(tmpObj);
        }
        res.resInfo.resObj = { msg: '获取列表成功', body: { page, pages, pageSize, totalNum, data } };
        next();
    } catch (error) {
        commonLogger.error("[mainHandler] [collectGoodsList] error : ", error.message);
        res.resInfo.resObj = { msg: error.message }
        next();
        return;
    }
}

// 根据id收藏失物
mainHandler.collectLosts = async function(req, res, next) {
    let params = req.reqInfo.params;
    let { id } = params
    try {
        if(!id) {
            commonLogger.error("[mainHander] [collectLosts] error ", "传参错误");
            throw new Error("传参错误");
        }
        res.resInfo.resObj = { msg: '收藏成功' };
        next();
    } catch (error) {
        commonLogger.error("[mainHandler] [collectLosts] error : ", error.message);
        res.resInfo.resObj = { msg: error.message }
        next();
        return;
    }
}

// 根据id取消收藏失物
mainHandler.deleteLosts = async function(req, res, next) {
    let params = req.reqInfo.params;
    let { id } = params
    try {
        if (!id) {
            commonLogger.error("[mainHandler] [deleteLosts] error ", "传参错误");
            throw new Error("传参错误");
        }
        res.resInfo.resObj = { msg: '失物取消收藏成功' };
        next();
    } catch (error) {
        commonLogger.error("[mainHandler] [deleteLosts] error : ", error.message);
        res.resInfo.resObj = { msg: error.message }
        next();
        return;
    }
}

// 根据id收藏路线
mainHandler.collectRoutes = async function(req, res, next) {
    let params = req.reqInfo.params;
    let { id } = params
    try {
        if(!id) {
            commonLogger.error("[mainHander] [collectRoutes] error ", "传参错误");
            throw new Error("传参错误");
        }
        res.resInfo.resObj = { msg: '收藏成功' };
        next();
    } catch (error) {
        commonLogger.error("[mainHandler] [collectRoutes] error : ", error.message);
        res.resInfo.resObj = { msg: error.message }
        next();
        return;
    }
}

// 当前页、每页多少条显示列表，路线名搜索
mainHandler.getRoutesList = async function(req, res, next) {
    let params = req.reqInfo.params;
    let { page, pageSize, routesName } = params
    try {
        if (!page || !pageSize || isNaN(page) || isNaN(pageSize)) {
            commonLogger.error("[mainHandler] [getRoutesList] error ", "传参错误");
            throw new Error("传参错误");
        }
        let limit = pageSize;
        let offset = (page - 1) * pageSize;
        let num = await subwayDao.getRoutesList(1, routesName, limit, offset);

        let totalNum = num[0].num;
        let pages = Math.ceil(totalNum / pageSize);
        let list = await subwayDao.getRoutesList(2, routesName, limit, offset)
        let data = []
        for (let i of list) {
            let tmpObj = {
                routesId: i.routesId,
                userName: i.userName,
                routesName: i.routesName,
                routesStart: i.routesStart,
                routesEnd: i.routesEnd,
                routesLocation: i.routesLocation
            };
            data.push(tmpObj);
        }
        res.resInfo.resObj = { msg: '获取列表成功', body: { page, pages, pageSize, totalNum, data } };
        next();
    } catch (error) {
        commonLogger.error("[mainHandler] [getRoutesList] error : ", error.message);
        res.resInfo.resObj = { msg: error.message }
        next();
        return;
    }
}

// 根据id删除收藏路线
mainHandler.deleteRoutes = async function(req, res, next) {
    let params = req.reqInfo.params;
    let { id } = params
    try {
        if (!id) {
            commonLogger.error("[mainHandler] [deleteRoutes] error ", "传参错误");
            throw new Error("传参错误");
        }
        res.resInfo.resObj = { msg: '路线取消收藏成功' };
        next();
    } catch (error) {
        commonLogger.error("[mainHandler] [deleteRoutes] error : ", error.message);
        res.resInfo.resObj = { msg: error.message }
        next();
        return;
    }
}

// 用户更新信息
mainHandler.updateUser = async function(req, res, next) {
    let params = req.reqInfo.params;
    let { userId, userName, userPassword, userType, userCity, userTelephone, userSubway, userEmail } = params
    try {
        if (!userId || !userName || !userPassword || !userType || !userCity || !userTelephone || !userSubway || !userEmail) {
            commonLogger.error("[mainHandler] [updateUser] error ", "传参错误");
            throw new Error("传参错误");
        }
        res.resInfo.resObj = { msg: '获取用户信息成功', body: { userId, userName, userPassword, userType, userCity, userTelephone, userSubway, userEmail } };
        next();
    } catch (error) {
        commonLogger.error("[mainHandler] [updateUser] error : ", error.message);
        res.resInfo.resObj = { msg: error.message }
        next();
        return;
    }
}

// 输入用户名、密码登录
mainHandler.userInfo = async function(req, res, next) {
    let params = req.reqInfo.params;
    let { userName, userPassword } = params
    try {
        if (!userName || !userPassword) {
            commonLogger.error("[mainHandler] [userInfo] error ", "传参错误");
            throw new Error("传参错误");
        }
        res.resInfo.resObj = { msg: '获取用户信息成功', body: { userId, userName, userPassword, userType, userCity, userTelephone, userSubway, userEmail } };
        next();
    } catch (error) {
        commonLogger.error("[mainHandler] [userInfo] error : ", error.message);
        res.resInfo.resObj = { msg: error.message }
        next();
        return;
    }
}

// 当前页、每页多少条查看列表，用户名搜索
mainHandler.allInfo = async function(req, res, next) {
    let params = req.reqInfo.params;
    let { page, pageSize, userName } = params
    try {
        if (!page || !pageSize || isNaN(page) || isNaN(pageSize)) {
            commonLogger.error("[mainHandler] [allInfo] error ", "传参错误");
            throw new Error("传参错误");
        }
        let limit = pageSize;
        let offset = (page - 1) * pageSize;
        let num = await subwayDao.allInfo(1, userName, limit, offset);

        //求总条数和总页数
        let totalNum = num[0].num;
        let pages = Math.ceil(totalNum / pageSize);

        let list = await subwayDao.allInfo(2, userName, limit, offset)
        let data = []
        for (let i of list) {
            let tmpObj = {
                userId: i.userId,
                userName: i.userName,
                userPassword: i.userPassword,
                userType: i.userType,
                userCity: i.userCity,
                userTelephone: i.userTelephone,
                userSubway: i.userSubway,
                userEmail: i.userEmail
            };
            data.push(tmpObj);
        }
        res.resInfo.resObj = { msg: '获取列表成功', body: { page, pages, pageSize, totalNum, data } };
        next();
    } catch (error) {
        commonLogger.error("[mainHandler] [allInfo] error : ", error.message);
        res.resInfo.resObj = { msg: error.message }
        next();
        return;
    }
}