var express = require('express');
var router = express.Router();
// 关联主程序
var mainHandler = require('../domain/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'zsy_subway_be' });
});

// 新增失物
router.post('/insert_losts', function(req, res, next) {
  mainHandler.insertLosts(req, res, next);
});

// 失物列表
router.post('/get_goods_list', function(req, res, next) {
  mainHandler.getGoodsList(req, res, next);
});

// 收藏失物列表
router.post('/collect_goods_list', function(req, res, next) {
  mainHandler.collectGoodsList(req, res, next);
});

// 收藏失物
router.post('/collect_losts', function(req, res, next) {
  mainHandler.collectLosts(req, res, next);
});

// 取消收藏失物
router.post('/delete_losts', function(req, res, next) {
  mainHandler.deleteLosts(req, res, next);
});

// 收藏路线
router.post('/collect_routes', function(req, res, next) {
  mainHandler.collectRoutes(req, res, next);
});

// 收藏路线列表
router.post('/get_routes_list', function(req, res, next) {
  mainHandler.getRoutesList(req, res, next);
});

// 取消收藏路线
router.post('/delete_routes', function(req, res, next) {
  mainHandler.deleteRoutes(req, res, next);
});

// 更新用户信息
router.post('/update_user', function(req, res, next) {
  mainHandler.updateUser(req, res, next);
});

// 获取用户信息
router.post('/user_info', function(req, res, next) {
  mainHandler.userInfo(req, res, next);
});

// 获取用户列表
router.post('/all_info', function(req, res, next) {
  mainHandler.allInfo(req, res, next);
});

module.exports = router;
