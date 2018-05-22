const Etcd = require('node-etcd')
const etcd = new Etcd('http://keystore.toonces:2379')
console.dir(Object.keys(require('./vars')));
