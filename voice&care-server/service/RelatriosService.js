'use strict';


/**
 * Acessar relatório do paciente
 *
 * user String 
 * datetime date 
 * returns Report
 **/
exports.reportGET = function(user,datetime) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "comments" : "comments",
  "mood" : 1,
  "temperature" : 0.8008282,
  "bpm" : 6
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Inserir relatório do paciente
 *
 * user String 
 * report Report 
 * no response value expected for this operation
 **/
exports.reportPOST = function(user,report) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

