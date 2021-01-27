Server.Views.Posts ||= {}

class Server.Views.Posts.IndexView extends Backbone.View
  template: JST["backbone/templates/posts/index"]

  initialize: () ->
    @collection.bind('reset', @addAll)

  addAll: () =>
    @collection.each(@addOne)

  addOne: (post) =>
    view = new Server.Views.Posts.PostView({model : post})
    @$("tbody").append(view.render().el)

  render: =>
    @$el.html(@template(posts: @collection.toJSON() ))
    @addAll()

    return this
