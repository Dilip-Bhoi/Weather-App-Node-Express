const path = require('path'); // core module
const express = require('express'); // npm module
const hbs = require('hbs')
const cors = require('cors')

const geoCode =require('./utils/geoCode');
const getWeather = require('./utils/weather')


const app = express()
const publicDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials')

// const corsOpts = {
//     origin: '*',
  
//     methods: [
//       'GET',
//       'POST',
//     ],
  
//     allowedHeaders: [
//       'Content-Type',
//     ],
//   };

//app.use()

// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });
// SetUp handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);    // setting customised path for view
                               // default path for view is src/views
hbs.registerPartials(partialsPath)

// SetUp static directory to serve                              
app.use(express.static(publicDirPath))


app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: "Dilip Bhoi",
        message: 'This is an awesome app to get live weather report'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Dilip bhoi',
        message: 'This app is created by Dilip Bhoi'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title: 'Help',
        message: 'Contact:  9629280081 / dilipBhoi@gmail.com'
    })
})

app.get('/weather',(req, res)=>{
    console.log(req.query); //{} is there is no query

    if(!req.query.address){
        return res.send({               
            error: 'You must provide a search term.'
        })
    }
    
    const { address } = req.query;
    geoCode(address, (error, data) => {
        if (error) {
            return res.send({               
                error: error
            })
        }else {
          const { latitude, longitude, place_name } = data;
          const coordinates = [latitude, longitude];
      
          getWeather(coordinates, (error, data) => {
            if (error) {
                return res.send({               
                    error: error
                })
            } else {
              const { temperature, precip, description } = data;
              return res.send({               
                temperature,
                precip,
                description,
                place_name
            })
            }
          });
        }
      });
    // every api must have only one res.send, so use return to avoid error
    // return end the execution process to procceed further
    // res.send({
    //     forecast: 'Its raining',
    //     location: req.query.address
    // })
     
})

app.get('*',(req,res)=>{
     res.render('notFound',{
         message: 'Page Not Found',
         status: 404
     })
})
//  app.get('/about',(req, res)=>{
//     res.redirect('/about.html')
//  })

app.listen(3000, ()=>{
    console.log('Server Running on 3000')
})







/**
 -----------------------------Learnings-----------------------------

 // nodemon app.js -e js,hbs    command nodemon to refresh on js, hbs extensions


// path.join(__dirname, '../)  one folder up
// path.join(__dirname, '../..)  two folder up

app.get('/weather',(req, res)=>{
    res.send({msg: 'weather report'})
    // if we send object it automatically stringify the response
 })



  install heroku cli
  from terminal
  heroku -v
  heroku login
  click any button, takes to new tab
  login 
  logged in as email
 */

