// Uses request library: https://github.com/request/request
var request = require('request');

var BASE_URL = 'https://api.groupme.com/v3';
var GROUP_ID = '6416122';
var TOKEN = 'szQEOMWTFW4gxhB9Wh3rh6bBmXxq9AUPEn7zOCr0';
var comment_URL = BASE_URL + '/groups/:' + GROUP_ID + '/likes?period=<month>&token='+ TOKEN;
var post_URL = BASE_URL + '/groups/:' + GROUP_ID + '/update';
var message = '';
var body = '';

request.get('https://api.groupme.com/v3/groups/6416122/likes?period=month&token=szQEOMWTFW4gxhB9Wh3rh6bBmXxq9AUPEn7zOCr0')
  .on('response', function(response) {
    console.log(response.statusCode) // 200
    console.log(response.headers['content-type']) // 'image/png'
    response.on('data', function(chunk) {
    	body += chunk;
    });
    response.on('end', function() {
    	var json = JSON.parse(body);
    	var messages = json.response.messages;
    	for (var i = 0; i < messages.length; i++) {
    		if((messages[i].attachments.length == 0) && (messages[i].text.length < 40)) {
    			message = messages[i].text;
    			break;
    		}
    	}
    	
    });
    request.post(post_URL, {
    	"name": message,
  		"share": true,
  		"image_url": "http://i.groupme.com/960x640.jpeg.f0a286cbcff74417bdba2cef62aa90b7 ",
  		"office_mode": true
  	}, function(error, response, body) {
  		if(!error && response.statusCode == 200) {
  			console.log(body);
  		}
  	});
  })
  .pipe(request.put('http://mysite.com/img.png'));