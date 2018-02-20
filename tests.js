// Test suite, import CoordConvertrer and test.



const CoordConverter = require('./CoordConverterModule.js');
const CoordModTests = new CoordConverter();


// Log out all functions
var testObject = CoordModTests.datumFromString("35° 54' 22.9998\"W");
console.log(testObject);
var aTestPair = CoordModTests.CoordinateConversion();


console.log(CoordModTests.trimString('   Hhss    '));

console.log(CoordModTests.DatumCoordinateObj({name: 'Hese'}, 'Mese'));

// Test for single std format coord

// Test for single decimal format pair

// Test for standard coord pair to decimal format with spaces

// Test for standard coords pair to decimal format no spaces

// Test for decimal format coord pair to standard coords



/* Old Test Set
// Std Coords to Decimal
console.log(stdCoordsToDecimal(35, 54, 23, true));
//console.log(stdCoordsToDecimal(-35, 54, 23));
*/
// Datum from a string into conversion

// CoordConverterTests.datumFromString("35° 54' 22.9998\"");
// var tester = CoordConverterTests.datumFromString("35° 54' 22.9998\"W");
// console.log(CoordConverterTests.stdCoordsToDecimal(tester.degrees, tester.minutes, tester.seconds, tester.hemisphere));



/* The whole shebang
var testStr = "35° 54' 22.9998\"W 35° 54' 22.9998\"";
var num_matches = testStr.match(/ /gi).length;
console.log("Number of spaces: " + num_matches);

*/


// var TestCoord = decimalCoordsToStd(34.7663, false);
// console.log(TestCoord);

// Error test
// decimalCoordsToStd("93kkd");