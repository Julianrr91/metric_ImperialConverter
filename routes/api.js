'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route("/api/convert")
    .get((req, res) => {
      let input = req.query.input;
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let spellInitUnit = convertHandler.spellOutUnit(initUnit);
      let spellReturnUnit = convertHandler.spellOutUnit(returnUnit);
      let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      let responseObject = {};
      responseObject["initNum"] = initNum;
      responseObject["initUnit"] = initUnit;
      responseObject["returnNum"] = returnNum;
      responseObject["returnUnit"] = returnUnit;
      responseObject["string"] = toString;

      function whiteSpaces(arg) {
        let whiteRegex = /[\s]+/;
        return whiteRegex.test(input);
      }

      if (initNum === "invalid number" && initUnit === "invalid unit" || input === "" || whiteSpaces(input)) {
        responseObject = "invalid number and unit";
      } else if (initNum === "invalid number" && initUnit !== "invalid unit") {
        responseObject = "invalid number";
      } else if (initUnit === "invalid unit" && initNum !== "invalid number" ) {
        responseObject = "invalid unit";
      }
      
      res.json(responseObject);
    });

  /*app.route('/').get((req, res)=>{
    res.sendFile(__dirname + '/views/index.html')
  });*/

  /*app.route('/api/convert').get(processConversion, (req, res)=>{
    res.send(req.result);
  });

  function processConversion(req, res, next){
    
    let output = undefined;
    let input = req.query.input;
    
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let returnNum = convertHandler.convert(initNum, initUnit);
    let outputString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    console.log(initNum);
    console.log(initUnit);

    if(initNum === 'invalid number' && initUnit === 'invalid unit'){
      output = {string:'invalid number and unit'};  
    }
    else if (initNum === 'invalid number' && initUnit !== 'invalid unit'){
      output = {string:'invalid number'};
    }
    else if(initUnit === 'invalid unit' && initNum !== 'invalid number'){
      output = {string:'invalid unit'};
    }
    
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
  */
  
};
