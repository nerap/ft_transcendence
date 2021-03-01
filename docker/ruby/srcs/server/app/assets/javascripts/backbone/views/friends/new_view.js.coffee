Server.Views.Friends ||= {}

class Server.Views.Friends.NewView extends Backbone.View
  template: JST["backbone/templates/friends/new"]

  events:
    "submit #new-friend": "save"

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
      success: (friend) =>
        @model = friend
        window.location.hash = "/#{@model.id}"

      error: (friend, jqXHR) =>
        @model.set({errors: $.parseJSON(jqXHR.responseText)})
    )

  render: ->
    @$el.html(@template(@model.toJSON() ))

    this.$("form").backboneLink(@model)

    return this
