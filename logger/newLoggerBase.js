/**
 * 日志方法
 */

const log4js = require('log4js');
const newLoggerBase = module.exports;

const colorizeStart = function (style) {
    return style ? '\x1B[' + styles[style][0] + 'm' : '';
};

const colorizeEnd = function (style) {
    return style ? '\x1B[' + styles[style][1] + 'm' : '';
};

const colorize = function (str, style) {
    return colorizeStart(style) + str + colorizeEnd(style);
};

const styles = {
    //styles
    'bold': [1, 22],
    'italic': [3, 23],
    'underline': [4, 24],
    'inverse': [7, 27],
    'white': [37, 39],
    'grey': [90, 39],
    'black': [90, 39],
    'blue': [34, 39],
    'cyan': [36, 39],
    'green': [32, 39],
    'magenta': [35, 39],
    'red': [31, 39],
    'yellow': [33, 39]
};

const colours = {
    'all': "grey",
    'trace': "blue",
    'debug': "cyan",
    'info': "green",
    'warn': "yellow",
    'error': "red",
    'fatal': "magenta",
    'off': "grey"
};

newLoggerBase.init = function (serverId) {
    // let specialConfig = require('../util/configReader').getSpecialConfig();

    // specialConfig.logger.layout配置的是日志格式，区别线上和开发环境
    let layout = {};
    if(!!specialConfig.logger && !!specialConfig.logger.layout){
        layout = specialConfig.logger.layout;
        if( !!layout.pattern ){
            let log_ext = process.appInfo.mine.ip + ":" + process.appInfo.mine.httpPort
            layout.pattern = layout.pattern.replace('_log_ext_', log_ext);
        }
    }
    
    const logger_config = {
        "appenders": [
            {
                "type": "console",
                "layout": layout
            },
            {
                "type": "dateFile",
                "filename": "./logs/common/${opts:serverId}-",
                "alwaysIncludePattern": true,
                "pattern": "yyyyMMdd.log",
                "category": "common",
                "layout": layout
            },
            {
                "type": "dateFile",
                "filename": "./logs/task/${opts:serverId}-",
                "alwaysIncludePattern": true,
                "pattern": "yyyyMMdd.log",
                "category": "mgmtTask",
                "layout": layout
            }
        ],
        
        "levels": {
            "common": "info",
            "mgmtTask": "info"
        },
        "replaceConsole": true
    };

    // 替换当前环境的日志等级
    if(!!specialConfig.logger && !!specialConfig.logger.levels) {
        logger_config.levels = Object.assign({}, logger_config.levels, specialConfig.logger.levels);
    }

    const arr = logger_config.appenders;
    for (let i = 0, len = arr.length; i < len; i++) {
        if (!!arr[i].filename) {
            arr[i].filename = arr[i].filename.replace('${opts:serverId}', serverId);
        }
    }

    log4js.configure(logger_config);
};

newLoggerBase.getLogger = function (loggerType, filename) {
    const logger = log4js.getLogger(loggerType);
    // let specialConfig = require('../util/configReader').getSpecialConfig();

    const newLogger = {};
    for (const key in logger) {
        newLogger[key] = logger[key];
    }

    const index = filename.indexOf("webserver");
    const length = filename.length;
    filename = filename.substring(index + 10, length);


    const loggersArray = ['fatal', 'log', 'debug', 'info', 'warn', 'error', 'trace'];

    for (let i = 0, len = loggersArray.length; i < len; i++) {
        
        newLogger[loggersArray[i]] = function () {
            let colorId = colours[loggersArray[i]];
            let pattern = '';
            let fname = filename;
            let filenamePrefix = "[" + fname + "]";

            if(!!specialConfig.logger &&
               !!specialConfig.logger.layout &&
               !!specialConfig.logger.layout.pattern
            ){
                pattern = specialConfig.logger.layout.pattern;
            }
            
            if(!!pattern) {
                // 如果设置了layout导致没有颜色,消息加色
                arguments[0] = colorize(filenamePrefix + arguments[0],colorId);
            } else {
                arguments[0] = colorize(filenamePrefix, colorId) + arguments[0];
            }

            logger[loggersArray[i]].apply(logger, arguments);
        };
    }
    return newLogger;
};