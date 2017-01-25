
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 // var data = [
 //  {
 //    "user": {
 //      "name": "Newton",
 //      "avatars": {
 //        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
 //        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
 //        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
 //      },
 //      "handle": "@SirIsaac"
 //    },
 //    "content": {
 //      "text": "If I have seen further it is by standing on the shoulders of giants"
 //    },
 //    "created_at": 1461116232227
 //  },
 //  {
 //    "user": {
 //      "name": "Descartes",
 //      "avatars": {
 //        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
 //        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
 //        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
 //      },
 //      "handle": "@rd" },
 //    "content": {
 //      "text": "Je pense , donc je suis"
 //    },
 //    "created_at": 1461113959088
 //  },
 //  {
 //    "user": {
 //      "name": "Johann von Goethe",
 //      "avatars": {
 //        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
 //        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
 //        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
 //      },
 //      "handle": "@johann49"
 //    },
 //    "content": {
 //      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
 //    },
 //    "created_at": 1461113796368
 //  }

$(document).ready(function(){
  fetchTweets()
  let textField
  let form = $('#container-form');
  form.on('submit', function(event) {
    event.preventDefault();
    $('#tweets-container').empty();
    $.ajax('/tweets', {method: "post", data: $('#textTweet')})
    .then((result) =>{
      fetchTweets()
    })
    .fail((error) => console.error(error))
  })

  //     .then((result) => {
  //       fetchTweets()
  //   })
  //     .fail((error) => console.error(error))
  // })




function fetchTweets() {
  $.getJSON('/tweets')
  .then((data) => renderTweets(data))
}


function renderTweets (data) {
  $container = $('#tweets-container')
  data.forEach(function(tweet){
    let $tweet = createTweetElement(tweet)
    $container.append($tweet)
  });
}

function createTweetElement(tweet) {
  let name = tweet.user.name;
  let avatarSmall = tweet.user.avatars.small;
  let avatarReg = tweet.user.avatars.regular;
  let avatarLarge = tweet.user.avatars.large;
  let handle = tweet.user.handle;
  let content = tweet.content.text;
  let time = tweet.created_at;

  let html =
              ` <article class="single-tweet">
                  <header>
                    <img class="logo" src=${avatarSmall}>
                    <h1> ${name} </h1>
                    <h4> ${handle} </h4>
                  </header>
                <article class="tweet">
                  <i name="text"> ${content} </i>
                </article>
                <footer>
                  <div class="date">
                    <time datetime="2017-01-24 13:45">${time}</time>
                    <div class="icons">
                      <i class="fa fa-flag" aria-hidden="true"></i>
                      <i class="fa fa-retweet" aria-hidden="true"></i>
                      <i class="fa fa-heart" aria-hidden="true"></i>
                    </div>
                  </div>
                </footer>
              </article>`

  return html;
}

})



