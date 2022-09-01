console.log('Client side javascript file is loaded..')

// const address='Kolkata';
// fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//     address
//   )}.json?access_token=pk.eyJ1IjoiZGlsaXAtYmhvaSIsImEiOiJjbDdmeDNzdGswZXBlM3RscTRnNGJ5dnNrIn0.hg4hmcTzZXTDjIiRKONuew&limit=1`)
//   .then((res)=>{

//      res.json().then((response)=>{
//         //console.log(response)
//         const [data] = response.features;
//         // here 0-longitude 1 latitude
//         const latitude = data.center[1];
//         const longitude = data.center[0];
//         const { place_name } = data;
//         console.log(latitude, longitude,  place_name)
        


//      }).catch((error)=>{
//          console.log("Error Details 1", error);
//      })
// }).catch((error)=>{
//     console.log("Error Details 2", error);
// })
const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');

const temp=document.querySelector('#temp');
const rain=document.querySelector('#rain');
const desc=document.querySelector('#desc');
const place=document.querySelector('#place');

const errorMsg=document.querySelector('#error');



const fetchWeather=(address)=>{
    errorMsg.textContent='';
    temp.textContent='Loading.....'
    rain.textContent=''
    desc.textContent=''
    place.textContent=''
    
    fetch(`http://localhost:3000/weather?address=${address}`).then((res)=>{
        res.json().then((data)=>{
             if(data.error){
                  console.log(data.error);
                  errorMsg.textContent='Error :- '+data.error;
                  temp.textContent=''
             }else {
                const { temperature, precip, description, place_name } = data;
                console.log("Temp:- ",temperature)
                console.log("Precipitation:- ",precip)
                console.log("Description ",description)
                console.log("Place ",place_name)

                
                temp.textContent='Temperature :- '+temperature+' C';
                rain.textContent='Chances of rain :- '+precip+ ' %';
                desc.textContent='Description :- '+description;
                place.textContent='Place :- '+place_name;
             }
        })
    })
}

weatherForm.addEventListener('submit',(e)=>{
     e.preventDefault();
     const location = searchInput.value;
     fetchWeather(location);
})