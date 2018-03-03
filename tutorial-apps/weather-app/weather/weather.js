const request = require("request");

const getWeather = (latitude, longitude, callback) => {
  const apiKey = "b185ccffd3fe5dc262bda8424f07ee7e";
  const url = `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`;

  request(
    {
      url: url,
      json: true
    },
    (err, response, body) => {
      if (!err && response.statusCode === 200) {
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      } else {
        callback("Unable to fetch weather.");
      }
    }
  );
};

module.exports = {
  getWeather
};
