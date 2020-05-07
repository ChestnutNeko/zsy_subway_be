var express = require('express');
var router = express.Router();
// 关联主程序
var mainHandler = require('../domain/index');
var cate = require('../controllers/index');
var goods = require('../domain/index2');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'zsy_subway_be' });
});

// 新增失物
router.post('/insert_losts', cate.insertLosts);

// 失物列表
router.post('/get_goods_list', cate.getGoodsList);

// 收藏失物列表
router.post('/collect_goods_list', cate.collectGoodsList);

// 收藏失物
router.get('/collect_losts', function(req, res, next) {
  mainHandler.collectLosts(req, res, next);
});

// 取消收藏失物
router.post('/delete_losts', cate.deleteLosts);

// 收藏路线
router.get('/collect_routes', function(req, res, next) {
  mainHandler.collectRoutes(req, res, next);
});

// 收藏路线列表
router.post('/get_routes_list', cate.getRoutesList);

// 取消收藏路线
router.post('/delete_routes', cate.deleteRoutes);

// 更新用户信息
router.get('/update_user', function(req, res, next) {
  mainHandler.updateUser(req, res, next);
});

// 获取用户信息
// router.get('/user_info', function(req, res, next) {
//   mainHandler.userInfo(req, res, next);
// });
router.post('/user_info', cate.getUserInfo);

// 获取用户列表
router.post('/all_info', cate.getAllInfo);

module.exports = router;