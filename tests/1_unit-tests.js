const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');
let convertHandler = new ConvertHandler();

    const validUnits = ["gal", "L", "mi", "km", "lbs", "kg"];
    const convertUnit = {gal: "L", l: "gal", mi: "Km", km: "mi", lbs: "Kg", kg: "lbs"}
    const spellOutUnits = {gal: "Gallons", l: "Liters", mi: "Miles", km: "Kilometers", lbs: "Pounds", kg: "Kilograms"}

suite('Unit Tests', function(){
    test('correctly read a whole number input',function(){
        assert.equal(convertHandler.getNum('14mi'), 14,'getNum("14mi") should return 14');
    });
    test('correctly read a whole a decimal number input',function(){
        assert.equal(convertHandler.getNum('1.4mi'), 1.4,'getNum("1.4mi") should return 1.4');
    });
    test('correctly read a whole a fractional input',function(){
        assert.equal(convertHandler.getNum('1/4mi'), 1/4,'getNum("1/4mi") should return 1/4');
    });
    test('correctly read decimal number input',function(){
        assert.equal(convertHandler.getNum('1/4.5mi'), 1/4.5,'getNum("1/4.5mi") should return 1/4.5');
    });
    test('correctly return an error on a double-fraction (i.e. 3/2/3).',function(){
        assert.equal(convertHandler.getNum('1/4/5mi'), 'Invalid Number','getNum("1/4/5mi") should return "Invalid Number"');
    });
    test('correctly default to a numerical input of 1 when no numerical input is provided.',function(){
        assert.equal(convertHandler.getNum('mi'), 1,'getNum("mi") should return 1');
    });
    test('should correctly read each valid input unit.',function(){
        assert.equal(convertHandler.getUnit("3min"), 'invalid unit', 'getUnit("3min") should return "invalid unit"');
        assert.equal(convertHandler.getUnit("3"), 'invalid unit', 'getUnit("3") should return "invalid unit"');
    });
    test('Should return the correct return unit for each valid input unit', function () {
        for (let idx in validUnits){
          let unit = validUnits[idx].toLowerCase();
            assert.equal(convertHandler.getReturnUnit(unit), convertUnit[unit], `getReturnUnit("1.5${unit}") should return ${convertUnit[unit]}`);
        }
      });
      
      test('Should correctly correctly return the spelled-out string unit for each valid input unit', function () {
        for (let idx in validUnits) {
          let unit = validUnits[idx].toLowerCase();
          assert.equal(convertHandler.spellOutUnit(unit), spellOutUnits[unit], `spellOutUnit("${unit}") should return ${spellOutUnits[unit]}`);
        }
      }); 
      suite('convert', function () {
        const galToL = 3.78541;
        const lbsToKg = 0.453592;
        const miToKm = 1.60934;
        
        test('Should correctly convert gal to L.', function () {
          assert.equal(convertHandler.convert(1, "gal"), galToL.toFixed(3), `convert(1, "gal") should return ${galToL.toFixed(3)}`);
        }); 
        test('Should correctly convert L to gal.', function () {
          assert.equal(convertHandler.convert(1, "L"), (1/galToL).toFixed(3), `convert(1, "L") should return ${1/galToL.toFixed(3)}`);
        });  
        test('Should correctly convert mi to km.', function () {
          assert.equal(convertHandler.convert(1, "mi"), miToKm.toFixed(3), `convert(1, "mi") should return ${miToKm.toFixed(3)}`);
        }); 
        test('Should correctly convert km to mi.', function () {
          assert.equal(convertHandler.convert(1, "km"), (1/miToKm).toFixed(3), `convert(1, "mi") should return ${(1/miToKm).toFixed(3)}`);
        }); 
        test('Should correctly convert lbs to kg.', function () {
          assert.equal(convertHandler.convert(1, "lbs"), lbsToKg.toFixed(3), `convert(1, "lbs") should return ${lbsToKg.toFixed(3)}`);
        }); 
        test('Should correctly convert kg to lbs.', function () {
          assert.equal(convertHandler.convert(1, "kg"), (1/lbsToKg).toFixed(3), `convert(1, "mi") should return ${(1/lbsToKg).toFixed(3)}`);
        }); 
        
      });//end suite convert
});