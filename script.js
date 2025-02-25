//Get elementByID loca so we can add text to it "Xiaodong Huang".
var x = document.getElementById("lat");
var y = document.getElementById("long");


// variables created for use with the Add and Remove button functionality. -Brittani Gongre-
let weatherInformationContainer = document.getElementById("weather-information-container");
let weatherInformationDiv = document.getElementById("weather-information");
let addBtn = document.getElementById("add-btn");
let removeBtn = document.getElementById("remove-btn");
let num = 1;



//get user's location and display "Xiaodong Huang"
function getLocation() { 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  function showPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    x.innerHTML = lat;
    y.innerHTML = long;
    Geoweather.fetchWeather(lat,long);
    
    
  }
  window.onload = function() {
    var lat ;
    var long;
    getLocation()
  }


//getting the value user search "Xiaodong Huang"
function search() {
    weather.fetchWeather(document.getElementsByClassName("cityLoc")[0].value);
  }

//add eventlistener, onclick to the button get the value user input. "Xiaodong Huang"
  document.querySelector(".search button").addEventListener("click", function () {
        search();
  });
//when user press enter call the search function.  "Xiaodong Huang"
  document.querySelector(".cityLoc").addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
            search();
      }
    });

//Connect to the api, and get the data to json "Xiaodong Huang"
  let weather = {
    apiKey: "a4ba445616b05d69a1302b0cad41b887",
    //function take a city name, then fetch it from api "Xiaodong Huang"
    fetchWeather: function (city) { 
      fetch("https://api.openweathermap.org/data/2.5/weather?q=" +city +"&units=Imperial&appid=" +this.apiKey)
      //once fetch data from api return it to json data "Xiaodong Huang"
      .then((response) => {
        if (!response.ok) {
            alert("City name error");
            throw new Error("City name error");
          }
          return response.json();
        })
        //once we have the data, get the data to displace function. "Xiaodong Huang"
        .then((data) => displayWeather(data));
        },
  };

    //api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid={API key}
    //Second function, this time it take user's lat and long and get weather
    //upon login user will get current location weather
    let Geoweather = {
      apiKey: "a4ba445616b05d69a1302b0cad41b887",
      //function take a city name, then fetch it from api "Xiaodong Huang"
      fetchWeather: function (lat,long) { 
        fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long + "&units=Imperial&appid=" +this.apiKey)
        //once fetch data from api return it to json data "Xiaodong Huang"
        .then((response) => {
          if (!response.ok) {
              alert("City name error");
              throw new Error("City name error");
            }
            return response.json();
          })
          //once we have the data, get the data to displace function. "Xiaodong Huang"
          .then((data) => displayWeather(data));
          },
    };

//once we have the data from api, get the data and put it in html  "Xiaodong Huang"
    let flat;
    let flon;
    let cname;
    function displayWeather(data) {
        let { name } = data;
        let { icon, description } = data.weather[0];
        let { temp,  humidity } = data.main;
        let { speed } = data.wind;
        let { visibility } = data;
        let { sunrise } = data.sys;
        let { sunset } = data.sys;
        let { lon} = data.coord;
        let { lat } = data.coord;
        document.getElementsByClassName("cityName")[0].innerText = "Weather in " + name;
        document.getElementsByClassName("forecity")[0].innerText = "Forecast in " + name;
        document.getElementsByClassName("icon")[0].src ="https://openweathermap.org/img/wn/" + icon + ".png";
        document.getElementsByClassName("description")[0].innerText = description;
        document.getElementsByClassName("temp")[0].innerText = temp + "°F";
        document.getElementsByClassName("humidity")[0].innerText ="Humidity: " + humidity + "%";
        document.getElementsByClassName("wind")[0].innerText ="Wind speed: " + speed + " km/h";
        document.getElementsByClassName("visibility")[0].innerText ="visibility: " + visibility;
        var date = new Date(sunrise * 1000);
        var timestr = date.toLocaleTimeString();
        document.getElementsByClassName("sunrise")[0].innerText ="sunrise: " +  timestr;
        var date = new Date(sunset * 1000);
        var timestr = date.toLocaleTimeString();
        document.getElementsByClassName("sunset")[0].innerText ="sunset: " + timestr;
        //set values for forecast function "Xiaodong Huang"
        flat = lat;
        flon = lon;
        cname = name;
      }









// function will make the Remove button visible once a new weather option is added
// a new weather option will be copied from the original and appended to the end of the 
// 'weather-information-container' div. Also, added the 'removeable-weather' id to identify
// the copies. -Brittani Gongre-
let createNewWeather = () => {
  let addWeather = weatherInformationDiv.cloneNode(true);
  weatherInformationContainer.appendChild(addWeather); 
  addWeather.setAttribute("id", "removeable-weather");

  const removeBtn = document.createElement("button");
  removeBtn.innerHTML = "Remove";
  removeBtn.classList.add("btn", "btn-default");
  removeBtn.style.marginTop = "30px";
  removeBtn.style.paddingLeft = "20px";
  removeBtn.style.paddingRight = "20px";
  removeBtn.addEventListener("click", removeWeather);
  addWeather.appendChild(removeBtn);
}

// function checks to see if 'weather-information-container' and if it does it will remove them
// one by one. If all the 'removable-weather' copies are gone, the 'weather-information-container' 
// child node length will be 3. It will leave one single weather search on the page. -Brittani Gongre-
let removeWeather = () => {
  let removableWeatherInformationDiv = document.getElementById("removeable-weather");
  if (weatherInformationContainer.hasChildNodes() && weatherInformationContainer.childNodes.length > 3)
  {
    removableWeatherInformationDiv.parentNode.removeChild(removableWeatherInformationDiv);
  }
}

// event listeners for the Add and Remove buttons. -Brittani Gongre-
addBtn.addEventListener("click", createNewWeather);
// removeBtn.addEventListener("click", removeWeather);

 














//function to call the forecast function "Xiaodong Huang"
function foreDays(flat,flon, num) {
  Foreatherweek.fetchWeather(flat,flon, num);
}



//onclick to the button get the value user input, then call forecast function to display "Xiaodong Huang"
function threedis (){
  foreDays(flat,flon,document.getElementById("threeDay").value);
}

function sevendis (){
  foreDays(flat,flon,document.getElementById("sevenDay").value);
}
//clear the forecast 
function removefore(){
  var removeForecast = document.querySelector(".forecast-day");
  while(removeForecast.children.length> 0) {
  removeForecast.removeChild(removeForecast.lastChild);
  }


}
 //clear the forecast  
function clearfore(){

  var removeForecast = document.querySelector(".forecast-day");
  while(removeForecast.children.length> 0) {
  removeForecast.removeChild(removeForecast.lastChild);
  }


}













//forecast object
let Foreatherweek = {
  apiKey: "a4ba445616b05d69a1302b0cad41b887",
  //function take lat and lon, then fetch it from api "Xiaodong Huang"
  fetchWeather: function (flat,flong,num) { 
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+flat+"&lon="+flong + "&exclude=current,hourly,minutely,alerts&cnt=3&units=Imperial&appid=" +this.apiKey)
    //once fetch data from api return it to json data "Xiaodong Huang"
    .then((response) => {
      if (!response.ok) {
          alert("City name error");
          throw new Error("City name error");
        }
        return response.json();
      })
      //once we have the data, get the data to displace function. "Xiaodong Huang"
      .then((data) => foreDisplay(data, num));
      },
};

//where to put the forecast "Xiaodong Huang"
var forecast = document.getElementsByClassName("forecast-day");
// function to display the forecast "Xiaodong Huang"
function foreDisplay(data, num){
  //Check if there are forecasat already, if there is remove it. "Xiaodong Huang"
  removefore();
  var fday = "";
  //display number of days depends on the user's selection "Xiaodong Huang"
  data.daily.forEach((value, index) => {
    if (index > 0 && index <= num) {
      //conver the day, from unix to readalbe 
      var dayname = new Date(value.dt * 1000).toLocaleDateString("en", {
        weekday: "long",
      });
      var icon = value.weather[0].icon;
      var disCon = "https://openweathermap.org/img/wn/" + icon + ".png";
      var temp = value.temp.day.toFixed(0);
      fday = `<div id="days">
        <p>${dayname}</p>
        <img class="${icon}" src= ${disCon}>
        <br>
        <div class="forecast-day--temp">${temp}<sup>°F</sup></div>
        <br>
      </div>`;
      forecast[0].insertAdjacentHTML('beforeend', fday);
    }
  });
}



