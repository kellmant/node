const doLogin = require('../utils/login')
const doLogout = require('../utils/logout')
const doError = require('../utils/error')
const doGrab = require('../cp/showobjects')
const doAlert = require('../msgbus/alertme')
const doSave = require('../msgbus/writefile')
const msgBus = require('../msgbus/stream')
const doParse = require('../proc/cpdata')

module.exports = async (args) => {
	try {
		if (!args._[1]) {
			require('../help/help')(args)
			return
		}
		const cpSession = await doLogin()
		await msgBus('Login', cpSession)
		const mycmd = '/' + args._[0] + '-' + args._[1]
		const myObjects = await doGrab(mycmd, cpSession)
		await msgBus(mycmd, cpSession)
		const parsedObj = await doParse(myObjects)
		await doSave(mycmd, parsedObj)
		await console.log (typeof parsedObj)
		const myExit = await doLogout(cpSession)
		await msgBus('Logout', cpSession)
		await console.log('\n')
	} catch (err) {
		doError(err)
	}
}

