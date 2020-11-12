const { response } = require('express');
const express = require('express')
const app = express();
app.listen(3000, () => console.log('listening at 3000'));

app.use(express.static('public'));
app.use(express.json());
var top_icon_img_urls = [];
var bot_icon_img_urls = {};

var NounProject = require('the-noun-project'),
nounProject = new NounProject({
    key: 'd37f53a4717646c290b616d1499e7988',
    secret: '56779a466caf4070b58998afc64df940'
});

app.post('/api', (request,response) => { 
    for (let i = 0; i < request.body.top_temp_10.length; i++) {
        console.log(request.body.top_temp_10[i]);
        nounProject.getIconsByTerm(request.body.top_temp_10[i], function (err, data) {
            if (!err) {
                console.log(data.icons[1].preview_url);
                top_icon_img_urls.push(data.icons[0].preview_url);
            }
        });
    }
    console.log(top_icon_img_urls);
    response.json({
        status: 'success',
        icon_img: top_icon_img_urls
    });
})