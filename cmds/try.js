////const Creds = require('../class/login')
//const Restapi = require('../class/rest')
//const Token = require('../class/token')
const doDie = require('../utils/error')
const startSession = require('../cp/login')
const endSession = require('../cp/logout')
module.exports = async (args) => {
	try {
		if (!args._[1]) {
			require('../help/help')(args)
			return
		}
		const cpauth = await startSession(args._[1])
		//await console.log(cpauth)
		const cpend = await endSession(cpauth)
		//await console.log(cpend)
		return cpend

	} catch (err) {
		doDie(err)
	}
}

