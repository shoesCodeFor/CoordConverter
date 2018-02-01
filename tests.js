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


