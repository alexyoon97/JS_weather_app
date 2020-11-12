var bot_temp_30 = ["Short Pants"];
var bot_temp_20 = ["Jeans", "Short", "Pants"];
var bot_temp_10 = ["Jeans", "Pants"];
var bot_temp_0 = ["Jeans", "Pants"];
var bot_temp_neg = ["Jeans", "Pants", "Heattech"];

var top_temp_30 = ["Tank Top"];
var top_temp_20 = ["T-Shirts", "Cardigan"];
var top_temp_10 = ["Hoodie", "Sweater", "Knit Sweater"];
var top_temp_0 = ["Coat", "Jacket", "Trench Coat", "Leather Jacket"];
var top_temp_neg = ["Padded Jacket", "Thick Coat"];

function FindOutfit_API_call() {
  let data = {};
  var outfit_list = "";

  if (parseInt(temp_degree.textContent) < 0) {
    data = { top_temp_neg, bot_temp_neg };
  } else if (parseInt(temp_degree.textContent) < 10) {
    data = { top_temp_10, bot_temp_10 };
  } else if (parseInt(temp_degree.textContent) < 20) {
    data = { top_temp_20, bot_temp_20 };
  } else {
    data = { top_temp_30, bot_temp_30 };
  }
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  var count = 0;
  for (var i in data) {
    count++;
    for (var j in data[i]) {
      outfit_list += `${data[i][j]} `;
    }
    if (count != 2) {
      outfit_list += " and ";
    }
  }

  document.getElementById("rec_outfit_id").textContent = outfit_list;
  console.log(temp_degree_value, data);
  const div = document.createElement('div');
  fetch("/api", options)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      div.innerHTML = "";
      for (let index = 0; index < json.icon_img.length; index++) {
          const img = document.createElement("img");
          img.src = json.icon_img[index];
          div.appendChild(img);
      }
      document.querySelector(".outfits-top").appendChild(div);

    });
}
