'use strict';

var utils = require('../utils/writer.js');
var Conselhos = require('../service/ConselhosService');

module.exports.activitiesGET = function activitiesGET (req, res, next) {
  var user = req.swagger.params['user'].value;
  Conselhos.activitiesGET(user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.activitiesPOST = function activitiesPOST (req, res, next) {
  var advice = req.swagger.params['advice'].value;
  var user = req.swagger.params['user'].value;
  Conselhos.activitiesPOST(advice,user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.foodGET = function foodGET (req, res, next) {
  var user = req.swagger.params['user'].value;
  Conselhos.foodGET(user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.foodPOST = function foodPOST (req, res, next) {
  var advice = req.swagger.params['advice'].value;
  var user = req.swagger.params['user'].value;
  Conselhos.foodPOST(advice,user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.generalGET = function generalGET (req, res, next) {
  var user = req.swagger.params['user'].value;
  Conselhos.generalGET(user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.generalPOST = function generalPOST (req, res, next) {
  var advice = req.swagger.params['advice'].value;
  var user = req.swagger.params['user'].value;
  Conselhos.generalPOST(advice,user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.restGET = function restGET (req, res, next) {
  var user = req.swagger.params['user'].value;
  Conselhos.restGET(user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.restPOST = function restPOST (req, res, next) {
  var advice = req.swagger.params['advice'].value;
  var user = req.swagger.params['user'].value;
  Conselhos.restPOST(advice,user)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
