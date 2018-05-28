process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const getObject = require('./callapi')

// baseURL: 'https://host/web_api'
// url: /login,
// data: { 'user': cpCred.admin, 'password': cpCred.pass }
//

module.exports = async (cpToken) => {
	try {
		const cpCall = {
			method: 'post',
			baseURL: cpToken.url,
			url: '/logout',
			headers: { 'X-chkp-sid': cpToken.sid },
			data: { }
		}
		var cpLogout = await getObject(cpCall)
		await console.log('Session ' + cpToken.uid + ' close: ' + cpLogout.message)
		return cpLogout
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
