Future = Npm.require 'fibers/future'

class DirectCollection
  connections = {}

  constructor: (@name, @_makeNewID, @_databaseUrl) ->
    unless @_makeNewID
      @_makeNewID = -> Random.id()

  findToArray: (selector, options) =>
    options = {} unless options
    cursor = @_getCollection().find(selector, options)
    blocking(cursor, cursor.toArray)()

  findEach: (selector, options, eachCallback) =>
    if _.isFunction options
      eachCallback = options
      options = {}
    options = {} unless options

    future = new Future()

    callback = (error, document) =>
      # An error might be thrown from the eachCallback, so we skip the rest
      return if future.isResolved()

      if error
        future.throw error
      else if document
        eachCallback document
      else
        future.return()

    errorHandler = (error) =>
      future.throw error if error and not future.isResolved()

    callback = Meteor.bindEnvironment callback, errorHandler, @

    @_getCollection().find(selector, options).each(callback)

    future.wait()
    return

  count: (selector, options) =>
    options = {} unless options
    collection = @_getCollection()
    blocking(collection, collection.count)(selector, options)

  findOne: (selector, options) =>
    options = {} unless options
    collection = @_getCollection()
    blocking(collection, collection.findOne)(selector, options)

  insert: (document) =>
    unless '_id' of document
      document = EJSON.clone document
      document._id = @_makeNewID()
    collection = @_getCollection()
    blocking(collection, collection.insert)(document, w: 1)
    return document._id

  update: (selector, modifier, options) =>
    options = {} unless options
    options.w ?= 1
    collection = @_getCollection()
    blocking(collection, collection.update)(selector, modifier, options)

  remove: (selector) =>
    collection = @_getCollection()
    blocking(collection, collection.remove)(selector, w: 1)

  renameCollection: (newName, options) =>
    options = {} unless options
    collection = @_getCollection()
    blocking(collection, collection.rename)(newName, options)

  findAndModify: (selector, sort, document, options) =>
    options = {} unless options
    options.w ?= 1
    collection = @_getCollection()
    blocking(collection, collection.findAndModify)(selector, sort, document, options)

  @_getConnection: (databaseUrl) ->
    if databaseUrl?
      if not connections[databaseUrl]
        connections[databaseUrl] = new MongoInternals.RemoteCollectionDriver databaseUrl, {}

      connections[databaseUrl]
    else
      MongoInternals.defaultRemoteCollectionDriver()

  _getCollection: =>
    @constructor._getConnection(@_databaseUrl).mongo._getCollection @name

  @_getDb: (databaseUrl) ->
    future = new Future()
    @_getConnection(databaseUrl).mongo._withDb (db) ->
      future.return db
    future.wait()

  @command: (selector, options, databaseUrl) ->
    options = {} unless options
    db = @_getDb databaseUrl
    blocking(db, db.command)(selector, options)
