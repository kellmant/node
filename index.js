const minimist = require('minimist')
const error = require('./utils/error')

module.exports = () => {
	const args = minimist(process.argv.slice(2))

	let cmd = args._[0] || 'help'

	if (args.version || args.v) {
		cmd = 'version'
	}

	if (args.help || args.h) {
		cmd = 'help'
	}

	if (args.login) {
		cmd = 'login'
	}

	if (args.logout) {
		cmd = 'logout'
	}

	if (args.cpapi) {
		cmd = 'cpapi'
	}

	if (args.api) {
		cmd = 'api'
	}



	switch (cmd) {
		case 'today':
			require('./cmds/today')(args)
				break

		case 'login':
			require('./cmds/login')(args)
				break

		case 'logout':
			require('./cmds/logout')(args)
				break

		case 'cpapi':
			require('./cmds/cpapi')(args)
				break

		case 'api':
			require('./cmds/api')(args)
				break

		case 'version':
			require('./cmds/version')(args)
				break

		case 'help':
			require('./cmds/help')(args)
				break

		default:
			error(`"${cmd}" is not a valid control command`, true)
				break
	}
}

