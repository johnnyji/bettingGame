$(function() {
  var userAmount = 100;
  var restartButton = $(".restart");
  var result = $(".result");
  var form = $("form");
  var wallet = $(".user-amount").children("span");

  updateWallet();
  form.on("submit", function(e) {
    e.preventDefault();
    result.removeClass("win loss");
    var userBet = $(".user-bet").val();
    var userGuess = $(".user-guess").val();
    playGame(parseInt(userBet), parseInt(userGuess));
  });

  function updateWallet() {
    wallet.text("$" + userAmount);
  }

  function playGame(bet, guess) {
    var winningNumber = Math.floor((Math.random() * 10) + 1);
    var offByOne = (Math.abs(winningNumber - guess) ===  1);
    console.log(winningNumber);
    console.log(offByOne);

    if (userAmount <= 0) { userAmount = 0; return gameOver(); }

    if (guess === winningNumber) {
      userAmount += (bet * 2);
      updateWallet();
      result.addClass("win").text("Wow! Awesome guess, you just doubled your bet!");
    } else if (offByOne) {
      result.text("You were only off by one! No balance change");
    } else {
      userAmount -= bet;
      updateWallet();
      result.addClass("loss").text("Wrong! That'll cost you $" + bet);
    }
  }

  function gameOver() {
    result.text("Game Over! You're out of money!");
    form.addClass("hidden");
    restartButton.removeClass("hidden");
    restartButton.on("click", function() {
      window.location.reload();
    });
  }
});