var Historysearch = [];
var Listbutton = document.querySelector("#Listbutton");
var HistorysearchEl = document.querySelector(".Historysearch");
var InputcityEl = document.querySelector(".Inputcity");

function getWeatherInfo(cityname) {
  var Url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityname +
    "&appid=7f056f2923c93db54124cd78a1bbb57b";
  fetch(
    // Make a fetch request using city
    Url
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      // Create variables to hold the latitude and longitude of requested city
      var currentIcon = response.weather[0].icon;
      var iconURl = "http://openweathermap.org/img/wn/" + currentIcon + ".png";
      console.log(iconURl);

      $(".Namecity").text(cityname);

      $(".Tempcurrent").text("Temperature: " + response.main.temp + " °F");
      $(".Windcurrent").text("Wind: " + response.wind.deg + " MPH");
      $(".currentHumidity").text("Humidity: " + response.main.humidity + " %");
      $("#Iconweather").attr({ src: iconURl });

      console.log(response);
      var latitude = response.coord.lat;
      var longitude = response.coord.lon;
      // console.log(latitude);
      // Return a fetch request to the OpenWeather using longitude and latitude from pervious fetch
      return fetch(
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
          latitude +
          "&lon=" +
          longitude +
          "&exclude=alerts,minutely,hourly&units=imperial&appid=7f056f2923c93db54124cd78a1bbb57b"
      );
    })
    .then(function (response) {
      // return response in json format
      return response.json();
    })
    .then(function (response) {
      console.log(response.list);

      var iconDisplay = [];
      var iconsUrls = [];

      for (i = 1; i < 10; i++) {
        iconDisplay[i] = response.list[i].weather[0].icon;
      }

      iconDisplay = iconDisplay.filter((item) => item);
      for (i = 0; i < iconDisplay.length; i++) {
        iconsUrls[i] =
          "http://openweathermap.org/img/wn/" + iconDisplay[i] + ".png";
      }
      for (i = 0; i < iconsUrls.length; i++) {
        $("#icon" + i).attr({ src: iconsUrls[i], alt: "Daily Weather Icon" });
      }

      //finding max Temp and then looping through the five days to display it
      console.log(response);
      var maxTemp = [];
      for (var i = 0; i < 6; i++) {
        maxTemp[i] = parseInt(response.list[i].main.temp_max) + "°F";
      }

      maxTemp = maxTemp.filter((item) => item);
      for (i = 0; i < maxTemp.length; i++) {
        $("#highTemp" + i).text("High: " + maxTemp[i]);
      }
      console.log(maxTemp);
      //finding min Temp and then looping through the five days to display it
      var minTemp = [];
      for (var i = 0; i < 6; i++) {
        minTemp[i] = parseInt(response.list[i].main.temp_min) + "°F";
      }
      minTemp = minTemp.filter((item) => item);
      for (i = 0; i < minTemp.length; i++) {
        $("#lowTemp" + i).text("Low: " + minTemp[i]);
      }
      console.log(minTemp);

      //finding humidity for all five days and looping through the five day forecast

      var fiveDayHumidity = [];

      for (var i = 0; i < 6; i++) {
        fiveDayHumidity[i] = response.list[i].main.humidity;
      }

      fiveDayHumidity = fiveDayHumidity.filter((item) => item);
      for (var i = 0; i < fiveDayHumidity.length; i++) {
        $("#humidityDay" + i).text("Humidity: " + fiveDayHumidity[i] + "%");
      }
    });
}

function displayCity() {
  $(".btn").click(function () {
    var Namecity = $(".Inputcity").val();
    getWeatherInfo(Namecity);
    createCityButton(Namecity);
    $(".Inputcity").val("");

    // createCityButton();
  });
}

displayCity();

//create a button function

function createCityButton(Namecity) {
  if (Namecity) {
    Historysearch.push(Namecity);
    localStorage.setItem("Historysearch", JSON.stringify(Historysearch));
    var cityButton = document.createElement("button");
    cityButton.className = "cityBtn";
    cityButton.setAttribute("data-city", Namecity);
    cityButton.innerHTML = Namecity;
    var listButton = document.createElement("li");
    listButton.appendChild(cityButton);
    Listbutton.appendChild(listButton);
  } else {
    alert("please enter a City Name");
  }
}

//load cities from local storage
var loadSearchedCities = function () {
  var search = JSON.parse(localStorage.getItem("Historysearch"));

  if (search) {
    Historysearch = JSON.parse(localStorage.getItem("Historysearch"));

    for (var i = 0; i < Historysearch.length; i++) {
      var cityButton = document.createElement("button");
      cityButton.className = "cityBtn";
      cityButton.setAttribute("data-city", Historysearch[i]);
      cityButton.innerHTML = Historysearch[i];
      var listButton = document.createElement("li");
      listButton.appendChild(cityButton);
      Listbutton.appendChild(listButton);
    }
  }
};
loadSearchedCities();
