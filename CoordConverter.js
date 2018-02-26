/**
 * CoordConverter.js
 *
 * What is this? This is a JS function list for converting standard
 * coordinates into decimal formatted.
 *
 * Definitions:
 * A coordinate pair is an array of floating point nums
 *  + Postive lats are Northern Hemisphere, Positive longs are Eastern Hemisphere
 *  - Negative lats are Southern, Negative longs are Western Hemisphere
 *
 * A datum is a coordinate with a degree, minute, second and hemisphere value
 *
 * General usage:  Passing in traditional style coodinates (datums) as a string
 * Example Input: 48°22'12.1"N 121°37'56.2"W
 * Should Output: 48.370028, -121.632278
 *
 * General usage:  Passing in floating point coodinates as an array
 * Example Input: 48.370028, -121.632278
 * Should Output: 48°22'12.1"N 121°37'56.2"W
 *
 * Working on safe exports... See CoordConverterModule.js for Node/AMD style imports
 */

// Constructor Function - List out the building block first.  Then we'll use them up
const directionals = ['N', 'S', 'E', 'W']; // +, -, +, -

/**
 *
 * @param degrees
 * @param minutes
 * @param seconds
 * @param hemisphere - null should be a 0 (N)
 * @constructor
 */
function DatumObj(degrees, minutes, seconds, hemisphere = null) {
    this.degrees = degrees;
    this.minutes = minutes;
    this.seconds = seconds;
    this.hemisphere = directionals[hemisphere];
}

/**
 * This is a coordinate pair in standard decimal format
 * @param lat - float value (N is Positive / S is Negative)
 * @param lng - float value (E is Positive / W is Negative)
 * @returns - {array} floating points
 */

function CoordinateObj(lat, lng) {
    this.latitude = parseFloat(lat);
    this.longitude = parseFloat(lng);
    return [this.latitude, this.longitude];
}


    /**
     * LETS CHECK THIS OUT - WE PROBABLY DON'T NEED IT WITH COORD S
     *
     * Usage = Pass a pair of coords into the function and get 2 decimal
     * formatted pair back
     *
     * @param latStr - Latitude string in traditional format
     * @param lngStr - Longitude string in traditional format
     * @returns {CoordinateObj} - should be as an array
     * @constructor
     */
    function CoordinateConversion(latStr, lngStr){
        try{

        }catch (e){
            throw e;
        }
        // We have a pair of coord
        if(latStr && lngStr){
            this.latDatum = datumFromString(latStr);
            this.lngDatum = datumFromString(lngStr);
            return new CoordinateObj(stdCoordsToDecimal(this.latDatum), stdCoordsToDecimal(this.lngDatum));
        }
        // We have one lat coord
        else if(latStr){
            this.latDatum = datumFromString(latStr);
            return new CoordinateObj(stdCoordsToDecimal(this.latDatum));
        }
        // We have on lng coord
        else if(lngStr){
            this.lngDatum = datumFromString(lngStr);
            return new CoordinateObj(stdCoordsToDecimal(this.lngDatum));
        }
        else{
            throw error('No Coordinates have been entered');
        }


    }


/**
 * This function can be used to convert decimal formatted lat/lng to traditional format
 * @param latObj
 * @param longObj
 * @constructor
 * @return {string}
 */
function DatumToStr(datumObj = null) {
    let coordStr = '';
    this.datumObj = datumObj;

    // Convert these into one string
    if(this.datumObj){
        coordStr += this.datumObj.degrees + '°';
        coordStr += this.datumObj.minutes + '\"';
        coordStr += this.datumObj.seconds + '\'';
        coordStr += this.datumObj.hemisphere;
    }
    console.log('DatumToStr function fired: ' + coordStr);
    return coordStr;
}

/**
 * This function combines object attributes into  a str
 * @param latObj
 * @param lngObg
 * @returns {string}
 * @constructor
 */
function DatumPairStr(latObj = null, lngObj = null) {
    let datumPair = DatumToStr(latObj);
    if(lngObj && latObj){
        datumPair += ' ';
    }
    datumPair += DatumToStr(lngObj);
    console.log('DatumPairStr function fired: ' + datumPair);
    return datumPair;
}


    /**
     *  Unless the string is a "_ dbl-quote and a space then we'll need
     *  (dd + mm/60 +ss/3600) to Decimal degrees (dd.ff)
     *   dd = whole degrees, mm = minutes, ss = seconds
     *
     *   .60798357841 11 places is most accurate
     */

    /**
     *
     * @param dd
     * @param mm
     * @param ss
     * @param _hemisphere
     * @returns {string}
     */
    function stdCoordsToDecimal(dd, mm, ss, _hemisphere = true){
        let degrees = parseFloat(dd);
        let minutes = parseFloat(mm);
        let seconds = parseFloat(ss);
        let hemisphere = _hemisphere;

        let decimalFmt = degrees + minutes/60 + seconds/3600;
        if(!hemisphere){
            decimalFmt = decimalFmt * -1;
            console.log("Negative Coordinate");
        }
        // 8 decimals should suffice
        return decimalFmt.toFixed(12);
    }

    /**
     *
     * @param coordinatePair
     *
     * D = Formula round down and remove decimal value for degrees
     * M = truncate((|Ddec| * 60) % 60)
     * S = (|Ddec| * 3600) % 60
     *
     * Lat is 0 Lng is 1
     */

    function decimalCoordsToStd(coord, LatOrLng){
        let Directionals = ['N', 'S', 'E', 'W'];
        let Dir = new String();
        if(!LatOrLng){
            if(coord > 0){
                Dir = Directionals[0];
            }
            else{
                Dir = Directionals[1];
            }
        }
        else{
            if(coord > 0 ){
                Dir = Directionals[2];
            }
            else {
                Dir = Directionals[3];
            }
        }
        let CoordStr = new String();
        try{
            if(isNaN(coord)){
                throw 'We need a number';
            }
            // Lets round off the decimal
            let degrees = Math.floor(coord);
            // Take the decimal out and place it in another temp var
            let decimal = coord - degrees;
            let minutes = Math.floor((decimal * 60 ) % 60);
            let seconds = (decimal * 3600) % 60;
            seconds = seconds.toFixed(3);
            // console.log(degrees + '°' + minutes + '\'' + seconds + "\"");
            CoordStr = degrees + '°' + minutes + '\'' + seconds + '\"' + Dir;
        }
        catch (error){
            console.log(error);
        }
        finally {
            return CoordStr;
        }

    }

    /**
     * NOTE: This function does too much.  Need to refactor this.
     *
     * Should do the following:
     *
     * 1) Check, is this a pair?
     *  a) If yes, then recursively call this function.
     * 2) If no, then does it have spaces in between dd/mm/ss
     *  b) If yes then lets replace the deg/min/seconds markers with spaces
     * 3) If no spaces, then lets replace markers with spaces and parse
     *
     * We will only parse one string at a time
     * If the datum to parse is longer than one datum, recursively call this for each one
     *
     *
     * Refactor this - one function to trim the string, one to count the space and one parse
     * North Latitude and East Longitude are positive
     * South Latitude and West Longitude are negative
     */

    function datumFromString(datumToParse){
        // Trim left and right whitespaces
        datumToParse = datumToParse.trim();


        let hemisphere = true;
        if(datumToParse.includes('W') || datumToParse.includes('S')){
            // First we replace the last character with a space and trim it
            hemisphere = false;
            console.log('Negative Coordinate');
            console.log('Pre Slice: ' + datumToParse );
            datumToParse = datumToParse.slice(0, -1);
            console.log('Post Slice: ' + datumToParse );
        }

        // Assume this string has spaces between coords
        let stingArray = datumToParse.split(" ");
        let degrees =  parseFloat(stingArray[0].replace(/d|e|g|r|s|°/gi, " "));
        let mins = parseFloat(stingArray[1].replace(/m|i|n|u|t|e|s|'/gi, " "));
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


        /*
        Debugging tests
        console.log(stingArray[0]);
        console.log(stingArray[1]);
        console.log(stingArray[2]);
        console.log(stingArray[2][0]);
        */
        return new DatumObj(degrees, mins, secs, hemisphere);
    }

/**
 *
 * @param coordStr
 * @returns {[null,null]}
 */
function coordParse(coordStr){
    // A var to hold the strings (even if there is one)
    let coordStrPair = [];
    // Trim white space off the front and back
    let datumToParse = coordStr.trim();
    // Number of spaces to determine logic
    let numOfSpaces = 0;
    // Probably not needed
    let numOfDatum = 0;
    // Pairs will call the split
    let isPair = new Boolean();

    let firstCoord;
    let secondCoord;

    numOfSpaces = datumToParse.match(/ /gi).length;
    numOfDatum = datumToParse.match(/"/gi).length;

    if(numOfDatum > 0 && numOfDatum < 3){
        isPair = true;
        // Has a pair with lots of spacing
        if(datumToParse.includes(" N ") || datumToParse.includes(" S ")){
            // Let trim it out and make degrees positive
            if(datumToParse.includes(" N ")){
                coordStrPair = datumToParse.split("N ");
                coordStrPair[0] = coordStrPair[0]+"N";

            }
            // The coord is negative
            else{
                coordStrPair = datumToParse.split("S ");
                coordStrPair[0] = coordStrPair[0]+"S";
            }
            console.log(coordStrPair);
        }

        else if(datumToParse.includes(" n ") || datumToParse.includes(" s ")){
            // Let trim it out and make degrees positive
            if(datumToParse.includes(" n ")){
                coordStrPair = datumToParse.split("n ");
                coordStrPair[0] = coordStrPair[0]+"N";
                coordStrPair[0].replace(/\s/g,'');
            }
            // The coord is negative
            else{
                coordStrPair = datumToParse.split("s ");
                coordStrPair[0] = coordStrPair[0]+"S";
            }
            console.log(coordStrPair);
        }
        else if(datumToParse.includes("N ") || datumToParse.includes("S ")){
            // Let trim it out and make degrees positive
            if(datumToParse.includes("N ")){
                coordStrPair = datumToParse.split("N ");
                coordStrPair[0] = coordStrPair[0]+" N";
            }
            // The coord is negative
            else{
                coordStrPair = datumToParse.split("S ");
                coordStrPair[0] = coordStrPair[0]+" S";
            }
            console.log(coordStrPair);
        }
        else if(datumToParse.includes("n ") || datumToParse.includes("s ")){
            // Let trim it out and make degrees positive
            if(datumToParse.includes("n ")){
                coordStrPair = datumToParse.split("n ");
                coordStrPair[0] = coordStrPair[0]+" N";
            }
            // The coord is negative
            else{
                coordStrPair = datumToParse.split("s ");
                coordStrPair[0] = coordStrPair[0]+" S";
                console.log(coordStrPair);
            }

        }
        else{
            //
        }
        coordStrPair[0] = coordStrPair[0].replace(/\s/g,'');
        coordStrPair[1] = coordStrPair[1].replace(/\s/g,'');
        console.log('After space cleaning');
        console.log(coordStrPair);
    }
    else if(numOfDatum > 2){
        // Bad Coordinate String - throw it out
    }
    else{
        isPair = false;
    }

    console.log("Number of spaces: " + numOfSpaces);
    console.log("Number of datum: " + numOfDatum);



    // Time to pass/fails test the string pair based on the space count
    // One " means one coord, two mains a pair.  3 means GTFO

    // The switch will format the string how we want it
    switch (numOfSpaces) {
        case 0:
            // Single coordinate no spaces
            break;
        case 1:
            // Pair of coords with one space between

            break;
        case 2:
            // Single coordinate with spaces
            break;
        case 4:
            // Shouldn't happen, but

            break;
        case 5:
            // Pair of coords with space
            // Assume this string has spaces between coords
            let stingArray = datumToParse.split("\" ");
            break;
            firstCoord = stringArray[0];
            secondCoord = stringArray[1];
            // break;
        default:
            //shouldn't get to this point
            break;
    }

    /* If a coordinate string is a pair then we send it here
    if(isPair === true){
        // If the coord has a directional and space then split there



        // If the coord has a double quote and space split it here

        let lat = datumFromString(firstCoord);
        let lng = datumFromString(secondCoord);
        return [lat, lng];
    }
    // It's a single coordinate
    else{
        return datumFromString(firstCoord);
    }
    */
}
// Messy Guts - Unused or unrealized pieces


// This empty constructor object is not in use
/*
    function DatumObj() {
        let degrees;
        let minutes;
        let seconds;
        let hemisphere;
    }
    */


/* Tests
// Std Coords to Decimal
console.log(stdCoordsToDecimal(35, 54, 23, true));
//console.log(stdCoordsToDecimal(-35, 54, 23));

/* Datum from a string into conversion
*/
// datumFromString("35° 54' 22.9998\"");
/*
var tester = datumFromString("35° 54' 22.9998\"W");
console.log(stdCoordsToDecimal(tester.degrees, tester.minutes, tester.seconds, tester.hemisphere));

*/

/* The whole shebang
var testStr = "35° 54' 22.9998\"W 35° 54' 22.9998\"";
var num_matches = testStr.match(/ /gi).length;
console.log("Number of spaces: " + num_matches);

*/


// var TestCoord = decimalCoordsToStd(34.7663, false);
// console.log(TestCoord);

// Error test
// decimalCoordsToStd("93kkd");


// coordParse Test Set
// Test Set 1
coordParse("35° 54' 22.9998\" N 35° 54' 22.9998\" W");
coordParse("35° 54' 22.9998\" S 35° 54' 22.9998\" W");
coordParse("35° 54' 22.9998\" n 35° 54' 22.9998\" W");
coordParse("35° 54' 22.9998\" s 35° 54' 22.9998\" W");
coordParse("35° 54' 22.9998\"N 35° 54' 22.9998\" W");
coordParse("35° 54' 22.9998\"S 35° 54' 22.9998\" W");
coordParse("35° 54' 22.9998\"n 35° 54' 22.9998\" W");
coordParse("35° 54' 22.9998\"s 35° 54' 22.9998\" W");

console.log('No spaces test set');
coordParse("35°54'22.9998\"N 35°54'22.9998\"W");
coordParse("35°54'22.9998\"S 35°54'22.9998\"W");
coordParse("35°54'22.9998\"n 35°54'22.9998\"W");
coordParse("35°54'22.9998\"s 35°54'22.9998\"W");

let TestDatum =  new DatumObj(45,34,15.12,'W');
let TestDatumToo =  new DatumObj(49,30,1.192,'N');
console.log(TestDatum);
DatumToStr(TestDatum);
DatumToStr(null);

DatumPairStr(TestDatumToo, TestDatum);