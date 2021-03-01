Server.Views.Chatrooms ||= {}

class Server.Views.Chatrooms.IndexView extends Backbone.View
  template: JST["backbone/templates/chatrooms/index"]

  initialize: () ->
    @collection.bind('reset', @addAll)

  addAll: () =>
    @collection.each(@addOne)

  addOne: (chatroom) =>
    view = new Server.Views.Chatrooms.ChatroomView({model : chatroom})
    @$("tbody").append(view.render().el)

  render: =>
    @$el.html(@template(chatrooms: @collection.toJSON() ))
    @addAll()

    return this
