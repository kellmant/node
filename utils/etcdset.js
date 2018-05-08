// exporting a set function for the keystore
// will be generically called to add keys as 
// an imported function using es6 async
// requires the key location and value
const Etcd = require('node-etcd')
const etcdstate = new Etcd('http://keystore.toonces:2379')

module.exports = async (key, value) => {
	await etcdstate.set(key, value) 
	return 
}
