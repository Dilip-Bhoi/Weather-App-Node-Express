const chalk = require('chalk')
const request = require('request') // need internet else give error


// latitude then longitude
const getWeather=(coordinates, callback)=>{

    const [latitude,longitude] = coordinates
    const url = `http://api.weatherstack.com/current?access_key=123f1d98557a5ba982cba5e9258bc83d&query=${latitude},${longitude}&units=m`;

 request({url: url, json: true},(error, response)=>{
    if (error) {
        //low level error -wrong base url- no network- server down
      callback("Unable to connect to weather services!",undefined);
    } else if (response.body.error) {
        //coordinates error, string syntax error
      callback("Unable to find location",undefined);
    } else {
      const { temperature, precip, weather_descriptions } = response.body.current;
      const { country, region } =response.body.location;
      console.log('Country ',response.body.location);
      callback(undefined,{
        temperature,
        precip,
        description: weather_descriptions[0],
        country,
        region
      });
    }
})
}

module.exports=getWeather
