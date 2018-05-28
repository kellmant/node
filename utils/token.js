process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

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
		return cpToken
	} catch (err) {
		console.error(err)
	}
}

