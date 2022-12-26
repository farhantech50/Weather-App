const router = require("express").Router();
const fetch = require('node-fetch');
router.get("/",(req,res)=>{
    res.render("weather",{
        city: null,
        des: null,
        icon: null,
        temp: null
      });
})

router.post('/',async (req,res)=>{
    const city = req.body.city;

    const url_api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6e23a0b3be79b3c0cad361eb01507603`;
    

    try{
        await fetch(url_api).then((res)=>{
            return res.json();
        }).then((data)=>{
            if (data.message === 'city not found') {
                res.render('weather', {
                  city: data.message,
                  des: null,
                  icon: null,
                  temp: null,
                  found:null
                });
              } else {
                const city = data.name;
                const des = data.weather[0].description;
                const icon = data.weather[0].icon;
                const temp = data.main.temp;
                const found = 1;
      
                res.render('weather', {
                  city, des, icon, temp, found
                });
              }
        });
    }catch(err){
        res.render('weather', {
            city: 'error',
            des: null,
            icon: null,
            temp: null
          });
        
    }
})

module.exports= router;