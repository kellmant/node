// local keystore functions
//
const myKeystore = process.env.ETCDCTL_ENDPOINTS
const Etcd = require('node-etcd')
const etcd = new Etcd(myKeystore)


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


