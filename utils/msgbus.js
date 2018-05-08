module.exports = (message, exit) => {
	console.error(message)
	console.log('ERROR function called')
	exit && process.exit(1)
}


