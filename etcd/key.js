const Etcd = require('node-etcd')


module.exports = (x) => {
	const etcd = new Etcd('http://keystore.east1:2379')
	return new Promise(function(resolve, reject) {
		etcd.get(x, function (err, res) {
			if (err) {
				reject(err)
			} else {
				resolve(res.node.value)
			}
		})
	})
}


