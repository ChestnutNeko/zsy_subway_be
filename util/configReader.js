const ConfigReader = module.exports

ConfigReader.getMysqlConfig = function () {
    return readConfig('db.js')
}

// ConfigReader.getRedisConfig = function () {
//     return readConfig('redis.json')
// }

// ConfigReader.getSpecialConfig = function () {
//     return readConfig('specialConfig.json')
// }

// ConfigReader.getServersConfig = function () {
//     return readConfig('servers.json')
// }
// ConfigReader.getEsConfig = function () {
//     return readConfig('esConfig.json')
// }

const readConfig = function (filename) {
    const environmentName = require('../config/environmentName.json').name
    const configPath = '../config' + environmentName + '/' + filename
    return require(configPath)
}
