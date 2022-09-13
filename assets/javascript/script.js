$(document).ready(function() {
    const APIKey = "eca2c2ddac9ef4066cbc3fbee74ff621";
    const baseURL = "https://api.openweathermap.org/data/2.5/weather?";

    // When search is clicked get input from #searchText
    $("#searchBtn").click(function(event) {
        console.log("Clicked");

        var citySearch = $("#searchText").val();
        console.log(citySearch);

        getWeather(citySearch);

        event.preventDefault(); 



    });


    function getWeather(city) {
        

        if (city == "") {
            return;
        }

        var url = `${baseURL}q=${city}&APPID=${APIKey}`;

        console.log(url);

        fetch(url)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {

                    console.log(JSON.stringify(data));


                })
            } else {
                console.log("Not OK");
            }
        }).catch(function(error) {
            console.log("Error connecting");
        });


    }

});
