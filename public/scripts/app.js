

$(document).ready(function(){

  loadTweets()
  let textField
  let form = $('#container-form');
  form.on('submit', function(event) {

    event.preventDefault();

      if (document.getElementById("textTweet").value == '') {
      alert("The text area was left blank.");
    } if (document.getElementById("textTweet").value.length > 140) {
      alert("Can only submit upto 140 characters.")
    } if (document.getElementById("textTweet").value == " "){
      $('#textTweet').val('');
      alert("Can't post blank spaces.")
    }

    $.ajax('/tweets', {method: "post", data: $('#textTweet')})
    .then((result) =>{
      $('#tweets-container').empty();
      $('.counter').text(140);
      loadTweets()
      $('#container-form').children('#textTweet').val('')

    })
    .fail((error) => console.error(error))
  })

  $("#compose").click(function() {
    $(".new-tweet").toggle("slow")
    $("#textTweet").focus()
    $(".new-tweet").css('visibility', 'visible')
  })


  function loadTweets() {
    $.getJSON('/tweets')
    .then((data) => renderTweets(data))
  }


  function renderTweets (data) {
    $container = $('#tweets-container')
    data.forEach(function(tweet){
      let $tweet = createTweetElement(tweet)
      $container.prepend($tweet)
    });
  }

  function createTweetElement(tweet) {
    let name = tweet.user.name;
    let avatarSmall = tweet.user.avatars.small;
    let avatarReg = tweet.user.avatars.regular;
    let avatarLarge = tweet.user.avatars.large;
    let handle = tweet.user.handle;
    let content = tweet.content.text;
    let time = $.timeago(tweet.created_at);

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
                      <time>${time}</time>
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
