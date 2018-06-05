const doLogin = require('../utils/login')
const doLogout = require('../utils/logout')
const doError = require('../utils/error')
const doGrab = require('../cp/getobj')
const doAlert = require('../msgbus/alertme')
const doSave = require('../msgbus/writefile')
const msgBus = require('../msgbus/stream')
const doAsync = require('../proc/runasync')

module.exports = async (args) => {
	try {
		if (!args._[1]) {
			require('../help/help')(args)
			return
		}
		const cpSession = await doLogin()
		if (args._[1] == 'all') {
			const show = {
				objects: 'show-objects'
				//hosts: 'show-hosts',
				//nets: 'show-networks',
				//groups: 'show-groups',
				//seczones: 'show-security-zones'
				//layers: 'show-access-layers',
				//tags: 'show-tags',
				//gws: 'show-simple-gateways'
			}

			for (var i in show) {
				//console.log(show[i])
				cpSession.mycmd = '/' + show[i]
				await doGrab(cpSession)
			}
		}
		const myExit = await doLogout(cpSession)
		await console.log('\n')
	} catch (err) {
		doError(err)
	}
}

