const setKey = require('../msgbus/setkey')
const msgBus = require('../msgbus/stream')
const myObject = require('../class/object')

module.exports = async (x) => {
	try {
		for (var i in x) {
			for (var j in x[i]) {
				const myObjs = Object.keys(x[i][j]).reduce((p, c) => ({...p, [c]: x[i][j][c]}), {})
				const h = new myObject(myObjs)
				const fnType = h.oftype()
				console.log(fnType)
				const key = h.key()
				const objval = h[`${fnType}`]()
				const vals = JSON.stringify(objval)
				console.log(key + ' => ' + vals)
				//console.log(h)
				setKey(key, vals)
			}
		}
	} catch (err) {
		console.error(err)
	}
}


