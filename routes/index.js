var express = require('express');
var router = express.Router();
// 关联主程序
var cate = require('../dao/index');

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
router.post('/collect_losts', cate.collectLosts);

// 取消收藏失物
router.post('/delete_losts', cate.deleteLosts);

// 收藏路线
router.post('/collect_routes', cate.collectRoutes);

// 收藏路线列表
router.post('/get_routes_list', cate.getRoutesList);

// 取消收藏路线
router.post('/delete_routes', cate.deleteRoutes);

// 更新用户信息
router.post('/update_user', cate.updateUser);

// 获取用户信息
router.post('/user_info', cate.getUserInfo);

// 获取用户列表
router.post('/all_info', cate.getAllInfo);

module.exports = router;