var searchBar = document.querySelector(`#hello`);
var search = document.querySelector(`#search`);
var city = document.querySelector(`#cityName`)
var placeholder = document.getElementById('search').getAttribute("placeholder")

// default page search placeholder value
function pageDefault() {
    searchCity(search.value = placeholder) // new york by default
    emptySearchBar();
}
pageDefault();
// clear search bar
function emptySearchBar() {
    search.value = ""
}

// listen to the click
searchBar.addEventListener(`click`, event => {
    event.preventDefault() // stop page refresh on submission
    $(fiveDays).empty(); // clear 5 day forcast cards
    searchCity()
})

// look up weather forcast
function searchCity() {
    // api fetch request
    // fetch 5 day forcast
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${search.value}&units=imperial&appid=17e7b5f7c74f7d4820c1bdc0c6edb7c1`).then(function (promise) {
        return promise.json();
    }).then(function (weather) {
        // weather - json with weather data
        city.innerHTML = weather.city.name // overwrite the name of the searched city

        // fetch the current weather data
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${weather.city.coord.lat}&lon=${weather.city.coord.lon}&units=imperial&appid=17e7b5f7c74f7d4820c1bdc0c6edb7c1`).then(function (promise) {
            return promise.json();
        }).then(function (data) {

            // DOM manipulation 
            // update current weather data on browser
            document.querySelector(`#tempNow`).innerHTML = `Temp: ${data.current.temp} °F`
            document.querySelector(`#windNow`).innerHTML = `Wind: ${data.current.wind_speed} MPH`
            document.querySelector(`#humiNow`).innerHTML = `Humidity:  ${data.current.humidity}%`
            // update and style uv data according to level
            var uvNow = document.querySelector(`#uvNow`)
            uvNow.innerHTML = data.current.uvi
            uvNow.style.display = `inline-block`
            uvNow.style.border = `black solid 1px`
            uvNow.style.borderRadius = `5px`
            uvNow.style.padding = `0.2px 15px`
            if (data.current.uvi <= 2) {
                uvNow.setAttribute(`class`, `low`)
            } else if (data.current.uvi <= 5) {
                uvNow.setAttribute(`class`, `moderate`)
            } else if (data.current.uvi <= 7) {
                uvNow.setAttribute(`class`, `high`)
            } else {
                uvNow.setAttribute(`class`, `veryHigh`)
            }
            // set icon according to data
            // icon: https://openweathermap.org/img/wn/01d@2x.png
            document.querySelector(`#symbol`).setAttribute(`src`, `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`)

            //for loop: five cards 
            for (let i = 0; i < weather.list.length; i += 8) {
                // there are 8 keys in 24 hour, total of 40 keys in 5 days
                var dateFive = document.createElement(`p`) // create paragraph
                dateFive.innerHTML = moment.unix(weather.list[i].dt).format(`M/D/YYYY`)

                var iconFive = document.createElement(`img`) // create image
                iconFive.src = `https://openweathermap.org/img/wn/${weather.list[i].weather[0].icon}@2x.png`

                var temp = document.createElement(`p`)
                temp.innerHTML = `Temp: ${weather.list[i].main.temp}°F`

                var windFive = document.createElement(`p`)
                windFive.innerHTML = `Wind: ${weather.list[i].wind.speed} MPH`

                var humFive = document.createElement(`p`)
                humFive.innerHTML = `Humidity: ${weather.list[i].main.humidity}%`

                var card = document.createElement("div") // create div for card
                card.appendChild(dateFive)
                card.appendChild(iconFive)
                card.appendChild(temp)
                card.appendChild(windFive)
                card.appendChild(humFive)
                // style card
                card.setAttribute(`class`, `card-panel blue darken-1 white-text col s11 m11 l2`)
                card.style.margin = `10px`
                card.style.padding = `30px`
                // add to fivedays div
                var fiveDays = document.querySelector(`#fiveDays`)
                fiveDays.appendChild(card);
            }
        })
    })
}

// https://api.openweathermap.org/data/2.5/forecast?q=honolulu&appid=17e7b5f7c74f7d4820c1bdc0c6edb7c1