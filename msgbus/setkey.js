
const myKeystore = process.env.ETCDCTL_ENDPOINTS
const Etcd = require('node-etcd')
const etcd = new Etcd(myKeystore)

module.exports = (k, v) => {
	return new Promise(function(resolve, reject) {
		etcd.set(k, v, function (err, res) {
			if (err) {
				reject(err)
			} else {
				resolve(res)
			}
		})
	})
}

