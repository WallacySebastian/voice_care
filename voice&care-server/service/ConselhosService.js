'use strict';


/**
 * Receber os conselhos de Atividades
 *
 * user String 
 * returns Advice
 **/
exports.activitiesGET = function(user) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "text" : "text"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Inserir conselhos de Atividades
 *
 * advice Advice 
 * user String 
 * no response value expected for this operation
 **/
exports.activitiesPOST = function(advice,user) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Receber os conselhos de Alimentação
 *
 * user String 
 * returns Advice
 **/
exports.foodGET = function(user) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "text" : "text"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Inserir conselhos de Alimentação
 *
 * advice Advice 
 * user String 
 * no response value expected for this operation
 **/
exports.foodPOST = function(advice,user) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Receber os conselhos Gerais
 *
 * user String 
 * returns Advice
 **/
exports.generalGET = function(user) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "text" : "text"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Inserir conselhos Gerais
 *
 * advice Advice 
 * user String 
 * no response value expected for this operation
 **/
exports.generalPOST = function(advice,user) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Receber os conselhos de Repouso
 *
 * user String 
 * returns Advice
 **/
exports.restGET = function(user) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "text" : "text"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Inserir conselhos de Repouso
 *
 * advice Advice 
 * user String 
 * no response value expected for this operation
 **/
exports.restPOST = function(advice,user) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

