// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const getObject = require('../utils/callapi')
const msgBus = require('../msgbus/stream')

//const mycmd = '/show-commands'
// baseURL: 'https://host/web_api'
// url: /login,
// data: { 'user': cpCred.admin, 'password': cpCred.pass }
//

module.exports = async (cpToken) => {
	try {
		let cpCall = {
			method: 'post',
			baseURL: cpToken.url,
			url: cpToken.mycmd,
			headers: { 'X-chkp-sid': cpToken.sid, 'content-Type': 'application/json' },
			responseType: 'json',
			data: { }
		}
		var cpObjects = await getObject(cpCall)
		await msgBus(cpObjects.statusText, cpToken)
		return cpObjects.data
	} catch (err) {
		console.error(err)
	}
}

//{ uid: '28ad0aaa-d95f-4668-9532-04bb05461987',
//  sid: 'k3XIv2TR7VAqBqqkp472kLJYn0Yk4mRBTTtJxnrViok',
//  url: 'https://opb.seclab.fail:443/web_api',
//  'session-timeout': 600,
// 'last-login-was-at': { posix: 1527403110503, 'iso-8601': '2018-05-27T02:38-0400' },
//  'api-server-version': '1.1' }
