const axios = require("axios");
const yargs = require("yargs");

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

const encodedAddress = encodeURIComponent(argv.address);
const apiUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=";
const url = apiUrl + encodedAddress;

axios
  .get(url)
  .then(response => {
    if (response.data.status === "ZERO_RESULTS") {
      throw new Error("Unable to find that address.");
    }
    const address = response.data.results[0].formatted_address,
      latitude = response.data.results[0].geometry.location.lat,
      longitude = response.data.results[0].geometry.location.lng;

    //Weather url
    const apiKey = "b185ccffd3fe5dc262bda8424f07ee7e";
    const weatherUrl = `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`;

    console.log(`Your address: ${address}`);

    return axios.get(weatherUrl);
  })
  .then(response => {
    const temperature = response.data.currently.temperature;
    const apparentTemperature = response.data.currently.apparentTemperature;
    console.log(
      `It is ${temperature},but it feels like ${apparentTemperature}`
    );
  })
  .catch(e => {
    if (e.code === "ENOTFOUND")
      console.log("Unable to connect to API servers.");
    else {
      console.log(e.message);
    }
  });
