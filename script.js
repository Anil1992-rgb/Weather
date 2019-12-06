$(".btn-primary").on("click", function(event) {
    event.preventDefault();

    var cityInput = $("#searchTerms").val();
    var APIKey = "bc391d3502ace61ff5678254a2a56546";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + cityInput + "&appid=" + APIKey;
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + cityInput + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response) {

        $("#cityName").html(response.name);
        $("#mainIcon").html("<img src='" + "http://openweathermap.org/img/wn/04d@2x.png" + "'>")
        $("#temperature").text("Temperature: " + response.main.temp);
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#wind-speed").text("Wind Speed: " + response.wind.speed + " MPH");
        $("#uv-index").text("UV Index: ");

        //console.log(response);
    });


    var li = $("<button class='list-group-item'>");
    $("ul").append(li);
    li.text(cityInput);




    $.ajax({
            url: fiveDayURL,
            method: "GET"
        })
        .then(function(response) {

            var forecastIndex = 1

            for (i = 6; i < response.list.length; i += 8) {
                $("#frcst" + forecastIndex).append("<div>" + new Date(response.list[i].dt_txt).toLocaleDateString() + "<br>" + "<img src='" + "http://openweathermap.org/img/wn/04d@2x.png" + "'>" + "</div>");
                $("#frcstIcon").html(response.list[i].weather[0].icon);
                $("#frcst" + forecastIndex).append("<div class='frcstTemp'>" + "Temp: " + response.list[i].main.temp + "</div>");
                $("#frcst" + forecastIndex).append("<div>" + "Humidity: " + response.list[i].main.humidity + "%" + "</div>");
                forecastIndex++
            }


            console.log(response.list);

        });



});