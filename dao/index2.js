var good={
	//增
	insertLosts: 'INSERT INTO `personal_goods` (`the_lost_id`,`user_id`,`the_lost_name`,`the_lost_city`,`the_lost_value`,`the_lost_date`,`the_lost_position`,`the_lost_telephone`,`the_lost_collect`) VALUES(?,?,?,?,?,?,?,?,?)',
	//删
	// gooddelete: 'delete from good where id=?',
	//改
	// goodupdate:'UPDATE `good` SET `name`=?,`desc`=?,`price`=?,`sum`=? WHERE `id`=?',
    //查
    allInfo: 'select * from user_info',
    userInfo: 'select * from user_info where user_name=? and user_password=?'
}

module.exports=good;