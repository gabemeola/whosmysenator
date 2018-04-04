require('dotenv').config()

const Twit = require('twit');

const {
  CONSUMER_KEY,
  CONSUMER_SECRET,
  ACCESS_TOKEN,
  ACCESS_TOKEN_SECRET,
} = process.env;

const api = new Twit({
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  access_token: ACCESS_TOKEN,
  access_token_secret: ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
})

api.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
  console.log(data)
})