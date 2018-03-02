const yargs = require("yargs");
const geocoder = require("./geocode/geocode.js");
const weather = require("./weather/weather");

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Address to fetch weather for",
      string: true //Parse the address argument as a string.
    }
  })
  .help()
  .alias("help", "h").argv;

geocoder.geocodeAddress(argv.address, (error, results) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Your address: ${results.address}`);

    const { latitude, longitude } = results;

    weather.getWeather(latitude, longitude, (error, weatherResults) => {
      if (error) {
        console.log(error);
      } else {
        console.log(
          `It is ${weatherResults.temperature},but it feels like ${
            weatherResults.apparentTemperature
          }`
        );
      }
    });
  }
});
