//make var for dom elements 
var formInput = document.getElementById("search-city");
var searchBtn = document.getElementById("search-btn");
var currentWeather = document.getElementById("current");
var futureWeather = document.getElementById("future");

var searchCity;
// make var for API url and the key

var apiKey = "7fb00d9fb87ab3fe9c4910a04586ffcf"


//make function to get the geocoding information of the city entered in the input

function getCity(event){
    event.preventDefault();
    console.log(formInput.value)
    //capture var that user enters into search input
    searchCity = formInput.value.trim()
    console.log(searchCity)
    var geocodingUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" +  searchCity + "&appid=" + apiKey
    fetch(geocodingUrl)
     .then(response => response.json())
     .then(data => getForecast(data));
}


// make function to get the forcast
function getForecast(cityInfo){
    
    //get lat and long from object
    var lat = cityInfo[0].lat
    var lon = cityInfo[0].lon
    var oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
    console.log(lat, lon)
    fetch(oneCallUrl)
    .then(response => response.json())
    .then(data => renderForecast(data));
}

//write a function to render the forcast in the UI
function renderForecast(obj){
    console.log(obj)
    //create var for the info we need for the forecast
    //convert unix timestamp to date https://coderrocketfuel.com/article/convert-a-unix-timestamp-to-a-date-in-vanilla-javascript
    var unixTimestamp = obj.current.dt
    const milliseconds = unixTimestamp * 1000 
    const dateObject = new Date(milliseconds)
    let date = dateObject.toLocaleString("en-US", {timeZoneName: "short"})
    date = date.split(",")
    let temp = Math.round((obj.current.temp -273.15) * 1.8 + 32)
    //(0K − 273.15) × 9/5 + 32 = -459.7°F

    let humidity = obj.current.humidity
    let wind = obj.current.wind_speed
    let uvi = obj.current.uvi
    var icon = obj.current.weather[0].icon
    console.log(humidity, wind, uvi, icon)
    //create a tempplate to inject the var into
    var template = `
        <h2>${searchCity}-${date[0]}- <img src="http://openweathermap.org/img/wn/${icon}@2x.png"></h2>
    `
    //inject template into current weather div with innerhtml
    currentWeather.innerHTML = template
}


   

//attach an event listner to search button
searchBtn.addEventListener("click", getCity)