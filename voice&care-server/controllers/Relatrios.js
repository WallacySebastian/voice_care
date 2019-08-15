'use strict';

var utils = require('../utils/writer.js');
var Relatrios = require('../service/RelatriosService');

module.exports.reportGET = function reportGET (req, res, next) {
  var user = req.swagger.params['user'].value;
  var datetime = req.swagger.params['datetime'].value;
  Relatrios.reportGET(user,datetime)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.reportPOST = function reportPOST (req, res, next) {
  var user = req.swagger.params['user'].value;
  var report = req.swagger.params['report'].value;
  Relatrios.reportPOST(user,report)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
