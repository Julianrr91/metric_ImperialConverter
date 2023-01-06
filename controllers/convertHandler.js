function ConvertHandler() {
  this.getNum = function (input) {
    let result;
    let num = undefined;
    num = input.replace(/[^0-9\.]+/g, "");
    if (num > 0) {
      if (input.includes("/")) {
        function stringToIntArray(string) {
          return string.split("/").map(function (v) {
            return parseFloat(v);
          });
        }
        const splitArr = stringToIntArray(input);
        if (splitArr.length > 2) {
          result = "invalid number";
        } else {
          result = parseFloat(splitArr[0]) / parseFloat(splitArr[1]);
        }
      } else {
        result = input.replace(/[^0-9\.]+/g, "");
      }
    } else {
      result = 1;
    }
    return result;
  };


  this.getUnit = function (input) {
    let result;
    result = input.replace(/[^a-zA-Z ]/g, "");
    switch(result.toLowerCase()){
        case "gal":
        result = "gal";
        break;
      case "l":
        result = "L";
        break;
      case "lbs":
        result = "lbs";
        break;
      case "kg":
        result = "kg";
        break;
      case "mi":
        result = "mi";
        break;
      case "km":
        result = "km";
        break;
      default:
        result = "invalid unit";
        break;
    }
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    switch (initUnit.toLowerCase()) {
      case "gal":
        result = "L";
        break;
      case "l":
        result = "gal";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
      default:
        result = "invalid unit";
        break;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch(unit){
      case "gal":
      result = "gallons";
      break;
    case "L":
      result = "liters";
      break;
    case "lbs":
      result = "pounds";
      break;
    case "kg":
      result = "kilograms";
      break;
    case "mi":
      result = "miles";
      break;
    case "km":
      result = "kilometers";
      break
    default:
      result = 'Error spell';
      break;  
  }
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit.toLowerCase()) {
      case "gal":
        result = +(initNum * galToL).toFixed(5);
        break;
      case "l":
        result = +(initNum / galToL).toFixed(5);
        break;
      case "lbs":
        result = +(initNum * lbsToKg).toFixed(5);
        break;
      case "kg":
        result = +(initNum / lbsToKg).toFixed(5);
        break;
      case "mi":
        result = +(initNum * miToKm).toFixed(5);
        break;
      case "km":
        result = +(initNum / miToKm).toFixed(5);
        break;
    }
    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result; 
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
}

module.exports = ConvertHandler;
