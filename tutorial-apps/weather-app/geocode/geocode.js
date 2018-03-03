const request = require("request");

var geocodeAddress = address => {
  const encodedAddress = encodeURIComponent(address);
  const apiUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=";
  const url = apiUrl + encodedAddress;

  //Request api provided by node doesn't return a promise object, thus we wrap it in one here.
  return new Promise((resolve, reject) => {
    request(
      {
        url: url,
        json: true
      },
      (err, response, body) => {
        if (err) {
          reject("Unable to connect to google servers.");
        } else if (body.status === "ZERO_RESULTS") {
          reject("Unable to find address.");
        } else if (body.status === "OK") {
          resolve({
            address: body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longitude: body.results[0].geometry.location.lng
          });
        }
      }
    );
  });
};

module.exports = {
  geocodeAddress
};
