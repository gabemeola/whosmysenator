require('dotenv').config()

import Twit from 'twit';
import findSenator from './findSenator';

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

// api.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
//   console.log(data)
// })

// api.get('statuses/mentions_timeline')
//   .then((res) => {
//     console.log(JSON.stringify(res.data, null, 2));
//   })

api.stream('statuses/filter', { track: '@whosmysenator' })
  .on('tweet', (tweet) => {
    console.log(JSON.stringify(tweet, null, 2));
    console.log()
    console.log()

    // Favorite Tweet
    api.post('favorites/create', { id: tweet.id_str })
      .then(({ data }) => {
        console.log('favorite res:', JSON.stringify(data, null, 2));
        console.log()
        console.log()
      })

    // Reply to the tweeter
    api.post('statuses/update', {
      auto_populate_reply_metadata: true,
      in_reply_to_status_id: tweet.id_str,
      status: 'Booting up bot... mainframe.'
    })
    .then(({ data }) => {
      console.log('reply res:', JSON.stringify(data, null, 2));
      console.log()
      console.log()
    })
  })

console.log(findSenator('utah'))
