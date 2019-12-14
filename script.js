$(".btn-primary").on("click", function(event) {
    event.preventDefault();
    var cityInput = $("#searchTerms").val();

    callWeatherApi(cityInput, true);

});

$(document).on("click", ".town", function() {
    var townName = $(this).text()
    callWeatherApi(townName, false)
})

$("#searchTerms").keypress(function(event) {
    var key = event.which;
    if (key == 13) {
        var cityInput = $("#searchTerms").val();

        callWeatherApi(cityInput, true);
    }
});


var callWeatherApi = function(cityInput, addToList) {

    var APIKey = "bc391d3502ace61ff5678254a2a56546";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + cityInput + "&appid=" + APIKey;
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + cityInput + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response) {

        var weatherIcon = response.weather[0].icon;

        $("#cityName").html(response.name + " (" + new Date().toLocaleDateString() + ")");
        $("#mainIcon").html("<img src='" + "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png" + "'>")
        $("#temperature").html("Temperature: " + response.main.temp + " &#8457;");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#wind-speed").text("Wind Speed: " + response.wind.speed + " MPH");
        $("#uv-index").text("UV Index: ");
    });

    if (addToList === true) {
        var li = $("<button class='list-group-item town'>");
        $("ul").append(li);
        li.text(cityInput);
    }

    $.ajax({
            url: fiveDayURL,
            method: "GET"
        })
        .then(function(response) {

            var forecastIndex = 1

            for (i = 6; i < response.list.length; i += 8) {

                var fivedayIcon = response.list[i].weather[0].icon;

                $("#frcst" + forecastIndex).html("").append("<div>" + new Date(response.list[i].dt_txt).toLocaleDateString() + "<br>" + "<img src='" + "http://openweathermap.org/img/wn/" + fivedayIcon + "@2x.png" + "'>" + "</div>");
                $("#frcstIcon").html(response.list[i].weather[0].icon);
                $("#frcst" + forecastIndex).append("<div class='frcstTemp'>" + "Temp: " + response.list[i].main.temp + " &#8457;" + "</div>");
                $("#frcst" + forecastIndex).append("<div>" + "Humidity: " + response.list[i].main.humidity + "%" + "</div>");
                forecastIndex++
            }
        });
};