import consumer from "./consumer"

consumer.subscriptions.create("GameChannel", {
  connected() {
    
  },

  disconnected() {
    console.log("disconnected")
    // Called when the subscription has been terminated by the server
  },


  received(data) {
    console.log("received")
    if (data.content == "create a match")
    {
      consumer.subscriptions.create({channel: "GameChannel", is_matchmaking: data.is_matchmaking, ranked: data.ranked}, {
        connected() {
          console.log("Waiting for opponent 2")
          document.getElementById("users-index").hidden = true;
          document.getElementById("waiting").hidden = false;

        },
        disconnected() {
        // Called when the subscription has been terminated by the server
        },
    
    
        received(data) {
          console.log(data)
          if (data.action === 'game_start') {

            document.getElementById("waiting").append("Found");
          }
        }
      });
    
    }
  }
});
