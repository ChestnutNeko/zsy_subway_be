const mysql = require('mysql');

module.exports = {
    // 数据库配置
    config: {
        host: 'localhost', 
        user: 'root',
        password: '123456',
        database:'zsy_subway_db',
        port: 3306
    },
    // 连接数据库，使用mysql的连接池连接方式
    // 连接池对象
    sqlConnect: function(sql, sqlArr, callback) {
        var pool = mysql.createPool(this.config)
        pool.getConnection((err, conn) => {
            if(err) {
                console.log('error');
                return;
            }
            // 事件驱动回调
            conn.query(sql, sqlArr, callback);
            // 释放连接
            conn.release();
        });
    }
}