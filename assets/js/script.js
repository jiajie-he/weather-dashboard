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

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${search.value}&units=imperial&appid=17e7b5f7c74f7d4820c1bdc0c6edb7c1`).then(function (promise) {
    return promise.json();
}).then(function (weather) {
    var test = document.querySelector(`#test`)
    
    cityName.innerHTML = weather.city.name 
    // test.innerHTML = weather.list[0].main.temp
    console.log(weather)

    
    for (let i = 0; i < weather.list.length; i+=8) {
        console.log(weather.list[i].main.temp)


        
        var temp = document.createElement(`h5`)
        temp.innerHTML = weather.list[i].main.temp + ` F°`
        temp.setAttribute(`class`,`card-panel red lighten-1 white-text col s12 m4 l2`)
        

        var card = document.createElement("div")
        card.appendChild(temp)

        

        var fiveDays = document.querySelector(`#fiveDays`)
        fiveDays.appendChild(card);


        
        
    }

  

})



}

//TODO:display city weather
//Manipulating the DOM
//for loop for five cards





// https://api.openweathermap.org/data/2.5/forecast?q=honolulu&appid=17e7b5f7c74f7d4820c1bdc0c6edb7c1