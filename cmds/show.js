const doLogin = require('../utils/login')
const doLogout = require('../utils/logout')
const doError = require('../utils/error')
const doGrab = require('../cp/showobjects')
const doAlert = require('../msgbus/alertme')
const doSave = require('../msgbus/writefile')
const msgBus = require('../msgbus/stream')
const doParse = require('../proc/data')

module.exports = async (args) => {
	try {
		if (!args._[1]) {
			require('../help/help')(args)
			return
		}
		const cpSession = await doLogin()
		if (args._[1] == 'objects') {
			cpSession.mycmd = await '/' + args._[0] + '-hosts'
			const myHosts = await doGrab(cpSession)
			cpSession.mycmd = await '/' + args._[0] + '-networks'
			const myNets = await doGrab(cpSession)
			cpSession.mycmd = await '/' + args._[0] + '-groups'
			const myGroups = await doGrab(cpSession)
		} else {
			cpSession.mycmd = await '/' + args._[0] + '-' + args._[1]
			const myObjects = await doGrab(cpSession)
			const parsedObj = await doParse(myObjects)
			await doSave(cpSession.mycmd, parsedObj)
		}
		const myExit = await doLogout(cpSession)
		await console.log('\n')
	} catch (err) {
		doError(err)
	}
}

