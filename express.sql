/*
SQLyog 企业版 - MySQL GUI v8.14 
MySQL - 5.5.40 : Database - test
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`zsy_subway_bd` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `zsy_subway_bd`;

/*Table structure for table `personal_routes` */

DROP TABLE IF EXISTS `personal_routes`;

CREATE TABLE `personal_routes` (
  `routes_id` int(20) NOT NULL AUTO_INCREMENT COMMENT '收藏路线编号',
  `user_id` int(20) NOT NULL COMMENT '用户编号',
  `user_name` varchar(255) DEFAULT NULL COMMENT '用户名',
  `routes_name` varchar(255) DEFAULT NULL COMMENT '路线名',
  `routes_start` varchar(255) DEFAULT NULL COMMENT '起始点',
  `routes_end` varchar(255) DEFAULT NULL COMMENT '终点',
  `routes_time` timestamp NULL DEFAULT current_timestamp COMMENT '创建时间',
  `routes_collect` int(20) NULL DEFAULT COMMENT '是否可以取消收藏',
  PRIMARY KEY (`routes_id`)
) ENGINE=MyISAM AUTO_INCREMENT=120 DEFAULT CHARSET=utf8;

/*Data for the table `personal_routes` */

insert into `personal_routes`(`routes_id`,`user_id`,`user_name`,`routes_name`,`routes_start`,`routes_end`,`routes_time`,`routes_collect`) values (20,12,'liz','大族广场','经海路','荣昌东街','2020-03-03 11:06:28',1),(118,24,'zsy','返校','哈尔滨西站','哈尔滨理工大学站','2020-03-03 11:06:28',0);

/*Table structure for table `user_info` */

DROP TABLE IF EXISTS `user_info`;

CREATE TABLE `user_info` (
  `user_id` int(20) NOT NULL AUTO_INCREMENT COMMENT '用户编号',
  `user_name` char(255) DEFAULT NULL COMMENT '用户名',
  `user_password` char(255) DEFAULT NULL COMMENT '密码',
  `user_type` int(20) NULL COMMENT '用户类型',
  `user_city` varchar(255) NULL COMMENT '城市',
  `user_telephone` varchar(255) NULL COMMENT '电话',
  `user_subway` varchar(20) NULL COMMENT '地铁',
  `user_email` varchar(20) NULL COMMENT '邮箱',
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `user_info` */

insert into `user_info`(`user_id`,`user_name`,`user_password`,`user_type`,`user_city`,`user_telephone`,`user_subway`,`user_email`) values (12,'zsy','123456',1,'北京','18890012234','经海路','123456@qq.com'),(15,'liz','123456',2,'沈阳','12399990000','沈阳北站','123456@qq.com');

/*Table structure for table `personal_goods` */

DROP TABLE IF EXISTS `personal_goods`;

CREATE TABLE `personal_goods` (
  `the_lost_id` int(20) NOT NULL AUTO_INCREMENT COMMENT '收藏失物编号',
  `user_id` int(20) NOT NULL COMMENT '用户编号',
  `user_name` char(255) DEFAULT NULL COMMENT '用户名',
  `the_lost_name` varchar(255) DEFAULT NULL COMMENT '失物名称',
  `the_lost_city` varchar(255) DEFAULT NULL COMMENT '城市',
  `the_lost_value` int(20) DEFAULT NULL COMMENT '预估金额（元）',
  `the_lost_date` timestamp NULL DEFAULT current_timestamp COMMENT '日期',
  `the_lost_position` varchar(255) NULL DEFAULT COMMENT '领取点',
  `the_lost_telephone` varchar(255) NULL DEFAULT COMMENT '领取点电话',
  `the_lost_collect` int(20) NULL DEFAULT COMMENT '是否可以取消收藏',
  PRIMARY KEY (`the_lost_id`)
) ENGINE=MyISAM AUTO_INCREMENT=120 DEFAULT CHARSET=utf8;

/*Data for the table `personal_goods` */

insert into `personal_goods`(`the_lost_id`,`user_id`,`user_name`,`the_lost_name`,`the_lost_city`,`the_lost_value`,`the_lost_date`,`the_lost_position`,`the_lost_telephone`,`the_lost_collect`) values (20,12,'liz','iphone6s','北京',2000,'2020-03-05 15:06:28','经海路站','13900001111',0),(21,24,'zsy','书包','哈尔滨',888,'2020-03-04 11:06:28','黑龙江大学站','13522345001',1);

/*Table structure for table `the_lost_list` */

DROP TABLE IF EXISTS `the_lost_list`;

CREATE TABLE `the_lost_list` (
  `the_lost_id` int(20) NOT NULL AUTO_INCREMENT COMMENT '失物编号',
  `the_lost_name` varchar(255) DEFAULT NULL COMMENT '失物名称',
  `the_lost_city` varchar(255) DEFAULT NULL COMMENT '城市',
  `the_lost_value` int(20) DEFAULT NULL COMMENT '预估金额（元）',
  `the_lost_date` timestamp NULL DEFAULT current_timestamp COMMENT '日期',
  `the_lost_position` varchar(255) NULL DEFAULT COMMENT '领取点',
  `the_lost_telephone` varchar(255) NULL DEFAULT COMMENT '领取点电话',
  `the_lost_collect` int(20) NULL DEFAULT COMMENT '是否可以收藏',
  PRIMARY KEY (`the_lost_id`)
) ENGINE=MyISAM AUTO_INCREMENT=120 DEFAULT CHARSET=utf8;

/*Data for the table `the_lost_list` */

insert into `the_lost_list`(`the_lost_id`,`the_lost_name`,`the_lost_city`,`the_lost_value`,`the_lost_date`,`the_lost_position`,`the_lost_telephone`,`the_lost_collect`) values (20,'liz','iphone6s', 2000,'2020-03-03 11:06:28','经海路站','13900001111',0),(21,'zsy','书包', 888,'2020-02-05 13:06:28','黑龙江大学站','13522345001',1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
