const { response } = require('express');
const express = require('express')
const app = express();
const port = process.env.PORT || 3000

app.listen(port, () => console.log(`starting server at ${port}`));

app.use(express.static('public'));
app.use(express.json());
var top_icon_img_urls = [];
var bot_icon_img_urls = [];

var NounProject = require('the-noun-project'),
nounProject = new NounProject({
    key: 'd37f53a4717646c290b616d1499e7988',
    secret: '56779a466caf4070b58998afc64df940'
});
app.post('/api', async(request,response) => {
    await FindIcons(request);
    console.log(top_icon_img_urls);
    response.json({
        status: 'success',
        top_icon_img: top_icon_img_urls,
        bot_icon_img: bot_icon_img_urls
    });
    top_icon_img_urls = [];
    bot_icon_img_urls = [];

})
function FindIcons(request){
    for(var i in request.body){
        for(var j in request.body[i]){
            console.log(request.body[i][j]);
            nounProject.getIconsByTerm(request.body[i][j], function (err, data) {
                if (!err) {
                    top_icon_img_urls.push(data.icons[1].preview_url);

                    // if(count == 0){
                    //     console.log(i)
                    // }else{
                    //     bot_icon_img_urls.push(data.icons[0].preview_url);
                    // }
                }
                else{
                    console.log(err);
                }
             });
        }
    }
}