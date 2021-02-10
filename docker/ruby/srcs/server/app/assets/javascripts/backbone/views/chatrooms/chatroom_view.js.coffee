Server.Views.Chatrooms ||= {}

class Server.Views.Chatrooms.ChatroomView extends Backbone.View
  template: JST["backbone/templates/chatrooms/chatroom"]

  events:
    "click .destroy" : "destroy"

  tagName: "tr"

  destroy: () ->
    @model.destroy()
    this.remove()

    return false

  render: ->
    @$el.html(@template(@model.toJSON() ))
    return this
