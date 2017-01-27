"use strict";
const MongoClient = require("mongodb").MongoClient;

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");


// function makeDataHelpers(db)


// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = (db) => {
  const tweets = db.collection("tweets");
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        // db.tweets.push(newTweet);
        tweets.insertOne(newTweet);
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      tweets.find({}).toArray(callback);
    }

  };
}
