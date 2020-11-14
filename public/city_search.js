var cities;
let search_term = "";
var filtered_cities;

fetch("./cities.json")
  .then((res) => res.json())
  .then((data) =>
    search_input.addEventListener("input", (e) => {
      results.hidden = false;
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

        if (filtered_cities.length == 0) {
          const li = document.createElement("li");
          li.classList.add("city_name");
          li.innerText = "no results";
          ul.appendChild(li);
        } else {
          for (let index = 0; index < filtered_cities.length; index++) {
            const li = document.createElement("li");
            li.classList.add("city_name");
            li.innerText = filtered_cities[index].city;
            li.id = `${filtered_cities[index].latitude}, ${filtered_cities[index].longitude}`;
            ul.appendChild(li);
          }
        }
        results.appendChild(ul);
      }
    })
  );

results.addEventListener('click', function(e){
  search_input.value = e.target.innerHTML;
  search_input.name = e.target.id
  console.log(e.target.innerHTML)
  results.hidden = true;

  Selected_City();
})
