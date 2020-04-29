# zsy_subway 的后台管理系统（Nodejs+Express+MySQL)

## 项目启动

```
    npm start

```

## 项目结构

/.config mysql连接本地

/.dao mysql底层操作

/.domain 接口方法

/.routes 接口

/.express.sql 数据库

## 接口

/insert_losts 新增失物

/get_goods_list 失物列表

/collect_goods_list 收藏失物列表

/collect_losts 收藏失物

/delete_losts 取消收藏失物

/collect_routes 收藏路线

/get_routes_list 收藏路线列表

/delete_routes 取消收藏路线

/update_user 更新用户信息

/user_info 获取用户信息

/all_info 获取用户列表