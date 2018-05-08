// etcdget util
//
// get the key/value pairs that will make up our 
// JSON objects
//
const grab = require('./vars')
const Etcd = require('simple-etcd')
const etcd = new Etcd('http://keystore.east1:2379')

//const options = { recursive: true }

module.exports = async (key) => {
	try {
	await etcd.get(key).then((result) => {
	const keyobj = result
	console.log(typeof keyobj)
	return keyobj
	})
	} catch (err) {
		console.error(err)
	}

}
