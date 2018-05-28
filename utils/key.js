process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const Etcd = require('node-etcd')
const etcd = new Etcd('http://keystore.east1:2379')


module.exports = (k) => {
	return new Promise(function(resolve, reject) {
		etcd.get(k, function (err, res) {
			if (err) {
				reject(err)
			} else {
				resolve(res.node.value)
			}
		})
	})
}


