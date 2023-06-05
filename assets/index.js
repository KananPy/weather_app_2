const timeEl = document.querySelector('#time')
const dateEl = document.querySelector('#date')
const currentWeatherItemsEl = document.querySelector('#current-weather-items')
const timeZone = document.querySelector('#time-zone')
const countryEl = document.querySelector('#country')
const weatherForecastEl = document.querySelector('#weather-forecast')
const currentTempEl = document.querySelector('#current-temp')
const inputEl = document.querySelector('#inputEl')
const addBtn = document.querySelector('#button-addon2')
const today = document.querySelector('.today')
const country = document.querySelector('.place-container')


const API_KEY = "ce8adb725959853af1d79d03da42a6aa"
const forecast_api = 'dfe36761054c2b01ce788451c96b96a8'
const time_api = '23c9b0c81d6d47c294bcc1ce19bc827e'

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

// window.onload =() =>{
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(success, err);
//     } else {
//         console.log("Can't reach your location");
//     }
// }


// async function success(position){
//     console.log(position);

//     let latitude = position.coords.latitude
//     let longitude = position.coords.longitude

//     let myLatitude = latitude.toFixed(4)
//     let myLongitude = longitude.toFixed(4)

//     console.log(myLatitude);
//     // console.log(longitude)

//     const localData = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${myLatitude}&lon=${myLongitude}&appid=${API_KEY}`)
//     console.log(localData);

// }

// function err(errMessage){
//     console.log(errMessage);
// }


async function getDefaultCity(city){

    try{
        const responseCity = await fetch(city)
    } catch(err){
        console.log('err', err);
    }

}

// function getTime(city){
//     let currentTime = new Date()
//     let timeZoneOffset = currentTime.getTimezoneOffset()
//     console.log(currentTime);
//     let offsetHours = timeZoneOffset / 60
//     let adjustedTime = new Date(currentTime.getTime() + offsetHours * 3600 * 1000)
//     console.log(`The time in ${city} is ${adjustedTime.getHours()}h ${adjustedTime.getMinutes()}min`)
// }


async function getElement(url){
    try {
        const response = await fetch(url)
        const data = await response.json()
        // console.log(data);



        showCityData(data)
    } catch(err){
        console.log('err', err);
    }
}


async function forecast(api_url){
    try {
        const response2 = await fetch(api_url)
        const data2 = await response2.json()

        // console.log(data2);
        fiveDays(data2)

    } catch(err){
        console.log('err', err);
    }

}

async function localTime(timeDate){
    try{
        const response3 = await fetch(timeDate)
        const data3 = await response3.json()


        // console.log('data3',response3);

        date_of_city(data3)
    } catch(err){
        console.log('err', err);
    }
}

let html_loop = ''

function fiveDays(data){
    for(var i=0; i < weekday.length; i++){

       html_loop += `
            <div class="weather-forecast-item">
                <div class="day">Wed</div>
                <img src="https://openweathermap.org/img/wn/${data.list[i+1].weather[0].icon}.png" alt="weather icon" class="w-icon">

                <div class="temp">${data.list[i+1].main.temp}&#176; C</div>
                <div class="temp">${data.list[i+1].wind.speed}</div>
            </div>`
    }
    weatherForecastEl.innerHTML = html_loop
    html_loop = ''
    console.log('5-days',data);



}


function showCityData(cityInfo){
    // const unixRise = cityInfo.sys.sunrise
    // console.log('sunrise',unixRise);
    // const date = new Date(unixRise*1000)
    // console.log('date', date);

    currentWeatherItemsEl.innerHTML = `
                    <div class="weather-item">
                        <div>Humidity</div>
                        <div>${cityInfo.main.humidity}%</div>
                    </div>
                    <div class="weather-item">
                        <div>Preasure</div>
                        <div>${cityInfo.main.pressure}</div>
                    </div>
                    <div class="weather-item">
                        <div>Wind speed</div>
                        <div>${cityInfo.wind.speed}</div>
                    </div>`

    today.innerHTML = `
                <img src="https://openweathermap.org/img/wn/${cityInfo.weather[0].icon}.png" alt="weather icon" class="w-icon">
                <div class="other">
                <div class="day">${cityInfo.weather[0].description}</div>
                <div class="temp">${cityInfo.main.temp}° C</div>
                </div>

            </div>`


}

function date_of_city(sheher){
    country.innerHTML = `
                <div class="time-zone" id="time-zone">${sheher.features[0].properties.city}</div>
                <div class="time-zone" id="time-zone">${sheher.features[0].properties.country}</div>`
    // console.log('date data', sheher.type);
    console.log(sheher);
    const today = new Date();

    const dayName = today.toLocaleString("en-US", {
        timeZone: `${sheher.features[0].properties.timezone.name}`,
        weekday: 'long'
    })
    console.log(dayName);

    dateEl.innerHTML = `<div id="date" class="date">
                        ${dayName}, 24 May
                        </div>`
}


addBtn.addEventListener('click', function(){
    const search = inputEl.value
    const apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=${API_KEY}&units=metric`
    const forecastWeather = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${forecast_api}&units=metric`
    const date_time = `https://api.geoapify.com/v1/geocode/search?text=${search}&lang=en&limit=2&type=city&apiKey=${time_api}`

    localTime(date_time)
    // getTime(search)
    forecast(forecastWeather)
    getElement(apiWeather)

})