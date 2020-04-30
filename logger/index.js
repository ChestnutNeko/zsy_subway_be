/**
 * 日志
 */

module.exports = function (fileName) {
    const loggerBase = require('./newLoggerBase');
    // loggerBase.init(process.appInfo.mine.id);
  
    return {
      commonLogger: loggerBase.getLogger("common", fileName),
      // 线上日志系统对于分类中的“-”会解析错误，所以这里的名称不要带有“-”
      taskLogger: loggerBase.getLogger("mgmtTask", fileName)
    };
};