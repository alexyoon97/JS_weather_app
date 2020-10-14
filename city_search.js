var cities;
const results = document.getElementById("results");
const search_input = document.getElementById("location-search");
let search_term = "";
var filtered_cities;

fetch("./cities.json")
  .then((res) => res.json())
  .then((data) =>
    search_input.addEventListener("input", (e) => {
      results.innerHTML = "";
      search_term = e.target.value;

      if (search_term == "") {
        results.innerHTML = "";
      } else {
        filtered_cities = data.filter((city_list) => {
          return city_list.city
            .toLowerCase()
            .includes(search_term.toLowerCase());
        });
        console.log(filtered_cities);

        const ul = document.createElement("ul");
        ul.classList.add("cities");

        for (let index = 0; index < filtered_cities.length; index++) {
          const li = document.createElement("li");
          li.classList.add("city_name");
          li.innerText = filtered_cities[index].city;
          li.value = `${filtered_cities[index].latitude} , ${filtered_cities[index].longtitude}`
          ul.appendChild(li);
        }
        results.appendChild(ul);
      }
    })
  );

let listItems = document.querySelectorAll('#results');

listItems.forEach((item, index) => {
    item.addEventListener('click', (event) => {
        console.log(event.currentTarget.innerText, index)
    })
})
