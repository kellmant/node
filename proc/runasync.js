const doError = require('../utils/error')
const doGrab = require('../cp/showobjects')
const doSave = require('../msgbus/writefile')
const doParse = require('../proc/data')

module.exports = async (cpEvent, cmd) => {
	try {
		cpEvent.mycmd = '/' + cmd
		let myObjects = await doGrab(cpEvent)
		//let parsedObj = await doParse(myObjects)
		//await doSave('/' + cmd, parsedObj)
		process.stdout.write(' \n')
		return 
	} catch (err) {
		doError(err)
	}
}

