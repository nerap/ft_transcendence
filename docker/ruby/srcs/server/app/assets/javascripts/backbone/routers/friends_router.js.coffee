class Server.Routers.FriendsRouter extends Backbone.Router
  initialize: (options) ->
    @friends = new Server.Collections.FriendsCollection()
    @friends.reset options.friends

  routes:
    "new"      : "newFriend"
    "index"    : "index"
    ":id/edit" : "edit"
    ":id"      : "show"
    ".*"        : "index"

  newFriend: ->
    @view = new Server.Views.Friends.NewView(collection: @friends)
    $("#friends").html(@view.render().el)

  index: ->
    @view = new Server.Views.Friends.IndexView(collection: @friends)
    $("#friends").html(@view.render().el)

  show: (id) ->
    friend = @friends.get(id)

    @view = new Server.Views.Friends.ShowView(model: friend)
    $("#friends").html(@view.render().el)

  edit: (id) ->
    friend = @friends.get(id)

    @view = new Server.Views.Friends.EditView(model: friend)
    $("#friends").html(@view.render().el)
