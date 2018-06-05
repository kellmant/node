const Creds = require('../class/login')
const Resty = require('../class/rest')
const Token = require('../class/token')
const doDie = require('../utils/error')
module.exports = async (x) => {
	try {
		const sendclose = []
		const myheaders = {}
		sendclose.url = `${x.url}`
		sendclose.cmd = 'logout' 
		myheaders['X-chkp-sid'] = x.sid
		sendclose.data = {}
		await console.log(sendclose)
		const cpend = new Resty(sendclose)
		cpend.headers = myheaders
		await console.log(cpend)
		const endofsess = await cpend.callout(cpend)
		await console.log(endofsess.status + ' : ' + endofsess.statusText)
		await console.log(endofsess.data)
		return endofsess
	} catch (err) {
		doDie(err)
	}
}

