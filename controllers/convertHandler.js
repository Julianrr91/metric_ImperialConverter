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
          result = "Invalid Number";
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
        result = "Kg";
        break;
      case "mi":
        result = "mi";
        break;
      case "km":
        result = "Km";
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
        result = "Kg";
        break;
      case "kg":
        result = "lbs";
        break;
      case "mi":
        result = "Km";
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

  this.spellOutUnit = function (unit) {
    let result;
    switch (unit.toLowerCase()) {
      case "gal":
        result = "Gallons";
        break;
      case "l":
        result = "Liters";
        break;
      case "lbs":
        result = "Pounds";
        break;
      case "kg":
        result = "Kilograms";
        break;
      case "mi":
        result = "Miles";
        break;
      case "km":
        result = "Kilometers";
        break;
      default:
        result = "Error en la unidad";
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
      default:
        result = undefined;
        break;
    }
    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    let initUnitSpelledOut = this.spellOutUnit(initUnit.toLowerCase());
    let returntUnitSpelledOut = this.spellOutUnit(returnUnit.toLowerCase());
    result = `${initNum} ${initUnitSpelledOut} converts to ${returnNum} ${returntUnitSpelledOut}`;
    return result;
  };
}

module.exports = ConvertHandler;
