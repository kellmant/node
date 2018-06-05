const Creds = require('../class/login')
const Restapi = require('../class/rest')
const Token = require('../class/token')
const doDie = require('../utils/error')
module.exports = async (x) => {
	try {
		const mycp = new Creds(x)
		const cpauth = await mycp.authme()
		const cplogin = await new Restapi(cpauth)
		//await console.log(cpauth)
		//await console.log(cplogin)
		let apiRes = await cplogin.callout(cplogin)
		await console.log(apiRes.config.url)
		await console.log(apiRes.status + ' : ' + apiRes.statusText)
		const cpId = await new Token(apiRes.data)
		return cpId
	} catch (err) {
		doDie(err)
	}
}

