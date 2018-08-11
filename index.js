document.getElementById("heading").innerHTML="WEATHER APP";
document.getElementById("heading").style.color="red";
var localStorageElement = JSON.parse(localStorage.getItem('city'));
window.addEventListener("keydown",keyPress);
displayStorage();
var api = "81a180112f37452097a903e35704fb9a"
function displayStorage(){
    if(localStorageElement!=null){
        $("#prevSearch").html("Previous Searches");
        $("#lslist").empty();
        localStorageElement.forEach(function(city)
        {
            $("#lslist").append("<li>"+city+"</li>");
        });
    }
}
function emptyResults(){
$("#results").empty();
}
function printResults(data){
    var cityname="<tr><td>City name</td><td>"+data.name+"</td></tr>";
    var temp = "<tr><td>Temperature</td><td>" + (data.main.temp-273).toFixed(2) + "&#176; C</td></tr>";
    var pressure = "<tr><td>Pressure</td><td>" + data.main.pressure + "<hPa/td></tr>";
    var wind = "<tr><td>Wind</td><td>" + data.wind.speed+"<m/s/td></tr>";
    var humidity = "<tr><td>Humidity</td><td>" + data.main.humidity + "%</td></tr>";
    $("#results").append(cityname);
    $("#results").append(temp);
    $("#results").append(pressure);
    $("#results").append(wind);
    $("#results").append(humidity);
}
function findweather(){
    var cityname=document.getElementById("city").value;
    $.get("http://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid="+api,function(){
        console.log("success");
    })
    .done(function(data){
        console.log(data)
        emptyResults();
        printResults(data);
        if(localStorageElement==null){
            localStorageElement=[];
        }
        if(!localStorageElement.includes(cityname))
        {
            if(localStorageElement.length>=5){
                localStorageElement.pop();
            }
            localStorageElement.unshift(cityname);
            localStorage.setItem('city', JSON.stringify(localStorageElement));
           
        }
        displayStorage();
            
})
.fail(function(){
console.log("Invalid city name");
});
}
function findMyWeather(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position);
            var lat=position.coords.latitude;
            var lon=position.coords.longitude;
            $.get("http://api.openweathermap.org/data/2.5/weather?lat=" +lat+"&lon="+lon+"&appid="+api,function(data){
                console.log(data);
                emptyResults();
                printResults(data);
            });
    });
    }
}
function keyPress(e){
     if(e.keyCode==13){
         findweather();
     }
}
