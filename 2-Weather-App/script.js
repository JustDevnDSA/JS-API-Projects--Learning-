const inputBox = document.querySelector('.input-box')
const searchBtn = document.getElementById('searchBtn')
const weather_img = document.querySelector('.weather-img')
const temperature = document.querySelector('.temperature')
const description = document.querySelector('.description')
const humidity = document.getElementById('humidity')
const windSpeed = document.getElementById('wind-speed')
const locationNotFound = document.querySelector('.location-not-found')
const weatherBody = document.querySelector('.weather-body')


const checkWeather = async (city) => {
    const apiKey = "YOUR_API_KEY_HERE"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    const response = await fetch(url)
    const weather_data = await response.json()

    if(weather_data.cod === '404'){
        // console.log('error');
        locationNotFound.style.display = 'flex'
        weatherBody.style.display = 'none'
        return
    }

    locationNotFound.style.display = 'none'
    weatherBody.style.display = 'flex'
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)} °C`
    description.innerHTML=`${weather_data.weather[0].description}`
    humidity.innerHTML = `${weather_data.main.humidity} %`
    windSpeed.innerHTML = `${weather_data.wind.speed} Km/h`

    switch (weather_data.weather[0].main) {
        case 'Clouds':
            weather_img.src = 'images/cloud.png'
            break;
        case 'Clear':
            weather_img.src = 'images/clear.png'
            break;
        case 'Rain':
            weather_img.src = 'images/rain.png'
            break;
        case 'Mist':
            weather_img.src = 'images/mist.png'
            break;
        case 'Snow':
            weather_img.src = 'images/snow.png'
            break;
        default:
            break;
    }
}

searchBtn.addEventListener('click',()=>{
    checkWeather(inputBox.value);
})