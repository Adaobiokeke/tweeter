// Fake data taken from initial-tweets.json
const tweetData = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

$(document).ready(function () {
  // to display the write tweet form

  $("#click-towrite").click(function () {
    $("#myForm").show();
  });

  // To fetch all the tweet in the server

  const loadTweets = function () {
    $.get("/tweets/", function (serverTweets) {
      renderTweet(serverTweets.reverse()); //the reverse() is to list the last tweet first
    });
  };
  loadTweets();

  //declaring error message css classes
  $(".error-div2").hide();
  $(".error-div1").hide();

  // To Post a new tweet
  const $button = $("#click-submit");
  let inputValue = document.getElementById("tweet-text");
  $button.on("click", function (event) {
    event.preventDefault();
    $(".error-div1").slideUp("slow");
    $(".error-div2").slideUp("slow");
    if (inputValue.value === "") {
      $(".error-div2").show();
      return;
    }
    if (inputValue.value.length > 140) {
      $(".error-div1").show();
      return;
    }

    //serialize the form data
    let data = $button.serialize();

    $.ajax({
      type: "POST",
      url: "/tweets",
      data: {
        text: inputValue.value,
      },
      success: function () {
        inputValue.value = "";
        loadTweets();
        window.location.reload();
      },
    });
  });

  function renderTweet(tweetDatas) {
    for (let tweetData of tweetDatas) {
      let userData = `<div class="tweet">
        <section id="tweet-container">
        <header id="header">
          <div class="img-email-div">
            <div class="img-div">
              <img class="avartar" src=${tweetData.user.avatars} />
              <span class="name">${tweetData.user.name}</span>
            </div>
            <div class="email-div">
              <p>${tweetData.user.handle}</p>
            </div>
          </div>
          <div type="text" name="text" id="tweet-text">
            <article>
             ${tweetData.content.text}
            </article>
          </div>
        </header>
        <footer>
          <div class="footer-div">
          <div class='time-container'>${timeago.format(
            tweetData.created_at
          )}</div>
          <div class='empty'></div>
          <div class="icons">
            <i class="fas fa-retweet"></i>
            <i class="far fa-heart"></i>
          </div>
            <div>
        </footer>
      </section>
              </div>`;

      $("#parent-container").append(userData);
    }
  }
});
