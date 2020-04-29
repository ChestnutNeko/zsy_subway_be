/**
 * 后端操作
 */

const subwayDao = require('../dao/index');
const commonLogger = require('../logger/index')(__filename).commonLogger;
const mainHandler = module.exports;

mainHandler.insertLosts = async function(req, res, next) {
    let params = req.reqInfo.params;
    let { name, city, value, date, location, telephone } = params
    try {
        if(!name || !city || !value || !date || !location || !telephone) {
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

mainHandler.getGoodsList = async function(req, res, next) {
    //取前端传参
    let params = req.reqInfo.params;
    let { page, pageSize, goodsName } = params
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
        let num = await subwayDao.getGoodsList(1, goodsName, limit, offset);

        //求总条数和总页数
        let totalNum = num[0].num;
        let pages = Math.ceil(totalNum / pageSize);


        let list = await subwayDao.getGoodsList(2, goodsName, limit, offset)
            //制作数据
        let data = []
        for (let i of list) {
            let tmpObj = {
                // goodsId: i.goodsId,
                goodsName: i.goodsName,
                goodsCity: i.goodsCity,
                goodsValue: i.goodsValue,
                goodsDate: i.goodsDate,
                goodsLocation: i.goodsLocation,
                goodsTelephone: i.goodsTelephone
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

mainHandler.collectGoodsList = async function(req, res, next) {
    let params = req.reqInfo.params;
    let { page, pageSize, goodsName } = params
    try {
        if (!page || !pageSize || isNaN(page) || isNaN(pageSize)) {
            commonLogger.error("[mainHandler] [collectGoodsList] error ", "传参错误");
            throw new Error("传参错误");
        }
        let limit = pageSize;
        let offset = (page - 1) * pageSize;
        let num = await subwayDao.collectGoodsList(1, goodsName, limit, offset);

        let totalNum = num[0].num;
        let pages = Math.ceil(totalNum / pageSize);
        let list = await subwayDao.collectGoodsList(2, goodsName, limit, offset)
        let data = []
        for (let i of list) {
            let tmpObj = {
                goodsId: i.goodsId,
                goodsName: i.goodsName,
                goodsCity: i.goodsCity,
                goodsValue: i.goodsValue,
                goodsLocation: i.goodsLocation,
                goodsTelephone: i.goodsTelephone
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

mainHandler.collectLosts = async function(req, res, next) {
    let params = req.reqInfo.params;
    let { id } = params
    try {
        if(!id) {
            commonLogger.error("[mainHander] [collectLosts] error ", "传参错误");
            throw new Error("传参错误");
        }
        await subwayDao.insertLosts(params);
        res.resInfo.resObj = { msg: '收藏成功' };
        next();
    } catch (error) {
        commonLogger.error("[mainHandler] [collectLosts] error : ", error.message);
        res.resInfo.resObj = { msg: error.message }
        next();
        return;
    }
}

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

mainHandler.collectRoutes = async function(req, res, next) {
    let params = req.reqInfo.params;
    let { id } = params
    try {
        if(!id) {
            commonLogger.error("[mainHander] [collectRoutes] error ", "传参错误");
            throw new Error("传参错误");
        }
        await subwayDao.insertLosts(params);
        res.resInfo.resObj = { msg: '收藏成功' };
        next();
    } catch (error) {
        commonLogger.error("[mainHandler] [collectRoutes] error : ", error.message);
        res.resInfo.resObj = { msg: error.message }
        next();
        return;
    }
}

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

mainHandler.updateUser = async function(req, res, next) {
    let params = req.reqInfo.params;
    let { id, name, password, city, telephone, subway, email } = params
    try {
        if (!id || !name || !password || !city || !telephone || !subway || !email) {
            commonLogger.error("[mainHandler] [updateUser] error ", "传参错误");
            throw new Error("传参错误");
        }
        res.resInfo.resObj = { msg: '获取用户信息成功', body: { id, name, password, city, telephone, subway, email } };
        next();
    } catch (error) {
        commonLogger.error("[mainHandler] [updateUser] error : ", error.message);
        res.resInfo.resObj = { msg: error.message }
        next();
        return;
    }
}

mainHandler.userInfo = async function(req, res, next) {
    let params = req.reqInfo.params;
    let { name, password } = params
    try {
        if (!id || !name || !password || !city || !telephone || !subway || !email) {
            commonLogger.error("[mainHandler] [userInfo] error ", "传参错误");
            throw new Error("传参错误");
        }
        res.resInfo.resObj = { msg: '获取用户信息成功', body: { id, name, password, city, telephone, subway, email } };
        next();
    } catch (error) {
        commonLogger.error("[mainHandler] [userInfo] error : ", error.message);
        res.resInfo.resObj = { msg: error.message }
        next();
        return;
    }
}

mainHandler.allInfo = async function(req, res, next) {
    let params = req.reqInfo.params;
    let { name, password } = params
    try {
        if (!id || !name || !password || !city || !telephone || !subway || !email) {
            commonLogger.error("[mainHandler] [allInfo] error ", "传参错误");
            throw new Error("传参错误");
        }
        res.resInfo.resObj = { msg: '获取用户信息成功', body: { id, name, password, city, telephone, subway, email } };
        next();
    } catch (error) {
        commonLogger.error("[mainHandler] [allInfo] error : ", error.message);
        res.resInfo.resObj = { msg: error.message }
        next();
        return;
    }
}