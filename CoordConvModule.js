/**
 * CoordConvModule.js
 *
 * A Node JS Module
 *
 * What is this? This is a basic module for converting standard
 * coordinates into decimal formatted.
 *
 * General usage:  Passing in traditional style coodinates as a string
 * Example Input: 48°22'12.1"N 121°37'56.2"W
 * Should Output: 48.370028, -121.632278
 *
 * General usage:  Passing in floating point coodinates as an array
 * Example Input: 48.370028, -121.632278
 * Should Output: 48°22'12.1"N 121°37'56.2"W
 *
 * Working on safe exports...
 *
 * Include like any CommonJS module
 */



function CoordConversion(){

    /**
     * Usage = Pass a pair of coords into the function and get 2 decimal
     * formatted pair back
     *
     * @param latStr - Latitude string in traditional format
     * @param lngStr - Longitude string in traditional format
     * @returns {CoordinateObj} - should be as an array
     * @constructor
     */
    this.CoordinateConversion = (latStr, lngStr) => {
        this.latDatum = datumFromString(latStr);
        this.lngDatum = datumFromString(lngStr);
        return new CoordinateObj(stdCoordsToDecimal(this.latDatum), stdCoordsToDecimal(this.lngDatum));
    };

    /**
     * This is a coordinate in standard decimal format
     * @param lat - float value (N is Positive / S is Negative)
     * @param lng - float value (E is Positive / W is Negative)
     * @constructor
     */

    this.CoordinateObj = (lat, lng) => {
        this.latitude = lat;
        this.longitude = lng;

    };

    /**
     * This function can be used to convert decimal formatted lat/lng pairs to traditional format
     * @param latObj
     * @param longObj
     * @constructor
     */
    this.DatumCoordinateObj = (latObj, longObj) => {
        this.latitude = latObj;
        this.longitude = longObj;
        console.log(latObj.name);
        // Convert these into one string
       // return this.latitude + ' ' + this.longitude;
    };

    this.DatumObj = (degrees, minutes, seconds, hemisphere = true) => {
        this.degrees = degrees;
        this.minutes = minutes;
        this.seconds = seconds;
        this.hemisphere = hemisphere;
    };




    /**
     *  Unless the string is a "_ dbl-quote and a space then we'll need
     *  (dd + mm/60 +ss/3600) to Decimal degrees (dd.ff)
     *   dd = whole degrees, mm = minutes, ss = seconds
     *
     *   .60798357841 11 places is most accurate
     */
    this.stdCoordsToDecimal = (dd, mm, ss, _hemisphere = true) => {
        let degrees = parseFloat(dd);
        let minutes = parseFloat(mm);
        let seconds = parseFloat(ss);
        let hemisphere = _hemisphere;

        let decimalFmt = degrees + minutes/60 + seconds/3600;
        if(!hemisphere){
            decimalFmt = decimalFmt * -1;
            console.log("Negative Coordinate");
        }
        return decimalFmt.toFixed(12);
    };

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

    this.decimalCoordsToStd = (coord, LatOrLng) => {
        let Directionals = ['N', 'S', 'E', 'W'];
        let Dir = String();
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
        let CoordStr = String();
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

    };

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

    this.datumFromString = (datumToParse) => {
        // Trim left and right whitespaces
        datumToParse = datumToParse.trim();
        var numOfSpaces = 0;
        var numOfDatum = 0;
        var isPair = Boolean();
        numOfSpaces = datumToParse.match(/ /gi).length;
        numOfDatum = datumToParse.match(/"/gi).length;
        if(datumToParse.match(/" /gi).length){
            isPair = true;
        }
        else{
            isPair = false;
        }

        console.log("Number of spaces: " + numOfSpaces);
        console.log("Number of datum: " + numOfDatum);

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


        /*
        Debugging tests
        console.log(stingArray[0]);
        console.log(stingArray[1]);
        console.log(stingArray[2]);
        console.log(stingArray[2][0]);
        */
        return new DatumObj(degrees, mins, secs, hemisphere);
    };

    /**
     * Probably excessive but an extra function for trimming space of stings
     * @param str
     * @returns {string}
     */

    this.trimString = function (str) {
        return str.trim();
    };


    function coordPairSplitter(){
        // If a coordinate string is a pair then we send it here

        // If the coord has a directional and space then split there

        // If the coord has a double quote and space split it here


    }

}




module.exports = CoordConversion;



