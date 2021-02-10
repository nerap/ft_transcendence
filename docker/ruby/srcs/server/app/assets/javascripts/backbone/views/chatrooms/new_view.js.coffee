Server.Views.Chatrooms ||= {}

class Server.Views.Chatrooms.NewView extends Backbone.View
  template: JST["backbone/templates/chatrooms/new"]

  events:
    "submit #new-chatroom": "save"

  constructor: (options) ->
    super(options)
    @model = new @collection.model()

    @model.bind("change:errors", () =>
      this.render()
    )

  save: (e) ->
    e.preventDefault()
    e.stopPropagation()

    @model.unset("errors")

    @collection.create(@model.toJSON(),
      success: (chatroom) =>
        @model = chatroom
        window.location.hash = "/#{@model.id}"

      error: (chatroom, jqXHR) =>
        @model.set({errors: $.parseJSON(jqXHR.responseText)})
    )

  render: ->
    @$el.html(@template(@model.toJSON() ))

    this.$("form").backboneLink(@model)

    return this
