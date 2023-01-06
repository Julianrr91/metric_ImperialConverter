const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');
let convertHandler = new ConvertHandler();

    const validUnits = ["gal", "L", "mi", "km", "lbs", "kg"];
    const convertUnit = {gal: "L", L: "gal", mi: "km", km: "mi", lbs: "kg", kg: "lbs"}
    const spellOutUnits = {gal: "gallons", L: "liters", mi: "miles", km: "kilometers", lbs: "pounds", kg: "kilograms"}

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
    test('correctly read fractional input with a decimal.',function(){
        assert.equal(convertHandler.getNum('1/4.5mi'), 1/4.5,'getNum("1/4.5mi") should return 1/4.5');
    });
    test('correctly return an error on a double-fraction (i.e. 3/2/3).',function(){
        assert.equal(convertHandler.getNum('1/4/5mi'), 'invalid number','getNum("1/4/5mi") should return "invalid number"');
    });
    test('correctly default to a numerical input of 1 when no numerical input is provided.',function(){
        assert.equal(convertHandler.getNum('mi'), 1,'getNum("mi") should return 1');
    });
    test('correctly read each valid input unit.',function(){
      assert.equal(convertHandler.getNum('14mi'), 14,'getNum("14mi") should return 14');
  });
    test('should correctly return an error for an invalid input unit',function(){
        assert.equal(convertHandler.getUnit("3min"), 'invalid unit', 'getUnit("3min") should return "invalid unit"');
        assert.equal(convertHandler.getUnit("3"), 'invalid unit', 'getUnit("3") should return "invalid unit"');
    });
    test('Should return the correct return unit for each valid input unit', function () {
        for (let idx in validUnits){
          let unit = validUnits[idx];
            assert.equal(convertHandler.getReturnUnit(unit), convertUnit[unit], `getReturnUnit("1.5${unit}") should return ${convertUnit[unit]}`);
        }
      });
      
      test('Should correctly correctly return the spelled-out string unit for each valid input unit', function () {
        for (let idx in validUnits) {
          let unit = validUnits[idx];
          assert.equal(convertHandler.spellOutUnit(unit), spellOutUnits[unit], `spellOutUnit("${unit}") should return ${spellOutUnits[unit]}`);
        }
      }); 
      suite('convert', function () {
        const galToL = 3.78541;
        const lbsToKg = 0.453592;
        const miToKm = 1.60934;
        
        test('Should correctly convert gal to L.', function () {
          assert.equal(convertHandler.convert(1, "gal"), galToL.toFixed(5), `convert(1, "gal") should return ${galToL.toFixed(5)}`);
        }); 
        test('Should correctly convert L to gal.', function () {
          assert.equal(convertHandler.convert(1, "L"), (1/galToL).toFixed(5), `convert(1, "L") should return ${1/galToL.toFixed(5)}`);
        });
        test('Should correctly convert lbs to kg.', function () {
          assert.equal(convertHandler.convert(1, "lbs"), lbsToKg.toFixed(5), `convert(1, "lbs") should return ${lbsToKg.toFixed(5)}`);
        });   
        test('Should correctly convert kg to lbs.', function () {
          assert.equal(convertHandler.convert(1, "kg"), (1/lbsToKg).toFixed(5), `convert(1, "mi") should return ${(1/lbsToKg).toFixed(5)}`);
        }); 
        test('Should correctly convert mi to km.', function () {
          assert.equal(convertHandler.convert(1, "mi"), miToKm.toFixed(5), `convert(1, "mi") should return ${miToKm.toFixed(5)}`);
        }); 
        test('Should correctly convert km to mi.', function () {
          assert.equal(convertHandler.convert(1, "km"), (1/miToKm).toFixed(5), `convert(1, "mi") should return ${(1/miToKm).toFixed(5)}`);
        });         
        
        
      });//end suite convert
});