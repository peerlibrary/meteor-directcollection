Package.describe({
  name: 'peerlibrary:directcollection',
  summary: "Blocking MongoDB API for direct/native access to collections",
  version: '0.9.0',
  git: 'https://github.com/peerlibrary/meteor-directcollection.git'
});

Package.on_use(function (api) {
  api.versionsFrom('METEOR@1.8.1');

  // Core dependencies.
  api.use([
    'coffeescript@2.4.1',
    'ecmascript',
    'underscore',
    'random',
    'ejson',
    'mongo-livedata'
  ], 'server');

  // 3rd party dependencies.
  api.use([
    'peerlibrary:blocking@0.6.0'
  ], 'server');

  api.export('DirectCollection', 'server');

  api.mainModule('direct.coffee', 'server');
});

Package.on_test(function (api) {
  api.versionsFrom('METEOR@1.8.1');

  // Core dependencies.
  api.use([
    'tinytest',
    'test-helpers',
    'coffeescript@2.4.1',
    'underscore',
    'application-configuration'
  ], 'server');

  // Internal dependencies.
  api.use([
    'peerlibrary:directcollection'
  ]);

  api.addFiles([
    'tests.coffee'
  ], 'server');
});
