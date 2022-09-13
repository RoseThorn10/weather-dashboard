$(document).ready(function() {
    const APIKey = "eca2c2ddac9ef4066cbc3fbee74ff621";
    const baseURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&";

    const baseIconURL="http://openweathermap.org/img/wn/";

    // Number of forecast days
    const cnt = 5;


    // Add all buttons from local storage
    var cityList = JSON.parse(localStorage.getItem("cityList"));

    console.log(cityList);

    cityList = cityList != null ? cityList : [];


    $("#history").empty();



    for (i = 0; i < cityList.length; i++) {
        var cityName = cityList[i];

        //console.log(i);



        var buttonHTML = `<button class="historyBtn">${cityName}</button>`
        $("#history").append(buttonHTML);
    }

    // When search is clicked get input from #searchText
    $("#searchBtn").click(function(event) {
        console.log("Clicked");

        var citySearch = $("#searchText").val();
        //console.log(citySearch);

        getWeather(citySearch);

        event.preventDefault(); 
    });

    $(".historyBtn").click(function(event) {
        console.log("history button");
        var cityName = $(event.target).text();
        getWeather(cityName);
    });

    function getWeather(city) {
        
        // If search button is clicked when search box is empty, do not run fetch function
        if (city == "") {
            return;
        }

        var url = `${baseURL}q=${city}&APPID=${APIKey}`;

        // console.log(url);

        // execute api search
        fetch(url)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                    //console.log(JSON.stringify(data));

                    var temp = data.main.temp;
                    var wind = data.wind.speed;
                    var humidity = data.main.humidity;
                    var cityName = data.name;
                    var datetime = data.sys.dt;
                    var lon = data.coord.lon;
                    var lat = data.coord.lat;
                    var datestr = moment(datetime).format("MM/DD/YYYY");

                    // place data from search onto html page
                    $("#citydate").text(`${cityName}-${datestr}`);

                    $("#citytemp").text(`Temp: ${temp}F`);

                    $("#citywind").text(`Wind: ${wind} MPH`);

                    $("#cityhumidity").text(`Humidity: ${humidity}%`)

                    var cityList = JSON.parse(localStorage.getItem("cityList"));

                    cityList = cityList != null ? cityList : [];

                    if (!cityList.includes(cityName)) {

                        var buttonHTML = `<button class="historyBtn row">${cityName}</button>`
                        $("#history").append(buttonHTML);    

                        cityList.push(cityName);

                        localStorage.setItem("cityList", JSON.stringify(cityList));

                        $("#searchText").val("");
                    }



                    // Now fetch forecast data
                    url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;


                
                    fetch(url)
                    .then(function (response) {
                        if (response.ok) {
                            response.json().then(function (data) {
                                var daycards = $(".daycard").toArray();

                                for (i = 0; i < cnt; i++) {
                                    console.log("Card " + i);


                                    var j = i * 8 + 7;
                                    var record = data.list[j];

                                    console.log(record);

                                    var dt = moment(record.dt * 1000).format("MM/DD/YYYY");
                                    var tmp = record.main.temp;
                                    var wind = record.wind.speed;
                                    var humid = record.main.humidity;
                                    var icon = record.weather[0].icon;
                                    console.log("Icon: "+ icon);

                                    var cardName = `.card${i}`;

                                    console.log(cardName);

                                    $(cardName).children(".fDate").text("Date: " + dt);
                                    $(cardName).children(".fTemp").text("Temp: " + tmp + " F");
                                    $(cardName).children(".fWind").text("Wind: " + wind + " MPH");
                                    $(cardName).children(".fHumid").text("Humidity: " + humid + "%");

                                    var iconURL = baseIconURL + icon.substring(0,2) + "d.png";

                                    console.log(iconURL);
                                    $(cardName).children(".fIcon").attr("src", iconURL);
                                                                    


                                }
                            })


                        } else {
                            console.log("Not OK");
                        }
                    }).catch(function(error) {
                        console.log("Error connecting");
                    });
                });                    
            } else {
                console.log("Not OK");
            }
        }).catch(function(error) {
            console.log("Error connecting");
        });
    }
    
});
