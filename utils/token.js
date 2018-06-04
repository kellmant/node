process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const myBus = require('../msgbus/stream')
const getToken = require('./callapi')

// baseURL: 'https://host/web_api'
// url: /login,
// data: { 'user': cpCred.admin, 'password': cpCred.pass }
//

module.exports = async (cpCred) => {
	try {
		const cpCall = {
			method: 'post',
			baseURL: 'https://' + cpCred.host + '/web_api',
			url: '/login',
			data: { 'user': cpCred.admin, 'password': cpCred.pass }
		}
		var cpToken = await getToken(cpCall)
		cpToken.data.mycmd = '/login'
		await myBus(cpToken.statusText, cpToken.data)
		return cpToken.data
	} catch (err) {
		console.error(err)
	}
}

