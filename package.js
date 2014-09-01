Package.describe({
  summary: "Blocking MongoDB API for direct/native access to collections"
});

Package.on_use(function (api) {
  api.use(['coffeescript', 'underscore', 'random', 'blocking', 'ejson', 'mongo-livedata'], 'server');

  api.export('DirectCollection');

  api.add_files([
    'direct.coffee'
  ], 'server');
});

Package.on_test(function (api) {
  api.use(['directcollection', 'tinytest', 'test-helpers', 'coffeescript', 'underscore'], 'server');

  api.add_files([
    'tests.coffee'
  ], 'server');
});
