$(document).ready(function() {
    const APIKey = "eca2c2ddac9ef4066cbc3fbee74ff621";
    const baseURL = "https://api.openweathermap.org/data/2.5/weather?";

    $("#searchBtn").click(function(event) {
        console.log("Clicked");

        var citySearch = $("#searchText").val();
        console.log(citySearch);

        event.preventDefault(); 



    });


    function getWeather(city) {
        

        if (city == "") {
            return;
        }

        var url = `$[baseURL]$[citySearch]&APPID$[APIKey]`;

        fetch(url)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    
                })
            }
        })
    }



})