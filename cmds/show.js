const doLogin = require('../utils/login')
const doLogout = require('../utils/logout')
const doError = require('../utils/error')
const doGrab = require('../cp/showobjects')
const doSave = require('../msgbus/writefile')

module.exports = async (args) => {
	try {
		if (!args._[1]) {
			require('../help/help')(args)
			return
		}
		const mycmd = '/' + args._[0] + '-' + args._[1]
		const cpSession = await doLogin()
		const myObjects = await doGrab(mycmd, cpSession)
		await doSave(mycmd, myObjects)
		const myExit = await doLogout(cpSession)
		//await console.log('Session ' + cpSession.uid + ' close: ' + myExit)
	} catch (err) {
		doError(err)
	}
}

