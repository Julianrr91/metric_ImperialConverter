'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  app.route('/').get((req, res)=>{
    res.sendFile(__dirname + '/views/index.html')
  });

  app.route('/api/convert').get(processConversion, (req, res)=>{
    res.send(req.result);
  });

  function processConversion(req, res, next){
    let convertHandler = new ConvertHandler();
    let output = undefined;
    let input = req.query.input;
    
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let returnNum = convertHandler.convert(initNum, initUnit);
    let outputString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    output = {
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: outputString
    };
    req.result = output;
    next();
  }  
  
  
};
