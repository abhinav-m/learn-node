const request = require('request');

var geocodeAddress = (address, callback) => {
    const encodedAddress = encodeURIComponent(address);
    const apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    const url = apiUrl + encodedAddress;

    request({
        url: url,
        json: true
    }, (err, response, body) => {
        if (err) {
            callback('Unable to connect to google servers.');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find address.');
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
}


module.exports = {
    geocodeAddress
}