class Server.Routers.ChatroomsRouter extends Backbone.Router
  initialize: (options) ->
    @chatrooms = new Server.Collections.ChatroomsCollection()
    @chatrooms.reset options.chatrooms

  routes:
    "new"      : "newChatroom"
    "index"    : "index"
    ":id/edit" : "edit"
    ":id"      : "show"
    ".*"        : "index"

  newChatroom: ->
    @view = new Server.Views.Chatrooms.NewView(collection: @chatrooms)
    $("#chatrooms").html(@view.render().el)

  index: ->
    @view = new Server.Views.Chatrooms.IndexView(collection: @chatrooms)
    $("#chatrooms").html(@view.render().el)

  show: (id) ->
    chatroom = @chatrooms.get(id)

    @view = new Server.Views.Chatrooms.ShowView(model: chatroom)
    $("#chatrooms").html(@view.render().el)

  edit: (id) ->
    chatroom = @chatrooms.get(id)

    @view = new Server.Views.Chatrooms.EditView(model: chatroom)
    $("#chatrooms").html(@view.render().el)
