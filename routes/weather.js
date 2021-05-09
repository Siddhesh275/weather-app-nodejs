const router = require('express').Router();
const fetch = require('node-fetch');
require('dotenv').config()

router.get('/', (req, res) => {
  res.render('index', {
    city: null,
    des: null,
    icon: null,
    temp: null,
    temp_min: null,
    temp_max: null
  });
});

router.post('/', async (req, res) => {
  const city = req.body.city;
  const url_api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`;

  try {
    await fetch(url_api)
      .then(res => res.json())
      .then(data => {
        if (data.message === 'city not found') {
          res.render('index', {
            city: "Please enter a valid city name!!!",
            des: null,
            icon: null,
            temp: null,
            temp_min: null,
            temp_max: null
          })
        } else {
          const city = data.name;
          const des = data.weather[0].main;
          const icon = data.weather[0].icon;
          const temp = data.main.temp;
          const temp_min = Math.floor(data.main.temp_min);   
          const temp_max = Math.floor(data.main.temp_max);

          res.render('index', {
            city, des, icon, temp , temp_min , temp_max
          });
        }
      });

  } catch (err) {
    res.render('index', {
      city: 'Something went Wrong!!!',
      des: null,
      icon: null,
      temp: null,
      temp_min: null,
      temp_max: null
    })
  }

})


module.exports = router;