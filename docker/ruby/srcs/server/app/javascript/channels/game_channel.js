import consumer from "./consumer"


let game;

consumer.subscriptions.create("GameChannel", {
  connected() {
    
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },


  received(data) {
    console.log(data.content)
    if (data.content == "create a match")
    {
      game = consumer.subscriptions.create({channel: "GameChannel", is_matchmaking: data.is_matchmaking, ranked: data.ranked}, {
        connected() {
          console.log("Waiting for opponent 2")
          document.getElementById("users-index").hidden = true;
          document.getElementById("waiting").hidden = false;
          document.getElementById("found").hidden = true;

        },
        disconnected() {
          console.log("disconnected matchmaking")
          game_perform();
        },
    
    
        received(data) {
          console.log(data)
          if (data.action === 'game_start') {
            document.getElementById("found").hidden = false;
            document.getElementById("waiting").hidden = true;
          }
        }
      });
    }
    else if (data.content == "disconnected")
    {
      console.log("data.content = disconnected")
      if (game)
      {
        consumer.subscriptions.remove(game)
        game = null
        document.getElementById("users-index").hidden = false;
        document.getElementById("waiting").hidden = true;
        document.getElementById("found").hidden = true;
      }
    }
  }
});

function game_perform()
{
  game.perform("disconnected", {player_email: Transcendence.current_user.toJSON().email})
  console.log("perform")
  return ;
}
