const request = require('request');
const yargs = require('yargs');

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

const encodedAddress = encodeURIComponent(argv.a);
const apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const url = apiUrl + encodedAddress;

request({
    url: url,
    json: true
}, (err, response, body) => {
    if (err) {
        console.log('Unable to connect to google servers.');
    } else if (body.status === 'ZERO_RESULTS') {
        console.log('Unable to find address');
    } else if (body.status === 'OK') {
        console.log(`Address:${JSON.stringify(body.results[0].formatted_address)} \n Latitude and longitude: \n ${JSON.stringify(body.results[0].geometry.location)}`);
    }
});