//const util = require('util')

module.exports = async (x) => {
	try {
		//let newObj = await Object.assign(...Object.entries(x).map(([k, v]) => ({[k]: v})));
		let newObj = []
		for (var i in x) {
			if (typeof(x[i])=='object')
			newObj.push(Object.keys(x[i]).reduce((p, c) => ({...p, [c]: x[i][c]}), {}))
		}
		return newObj
	} catch (err) {
		console.error(err)
	}
}


