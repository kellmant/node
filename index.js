const minimist = require('minimist')
const error = require('./utils/error')
console.log('\n')

module.exports = () => {
	const args = minimist(process.argv.slice(2))

	let cmd = args._[0] || 'help'

	if (args.version || args.v) {
		cmd = 'version'
	}

	if (args.help || args.h) {
		cmd = 'help'
	}

	if (args.show) {
		cmd = 'show'
	}

	if (args.commands) {
		cmd = 'commands'
	}

	if (args.backup) {
		cmd = 'backup'
	}

	if (args.try) {
		cmd = 'try'
	}



	switch (cmd) {
		case 'show':
			require('./cmds/show')(args)
				break

		case 'backup':
			require('./cmds/backup')(args)
				break

		case 'commands':
			require('./cmds/commands')(args)
				break

		case 'version':
			require('./help/version')(args)
				break

		case 'showhelp':
			require('./help/help')(args)
				break

		case 'help':
			require('./help/help')(args)
				break

		case 'try':
			require('./cmds/try')(args)
				break
		default:
			error(`"${cmd}" is not a valid control command`, true)
			require('./cmds/help')(args)
				break
	}
}

