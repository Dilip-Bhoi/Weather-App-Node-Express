const chalk = require('chalk')
const request = require('request') // need internet else give error

const geoCode = (address, callback) => {
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=pk.eyJ1IjoiZGlsaXAtYmhvaSIsImEiOiJjbDdmeDNzdGswZXBlM3RscTRnNGJ5dnNrIn0.hg4hmcTzZXTDjIiRKONuew&limit=1`;
  
    request({ url: geoUrl, json: true }, (error, response) => {
      if (error) {
          callback('Unable to connect to location services!', undefined)
      } else if (response.body.features.length === 0) {
          callback("No Places Found!", undefined)
      } else {
        const [data] = response.body.features;
        // here 0-longitude 1 latitude
        const latitude = data.center[1];
        const longitude = data.center[0];
        const { place_name } = data;
        callback(undefined,{
            latitude,
            longitude,
            place_name
          })
      }
    });
  };

module.exports=geoCode