Server.Views.Chatrooms ||= {}

class Server.Views.Chatrooms.EditView extends Backbone.View
  template: JST["backbone/templates/chatrooms/edit"]

  events:
    "submit #edit-chatroom": "update"

  update: (e) ->
    e.preventDefault()
    e.stopPropagation()

    @model.save(null,
      success: (chatroom) =>
        @model = chatroom
        window.location.hash = "/#{@model.id}"
    )

  render: ->
    @$el.html(@template(@model.toJSON() ))

    this.$("form").backboneLink(@model)

    return this
