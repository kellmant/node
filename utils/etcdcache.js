
const grab = require('./vars')
const Etcd = require('node-etcd')
const etcd = new Etcd('http://keystore.toonces:2379')
const etcdObject = require('etcd-result-objectify')
const options = { recursive: true }

module.exports = (key, options) => {
	return new Promise(function(resolve, reject) {
	etcd.get(key, options, function(err, response) {
		if (err) {
			reject(err)
		} else {
			resolve(response.node)
		}
		})
	})
}
