//const util = require('util')

module.exports = async (x) => {
	try {
		let newObj = []
		for (i=0 ; i < x.commands.length ; i++) {
			if (x.commands[i].name) {
				newObj.push(x.commands[i].name[x.commands[i].description])
			}
		}
		return newObj
	} catch (err) {
		console.error(err)
	}
}


