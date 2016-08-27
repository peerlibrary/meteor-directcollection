Package.describe({
  name: 'peerlibrary:directcollection',
  summary: "Blocking MongoDB API for direct/native access to collections",
  version: '0.6.2',
  git: 'https://github.com/peerlibrary/meteor-directcollection.git'
});

Package.on_use(function (api) {
  api.versionsFrom('METEOR@1.4.0.1');

  // Core dependencies.
  api.use([
    'coffeescript',
    'underscore',
    'random',
    'ejson',
    'mongo-livedata'
  ], 'server');

  // 3rd party dependencies.
  api.use([
    'peerlibrary:blocking@0.5.2'
  ], 'server');

  api.export('DirectCollection', 'server');

  api.add_files([
    'direct.coffee'
  ], 'server');
});

Package.on_test(function (api) {
  api.versionsFrom('METEOR@1.4.0.1');

  // Core dependencies.
  api.use([
    'tinytest',
    'test-helpers',
    'coffeescript',
    'underscore',
    'application-configuration'
  ], 'server');

  // Internal dependencies.
  api.use([
    'peerlibrary:directcollection',
  ]);

  api.add_files([
    'tests.coffee'
  ], 'server');
});
