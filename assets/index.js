const timeEl = document.querySelector('#time')
const dateEl = document.querySelector('#date')
const currentWeatherItemsEl = document.querySelector('#current-weather-items')
const timeZone = document.querySelector('#time-zone')
const countryEl = document.querySelector('#country')
const weatherForecastEl = document.querySelector('#weather-forecast')
const currentTempEl = document.querySelector('#current-temp')
const inputEl = document.querySelector('#inputEl')
const addBtn = document.querySelector('#button-addon2')


const API_KEY = "ce8adb725959853af1d79d03da42a6aa"

async function getDefaultCity(city){

    try{
        const responseCity = await fetch(city)
    } catch(err){
        console.log('err', err);
    }
    
}




async function getElement(url){
    try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data);
        showCityData(data)
    } catch(err){
        console.log('err', err);
    }
}

function showCityData(cityInfo){
    currentWeatherItemsEl.innerHTML = `
                    <div class="weather-item">
                        <div>Humidity</div>
                        <div>95%</div>
                    </div>
                    <div class="weather-item">
                        <div>Preasure</div>
                        <div>121</div>
                    </div>
                    <div class="weather-item">
                        <div>Wind speed</div>
                        <div>${cityInfo.wind.speed}</div>
                    </div>`
}


addBtn.addEventListener('click', function(){
    const search = inputEl.value
    const apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=${API_KEY}`

    getElement(apiWeather)
    search.innerHTML = '' 
})