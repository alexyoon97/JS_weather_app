//declaration and initiallization
const express = require('express')
const request_api = require('request')
const app = express();
const port = process.env.PORT || 3000

//opening port
app.listen(port, () => console.log(`starting server at ${port}`));

app.use(express.static('public'));//serves public folder
app.use(express.json());

var top_icon_img_urls = [];
var bot_icon_img_urls = [];

//autherization for icon api
var NounProject = require('the-noun-project'),
nounProject = new NounProject({
    key: 'd37f53a4717646c290b616d1499e7988',
    secret: '56779a466caf4070b58998afc64df940'
});
//request
app.use('/api', FindIcons)
//response
app.post('/api', (request,response) => {
    console.log(top_icon_img_urls);
    response.json({
        status: 'success',
        top_icon_img: top_icon_img_urls,
        bot_icon_img: bot_icon_img_urls
    });
    top_icon_img_urls = [];
    bot_icon_img_urls = [];

})
//find requested icons 
function FindIcons(response,request,next){
    for(var i in response.body){
        for(var j in response.body[i]){
            if(i.toString().includes("bot",0)){
                nounProject.getIconsByTerm(response.body[i][j], function (err, data) {
                    if (!err) {
                        bot_icon_img_urls.push(data.icons[2].preview_url);
                    }
                    else{
                        console.log(err + response.body);
                    }
                 });
            }
            else{
                nounProject.getIconsByTerm(response.body[i][j], function (err, data) {
                    if (!err) {
                        top_icon_img_urls.push(data.icons[2].preview_url);
                    }
                    else{
                        console.log(err + response.body);
                    }
                 });
            }
            
        }
    }
    console.log(bot_icon_img_urls);
    next();
}