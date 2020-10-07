window.addEventListener("load", () => {
  let long;
  let lat;
  let temp_timezone = document.querySelector(".location-timezone")
  let temp_degree = document.querySelector(".temp-degree");
  let temp_description = document.querySelector(".temp-description");
  let temp_icon = document.getElementById("temp-icon");
  let temp_feelslike = document.querySelector(".extra-feelslike");
  let temp_wind = document.querySelector(".extra-wind");
  let temp_humidity = document.querySelector(".extra-humidity");
  let temp_cloud = document.querySelector(".extra-cloud");


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/"
      const api = `${proxy}http://api.weatherapi.com/v1/current.json?key=733dc5cf67f74925b4320851200710&q=${lat},${long}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
            temp_timezone.textContent = `${data.location.name}, ${data.location.country}`
            temp_degree.textContent = `${data.current.temp_c} C`
            temp_description.textContent = data.current.condition.text
            temp_icon.src = data.current.condition.icon
            temp_feelslike.textContent = `${data.current.feelslike_c} C`;
            temp_wind.textContent = `${data.current.wind_kph} kph`;
            temp_humidity.textContent = `${data.current.humidity}`;
            temp_cloud.textContent = `${data.current.cloud}`;
        });
    });
  }
});