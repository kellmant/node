const Creds = require('../class/login')
const Rest = require('../class/rest')
const doDie = require('../utils/error')
module.exports = async (args) => {
	try {
		if (!args._[1]) {
			require('../help/help')(args)
			return
		}
		const mycp = new Creds(args._[1])
		const cpauth = await mycp.authme()
		await console.log(cpauth.host)
		await console.log('\n')
	} catch (err) {
		doError(err)
	}
}

