'use strict'
const package_json = require('../../../package.json');

class HomeController {

    // get backend name and version form package.json file
    index({ response }) {
        return response.status(200).send({ name: package_json.name, version: package_json.version })
    }
}

module.exports = HomeController
