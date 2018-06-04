//const util = require('util')

module.exports = async (x) => {
	try {
		let newObj = []
		for (var i in x) {
			newObj.push(Object.keys(x[i]).reduce((p, c) => ({...p, [c]: x[i][c]}), {}))
		}
		return newObj
	} catch (err) {
		console.error(err)
	}
}


