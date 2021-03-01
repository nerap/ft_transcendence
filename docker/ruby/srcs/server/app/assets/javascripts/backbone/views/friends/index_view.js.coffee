Server.Views.Friends ||= {}

class Server.Views.Friends.IndexView extends Backbone.View
  template: JST["backbone/templates/friends/index"]

  initialize: () ->
    @collection.bind('reset', @addAll)

  addAll: () =>
    @collection.each(@addOne)

  addOne: (friend) =>
    view = new Server.Views.Friends.FriendView({model : friend})
    @$("tbody").append(view.render().el)

  render: =>
    @$el.html(@template(friends: @collection.toJSON() ))
    @addAll()

    return this
