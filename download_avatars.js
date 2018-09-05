var request = require('request');
var secrets = require('./secrets')
var fs = require('fs');

var args = process.argv.slice(2);

var holder = args[0];

var filePathing = args[1];

if(args[1] == null)


console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoHolder, repoName, cb) {
 var options = {
    url: "https://api.github.com/repos/" + repoHolder + "/" + repoName + "/contributors",
    headers: {
      'Authorization': "token " + secrets.GITHUB_TOKEN,
      'User-Agent': 'request'
    }
  };

  request(options, function(err, res, body) {
    if(err) {
      return cb(err, null);
    } else {
      var data = JSON.parse(body);
      console.log(data);
      cb(null, data)

    }


   });
}


getRepoContributors(holder, filePathing, function(err, result) {
  if(err){
    console.log("Errors:", err);
  } else {
    result.forEach(function(item) {
      console.log(item);
      let pathing = "avatars/" + item.login + ".jpeg";
      let item_url = item.avatar_url;
      downloadImageByURL(item_url, pathing);
    })
  }
});



function downloadImageByURL(url, filePath) {

  console.log("filePath:", filePath);
  console.log('Downloading image...');

  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream(filePath));
       console.log('Download complete.');
  // ...
}