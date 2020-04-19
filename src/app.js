const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

publicDir = path.join(__dirname,'../public')
viewsPath=path.join(__dirname,'../tmp/views')
partialsPath = path.join(__dirname , '../tmp/partials')

//config
app.set('views',viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))

app.get('',(req,res)=>{
    res.render('index' , {
        title: "Weather App",
        name : "Ahmed Farid"
    })
})
app.get('/weather', (req, res) => {
    console.log(req.query)
    if (!req.query.address){
        return res.send({
            error : 'you should write your address'
        })
    }
    const address = req.query.address

    geocode(address,(error , {latitude , longitude ,location}={})=>{
        if (error){
            return res.send({error})
            }
            
        forecast(latitude,longitude,(error,forecastData)=>{
            if (error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address
                
                })

        })
    })
    
    })


app.get('/about' , (req,res)=>{
    res.render('about',{
        title : 'About me' ,
        name : 'Ahmed Farid'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name : 'Ahmed Farid'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Help',
        name : 'Ahmed Farid',
        errorMessage:'Help artical not found'
    })
})



app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Ahmed Farid',
        errorMessage:'The page is not found'
    })
})


app.listen(3000 , ()=>{
    console.log ("I'm listening from port 3000 ")
})