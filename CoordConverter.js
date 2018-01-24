/**
 * CoordConverter.js
 *
 * General usage:  Pass in traditional style coodinates as a string
 * Example: 48°22'12.1"N 121°37'56.2"W
 * Should Output: 48.370028, -121.632278
 *
 */





/**
 *
 * @param latStr - Latitude string in traditional format
 * @param lngStr - Longitude string in traditional format
 * @returns {CoordinateObj} - should be as an array
 * @constructor
 */
function CoordinateConversion(latStr, lngStr){
    this.latDatum = datumFromString(latStr);
    this.lngDatum = datumFromString(lngStr);
    return new CoordinateObj(stdCoordsToDecimal(this.latDatum), stdCoordsToDecimal(this.lngDatum));
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

/**
 * This function can be used to convert decimal formatted lat/lng pairs to traditional format
 * @param latObj
 * @param longObj
 * @constructor
 */
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
 *  Unless the string is a "_ dbl-quote and a space then we'll need
 *  (dd + mm/60 +ss/3600) to Decimal degrees (dd.ff)
 *   dd = whole degrees, mm = minutes, ss = seconds
 *
 *   .60798357841 11 places is most accurate
 */
function stdCoordsToDecimal(dd, mm, ss, _hemisphere = true){
    let degrees = parseFloat(dd);
    let minutes = parseFloat(mm);
    let seconds = parseFloat(ss);
    let hemisphere = _hemisphere;

    let decimalFmt = dd + mm/60 +ss/3600;
    if(!hemisphere){
        decimalFmt = decimalFmt * -1;
        console.log("Negative Coordinate");
    }
    return decimalFmt.toFixed(12);
}

function decimalCoordsToStd(coordinatePair){
    let lat = coordinatePair[0];
    let lng = coordinatePair[1];
    
}

/**
 * Refactor this - one function to trim the string, one to count the space and one parse
 * North Latitude and East Longitude are positive
 * South Latitude and West Longitude are negative
 */

function datumFromString(datumToParse){
    // Trim left and right whitespaces
    datumToParse = datumToParse.trim();
    var numOfSpaces = 0;
    numOfSpaces = datumToParse.match(/ /gi).length;
    console.log("Number of spaces: " + numOfSpaces);

    switch (numOfSpaces) {
        case 0:
            break;
        case 1:
            break;
        case 2:
            break;
        case 4:
            break;
    }

    let hemisphere = true;
    if(datumToParse.includes('W') || datumToParse.includes('S')){
        // First we replace the last character witha space and trim it
        hemisphere = false;
        console.log('Negative Coordinate');
        console.log('Pre Slice: ' + datumToParse );
        datumToParse = datumToParse.slice(0, -1);
        console.log('Post Slice: ' + datumToParse );
    }

    // Assume this string has spaces between coords
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

function trimString(str) {
    return str.trim();
}


function coordPairSplitter(){
    // If a coordinate string is a pair then we send it here

    // If the coord has a directional and space then split there

    // If the coord has a double quote and space split it here


}







// Tests
// Std Coords to Decimal
console.log(stdCoordsToDecimal(35, 54, 23, true));
//console.log(stdCoordsToDecimal(-35, 54, 23));

// Datum from a string into conversion
datumFromString("35° 54' 22.9998\"");
var tester = datumFromString("35° 54' 22.9998\"W");
console.log(stdCoordsToDecimal(tester.degrees, tester.minutes, tester.seconds, tester.hemisphere));

// The whole shebang
var testStr = "35° 54' 22.9998\"W 35° 54' 22.9998\"";
var num_matches = testStr.match(/ /gi).length;
console.log("Number of spaces: " + num_matches);