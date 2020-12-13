const bot_temp_30 = ["Short Pants"];
const bot_temp_20 = ["Jeans", "Short", "Pants"];
const bot_temp_10 = ["Jeans", "Pants"];
const bot_temp_0 = ["Jeans", "Pants"];
const bot_temp_neg = ["Jeans", "Pants", "Heattech"];

const top_temp_30 = ["Tank Top"];
const top_temp_20 = ["T-Shirts", "Cardigan"];
const top_temp_10 = ["Hoodie", "Sweater", "Knit Sweater"];
const top_temp_0 = ["Coat", "Jacket", "Trench Coat", "Leather Jacket"];
const top_temp_neg = ["Padded Jacket", "Thick Coat"];

function FindOutfit_API_call() {
  let data = {};
  let outfit_list = "";

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
    body: JSON.stringify(data)
  };

  let count = 0;
  for (var i in data) {
    count++;
    for (var j in data[i]) {
      outfit_list += `${data[i][j]} `;
    }
    if (count !== 2) {
      outfit_list += " and ";
    }
  }
  document.querySelector(".recommended-outfits").innerHTML = "";
  document.getElementById("rec_outfit_id").textContent = outfit_list;
  console.log(temp_degree_value, data);
  const div_top = document.createElement('div');
  const div_bot = document.createElement('div');

  fetch("/api", options)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      div_top.classList.add("outfits-top");
      div_bot.classList.add("outfits-bot");

      for (let index = 0; index < json.top_icon_img.length; index++) {
          const img = document.createElement("img");
          img.src = json.top_icon_img[index];
          div_top.appendChild(img);
      }
      for (let index = 0; index < json.bot_icon_img.length; index++) {
        const img = document.createElement("img");
        img.src = json.bot_icon_img[index];
        div_bot.appendChild(img);
    }
      document.querySelector(".recommended-outfits").appendChild(div_top);
      document.querySelector(".recommended-outfits").appendChild(div_bot);

    });
}
