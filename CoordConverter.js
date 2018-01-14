
function CoordinateObj() {

}

function DatumCoordinateObj() {

}

function DatumObj(degrees, minutes, seconds, hemisphere) {
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
function stdCoordsToDecimal(dd, mm, ss, isNegative = false){
    let degrees = parseFloat(dd);
    let minutes = parseFloat(mm);
    let seconds = parseFloat(ss);
    let hemisphere = isNegative;

    let decimalFmt = dd + mm/60 +ss/3600;
    if(isNegative){
        decimalFmt = decimalFmt * -1;
        console.log(isNegative);
    }
    return decimalFmt.toFixed(12);
}

function decimalCoordsToStd(){

}

function datumFromString(datumToParse){
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
    degrees=degrees*2;
    mins=mins*2;
    secs=secs*2;
    console.log(degrees);
    console.log(mins);
    console.log(secs);
    /*console.log(stingArray[0]);
    console.log(stingArray[1]);
    console.log(stingArray[2]);
    console.log(stingArray[2][0]);
    */
}

console.log(stdCoordsToDecimal(35, 54, 23, true));
//console.log(stdCoordsToDecimal(-35, 54, 23));
datumFromString("35° 54' 22.9998\"");