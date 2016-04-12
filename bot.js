console.log('The Bot is Starting');

var Twit = require('twit');

var config = require('./config');

var T = new Twit(config);

var params = {
	q: '@HuntTheBot',
	count: 2
}
T.get('search/tweets', params,gotData);

 function gotData(err, data, response) {
 	var tweets = data.statuses;
 	for (var i = 0; i < tweets.length; i++){
 		 console.log(tweets[i].text);
 	}
}


var stream = T.stream('user');
stream.on('follow', followed);


function followed(eventMsg) {
	var name = eventMsg.source.name;
	var screenName = eventMsg.source.screen_name;
	tweetIt('@' + screenName + ' Thank you for following me. You are my new bestfriend!')
	followBack()
}

//tweetIt();
//setInterval(tweetIt, 1000*60);

/*followBack()
function followBack(eventMsg) {
	T.follow ('friendships/create', follow)
	var follow = screenName
	if (err) {
		console.log("Did Not Follow!");
	  } else {
	    console.log("You followed new person!");
	  }
}
*/
function tweetIt(txt) {

	var r = Math.floor(Math.random()*100);

	var tweet = {
	  status: txt
	}

	T.post('statuses/update', tweet, tweeted);

	function tweeted(err, data, response) {
	  if (err) {
	  	console.log("Something went wwrong!");
	  } else {
	    console.log("It worked!");
	  }
	}
}