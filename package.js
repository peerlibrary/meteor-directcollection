Package.describe({
  summary: "Blocking MongoDB API for direct/native access to collections",
  version: '0.5.0',
  name: 'peerlibrary:directcollection',
  git: 'https://github.com/peerlibrary/meteor-directcollection.git'
});

Package.on_use(function (api) {
  api.versionsFrom('METEOR@1.0.3.2');
  api.use(['coffeescript', 'underscore', 'random', 'peerlibrary:blocking@0.5.2', 'ejson', 'mongo-livedata'], 'server');

  api.export('DirectCollection');

  api.add_files([
    'direct.coffee'
  ], 'server');
});

Package.on_test(function (api) {
  api.use(['peerlibrary:directcollection', 'tinytest', 'test-helpers', 'coffeescript', 'underscore', 'application-configuration'], 'server');

  api.add_files([
    'tests.coffee'
  ], 'server');
});
