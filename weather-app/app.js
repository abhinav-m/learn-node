const yargs = require('yargs');
const geocoder = require('./geocode/geocode.js');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true //Parse the address argument as a string.
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

console.log(argv)

geocoder.geocodeAddress(argv.address, (error, results) => {
    if (error) {
        console.log(error);
    } else {
        console.log(JSON.stringify(results, undefined, 2));
    }
});