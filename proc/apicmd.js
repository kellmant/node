//const util = require('util')
const setKey = require('../msgbus/setkey')

module.exports = async (x) => {
	try {
		let newCmds = []
		for (var i in x) {
			for (var j in x[i]) {
				var myObjs = Object.keys(x[i][j]).reduce((p, c) => ({...p, [c]: x[i][j][c]}), {})
				newCmds.push(myObjs)
				const mycmd = myObjs.name.split('-')
				const precmd = mycmd[0]
				const postcmds = mycmd.slice(1, mycmd.length)
				const postcmd = postcmds.join('-')
				if (postcmd || myObjs.description != null) {
					const mykey = 'api/' + precmd + '/' + postcmd
					const myval = myObjs.description
					setKey(mykey, myval)
				}

			}
		}
		return newCmds
	} catch (err) {
		console.error(err)
	}
}


