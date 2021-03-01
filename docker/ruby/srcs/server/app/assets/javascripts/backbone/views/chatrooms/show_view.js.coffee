Server.Views.Chatrooms ||= {}

class Server.Views.Chatrooms.ShowView extends Backbone.View
  template: JST["backbone/templates/chatrooms/show"]

  render: ->
    @$el.html(@template(@model.toJSON() ))
    return this
