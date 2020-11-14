let temp_timezone = document.querySelector(".location-timezone");
let temp_degree = document.querySelector(".temp-degree");
let temp_description = document.querySelector(".temp-description");
let temp_icon = document.getElementById("temp-icon");
let temp_feelslike = document.querySelector(".extra-feelslike");
let temp_wind = document.querySelector(".extra-wind");
let temp_humidity = document.querySelector(".extra-humidity");
let temp_cloud = document.querySelector(".extra-cloud");
let temp_degree_value;
let LatLong;

const results = document.getElementById("results");
const search_input = document.getElementById("location-search");

window.addEventListener("load", () => {
    Current_City();
  });