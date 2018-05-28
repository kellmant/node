const doLogin = require('../utils/login')
const doLogout = require('../utils/logout')
const doError = require('../utils/error')
const doGrab = require('../cp/commands')
const doSave = require('../msgbus/writefile')

module.exports = async (args) => {
	try {
		const mycmd = '/show-' + args._[0]
		const cpSession = await doLogin()
		const myObjects = await doGrab(mycmd, cpSession)
		await doSave(mycmd, myObjects)
		const myExit = await doLogout(cpSession)
		//await console.log('Session ' + cpSession.uid + ' close: ' + myExit)
	} catch (err) {
		doError(err)
	}
}

