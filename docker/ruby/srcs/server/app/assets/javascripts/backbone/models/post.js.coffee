class Server.Models.Post extends Backbone.Model
  paramRoot: 'post'

  defaults:
    title: null
    content: null

class Server.Collections.PostsCollection extends Backbone.Collection
  model: Server.Models.Post
  url: '/posts'
