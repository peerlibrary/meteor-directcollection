Package.describe({
  name: 'peerlibrary:directcollection',
  summary: "Blocking MongoDB API for direct/native access to collections",
  version: '0.8.0',
  git: 'https://github.com/peerlibrary/meteor-directcollection.git'
});

Package.on_use(function (api) {
  api.versionsFrom('METEOR@1.4.4.5');

  // Core dependencies.
  api.use([
    'coffeescript@2.0.3_3',
    'ecmascript',
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

  api.mainModule('direct.coffee', 'server');
});

Package.on_test(function (api) {
  api.versionsFrom('METEOR@1.4.4.5');

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
    'peerlibrary:directcollection'
  ]);

  api.addFiles([
    'tests.coffee'
  ], 'server');
});
