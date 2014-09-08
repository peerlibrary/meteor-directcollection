Package.describe({
  summary: "Blocking MongoDB API for direct/native access to collections",
  version: '0.2.2',
  name: 'mrt:directcollection',
  git: 'https://github.com/peerlibrary/meteor-directcollection.git'
});

Package.on_use(function (api) {
  api.imply('peerlibrary:directcollection@0.2.2');
});
