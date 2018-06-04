const doLogin = require('../utils/login')
const doLogout = require('../utils/logout')
const doError = require('../utils/error')
const doGrab = require('../cp/commands')
const doProc = require('../proc/apicmd')
const doSave = require('../msgbus/writefile')
const doAlert = require('../msgbus/alertme')

module.exports = async (args) => {
	try {
		//const mycmd = '/show-' + args._[0]
		const myfile = '/' + args._[0]
		const cpSession = await doLogin()
		cpSession.mycmd = await '/show-' + args._[0]
		const myObjects = await doGrab(cpSession)
		const procObj = await doProc(myObjects)
		await doSave(myfile, procObj)
		const myExit = await doLogout(cpSession)
	} catch (err) {
		doError(err)
	}
}

