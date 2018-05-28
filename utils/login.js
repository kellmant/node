const myAuth = require('../utils/auth')
const myToken = require('../utils/token')

module.exports = async () => {
	try {
		const cpAuth = await myAuth()
		const cpToken = await myToken(cpAuth)
		await console.log(cpToken.url)
		await console.log(cpToken.uid)
		return cpToken
	} catch (err) {
		console.error(err)
	}
}

