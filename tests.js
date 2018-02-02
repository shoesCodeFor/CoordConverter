// Test suite, import CoordConvertrer and test.



const CoordConverter = require('./CoordConvModule.js');
const CoordConverterTests = new CoordConverter();


// Log out all functions
console.log(CoordConverterTests.trimString('   Hhss    '));

console.log(CoordConverterTests.DatumCoordinateObj({name: 'Hese'}, 'Mese'));

// Test for single std format coord

// Test for single decimal format pair

// Test for standard coord pair to decimal format with spaces

// Test for standard coords pair to decimal format no spaces

// Test for decimal format coord pair to standard coords



/* Old Test Set
// Std Coords to Decimal
console.log(stdCoordsToDecimal(35, 54, 23, true));
//console.log(stdCoordsToDecimal(-35, 54, 23));

/* Datum from a string into conversion

datumFromString("35° 54' 22.9998\"");
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