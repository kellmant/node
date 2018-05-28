const doLogin = require('../utils/login')
const doLogout = require('../utils/logout')
const doError = require('../utils/error')
const doGrab = require('../cp/showobjects')
const doAlert = require('../msgbus/alertme')
const doSave = require('../msgbus/writefile')
const doParse = require('../proc/cpdump')

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
		//await doParse(myObjects, cpSession)
		await console.log(typeof myObjects)
		const myExit = await doLogout(cpSession)
		//await doAlert('Session close', cpSession)
		await console.log('\n')
	} catch (err) {
		doError(err)
	}
}

