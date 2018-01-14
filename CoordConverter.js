
var coordinateObj = {
    
};


/**
 *  (dd + mm/60 +ss/3600) to Decimal degrees (dd.ff)
 *   dd = whole degrees, mm = minutes, ss = seconds
 *
 *   .60798357841 11 places is most accurate
 */
function stdCoordsToDecimal(dd, mm, ss, isNegative = false){
    let degrees = parseFloat(dd);
    let minutes = parseFloat(mm);
    let seconds = parseFloat(ss);
    let hemisphere = isNegative;

    let decimalFmt = dd + mm/60 +ss/3600;
    if(isNegative){
        console.log(isNegative);
    }
    return decimalFmt.toFixed(12);
}

function decimalCoordsToStd(){

}

function datumFromString(datumToParse){

}

console.log(stdCoordsToDecimal(35, 54, 23, true));
//console.log(stdCoordsToDecimal(-35, 54, 23));