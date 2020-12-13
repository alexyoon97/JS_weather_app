const temp_timezone = document.querySelector(".location-timezone");
const temp_degree = document.querySelector(".temp-degree");
const temp_description = document.querySelector(".temp-description");
const temp_icon = document.getElementById("temp-icon");
const temp_feelslike = document.querySelector(".extra-feelslike");
const temp_wind = document.querySelector(".extra-wind");
const temp_humidity = document.querySelector(".extra-humidity");
const temp_cloud = document.querySelector(".extra-cloud");
var temp_degree_value;
var LatLong;

const results = document.getElementById("results");
const search_input = document.getElementById("location-search");

window.addEventListener("load", () => {
    Current_City();
  });