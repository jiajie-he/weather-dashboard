var searchBar = document.querySelector(`#hello`);
var search = document.querySelector(`#search`);
var city = document.querySelector(`#cityName`)

//TODO:look up weather forcast by city name
//eventlisnter click

searchBar.addEventListener(`click`, event => {
    event.preventDefault()
    searchCity()
    $(fiveDays).empty();
})

// fetch request api

function searchCity() {

console.log(search.value)



// 5 days forcast
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${search.value}&units=imperial&appid=17e7b5f7c74f7d4820c1bdc0c6edb7c1`).then(function (promise) {
    return promise.json();
}).then(function (weather) {
    
    city.innerHTML = weather.city.name 
    console.log(weather)
    
    // current
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${weather.city.coord.lat}&lon=${weather.city.coord.lon}&units=imperial&appid=17e7b5f7c74f7d4820c1bdc0c6edb7c1`).then(function (promise) {
        return promise.json();
    }).then(function (data) {
        console.log(data)
        
        // value is for input field
        document.querySelector(`#tempNow`).innerHTML = `Temp: ${data.current.temp} °F`

        document.querySelector(`#windNow`).innerHTML = `Wind: ${data.current.wind_speed} MPH`
        
        document.querySelector(`#humiNow`).innerHTML = `Humidity:  ${data.current.humidity}%`


        //up to 2 is low
        // >2 is moderate
        // 5-7 is high
        // >7 is very high
        var uvNow =document.querySelector(`#uvNow`)

        uvNow.innerHTML = data.current.uvi

        uvNow.style.display = `inline-block` 
        uvNow.style.border = `black solid 1px`
        uvNow.style.borderRadius = `5px`
        uvNow.style.padding = `0.2px 15px`

        if (data.current.uvi <= 2) {
            uvNow.setAttribute(`class`,`low`)
        } else if (data.current.uvi <=5) {
            uvNow.setAttribute(`class`,`moderate`)
        } else if (data.current.uvi <=7) {
            uvNow.setAttribute(`class`,`high`)
        } else {
            uvNow.setAttribute(`class`,`veryHigh`)
        }

        document.querySelector(`#symbol`).setAttribute(`src`,`https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`)

    // https://openweathermap.org/img/wn/01d@2x.png
    //TODO:display city weather
    //Manipulating the DOM
    //for loop for five cards
    for (let i = 0; i < weather.list.length; i+=8) {
        // console.log(weather.list[i].main.temp)
        // console.log(moment.unix(weather.list[i].dt).format(`M/D/YYYY`))
        
        var dateFive = document.createElement(`p`)
        dateFive.innerHTML = moment.unix(weather.list[i].dt).format(`M/D/YYYY`) 

        var iconFive = document.createElement(`img`)
        iconFive.src = `https://openweathermap.org/img/wn/${weather.list[i].weather[0].icon}@2x.png`
      
        var temp = document.createElement(`p`)
        temp.innerHTML = `Temp: ${weather.list[i].main.temp}°F`

        var windFive = document.createElement(`p`)
        windFive.innerHTML = `Wind: ${weather.list[i].wind.speed} MPH`

        var humFive = document.createElement(`p`)
        humFive.innerHTML = `Humidity: ${weather.list[i].main.humidity}%`
        
        var card = document.createElement("div")
        card.appendChild(dateFive)
        card.appendChild(iconFive)
        card.appendChild(temp)
        card.appendChild(windFive)
        card.appendChild(humFive)
        
        card.setAttribute(`class`,`card-panel red lighten-1 white-text col s11 m11 l2`)
        card.style.margin = `10px`
        card.style.padding = `30px`
        

        var fiveDays = document.querySelector(`#fiveDays`)
        fiveDays.appendChild(card);


        
        
    }

})


})



}






// https://api.openweathermap.org/data/2.5/forecast?q=honolulu&appid=17e7b5f7c74f7d4820c1bdc0c6edb7c1