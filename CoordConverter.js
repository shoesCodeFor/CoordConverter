function CoordinateConversion(){
    
}

/**
 * This is a coordinate in standard decimal format
 * @param lat - float value (positive is Northern Hemisphere, negative is Southern)
 * @param lng - float value (positive is Eastern Hemisphere, negative is Western)
 * @constructor
 */

function CoordinateObj(lat, lng) {
    this.latitude = lat;
    this.longitude = lng;
}

function DatumCoordinateObj(latObj, longObj) {
    this.latitude = latObj,
    this.longitude = longObj

}

function DatumObj(degrees, minutes, seconds, hemisphere = true) {
    this.degrees = degrees;
    this.minutes = minutes;
    this.seconds = seconds;
    this.hemisphere = hemisphere;
}


/**
 *  (dd + mm/60 +ss/3600) to Decimal degrees (dd.ff)
 *   dd = whole degrees, mm = minutes, ss = seconds
 *
 *   .60798357841 11 places is most accurate
 */
function stdCoordsToDecimal(dd, mm, ss, _hemishere = true){
    let degrees = parseFloat(dd);
    let minutes = parseFloat(mm);
    let seconds = parseFloat(ss);
    let hemisphere = _hemishere;

    let decimalFmt = dd + mm/60 +ss/3600;
    if(!hemisphere){
        decimalFmt = decimalFmt * -1;
        console.log("Negative Coordinate");
    }
    return decimalFmt.toFixed(12);
}

function decimalCoordsToStd(){

}

/**
 * North Latitude and East Longitude are positive
 * South Latitude and West Longitude are negative
 */

function datumFromString(datumToParse){
    let hemisphere = true;
    if(datumToParse.includes('W') || datumToParse.includes('S')){
        // First we replace the last character witha space and trim it
        hemisphere = false;
        console.log('Negative Coordinate');
        console.log('Pre Slice: ' + datumToParse );
        datumToParse = datumToParse.slice(0, -1);
        console.log('Post Slice: ' + datumToParse );
    }
    let stingArray = datumToParse.split(" ");
    let degrees =  parseFloat(stingArray[0].replace(/d|e|g|r|s|°/gi, " "));
    let mins = parseFloat(stingArray[1].replace(/m|i|n|u|t|e|s|"/gi, " "));
    let secs = parseFloat(stingArray[2].replace(/s|e|c|o|n|d|"/gi, " "));
    /*
    for(let i=0; i < degrees.length; i++){
        let checkChar = degrees[i];
        // Lets clean up the chars
        if(checkChar == "d"|| checkChar == "e"|| checkChar == "g"||
            checkChar == "r"|| checkChar == "s" || checkChar == "°"){
            console.log(degrees[i]);
            degrees.replace(checkChar, " ");
        }
    }
    */

    console.log(degrees);
    console.log(mins);
    console.log(secs);
    /*console.log(stingArray[0]);
    console.log(stingArray[1]);
    console.log(stingArray[2]);
    console.log(stingArray[2][0]);
    */
    return new DatumObj(degrees, mins, secs, hemisphere);
}



// Tests
console.log(stdCoordsToDecimal(35, 54, 23, true));
//console.log(stdCoordsToDecimal(-35, 54, 23));
datumFromString("35° 54' 22.9998\"");
var tester = datumFromString("35° 54' 22.9998\"W");
console.log(stdCoordsToDecimal(tester.degrees, tester.minutes, tester.seconds, tester.hemisphere));