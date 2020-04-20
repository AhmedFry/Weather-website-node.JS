const request = require('request')

//const url = 'http://api.weatherstack.com/current?access_key=5af3237aaf860d197cf56cdc3cbbe064&query=37.8267,-122.4233&units=f'


const forecast =(latitude,longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=5af3237aaf860d197cf56cdc3cbbe064&query='+latitude + ',' + longitude +'&units=m'
    request({url , json :true}, (error,{body})=>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        }
        else if (body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature +
             ' degress out. ' + 'It feel like '+ body.current.feelslike  +' degree out. '+ 'the humidity is ' + body.current.humidity + '%' )
        }

    })

}
module.exports = forecast