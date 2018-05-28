
const getObject = require('../utils/callapi')
//

module.exports = async (mycmd, cpToken) => {
	try {
		const url = mycmd
		let offset = 0
		const pagelimit = 500
		const objdetail = 'standard'
		let AllObjects = []
		let cpCall = {
			method: 'post',
			baseURL: cpToken.url,
			url: url,
			headers: { 'X-chkp-sid': cpToken.sid, 'content-Type': 'application/json' },
			responseType: 'json',
			data: { 'offset': offset, 'limit': pagelimit, 'details-level': objdetail }
		}
		var cpObjects = await getObject(cpCall)
		await AllObjects.push(cpObjects)
		while (cpObjects.total > offset) {
			process.stdout.write(' ' + mycmd + '=>' + offset + '\r')
			offset = offset + pagelimit
			cpCall = {
				method: 'post',
				baseURL: cpToken.url,
				url: url,
				headers: { 'X-chkp-sid': cpToken.sid, 'content-Type': 'application/json' },
				responseType: 'json',
				data: { 'offset': offset, 'limit': pagelimit, 'details-level': objdetail }
			}
			let cpObjects = await getObject(cpCall)
			await AllObjects.push(cpObjects)
			//await console.log(AllObjects)
		}
		await console.log(' ' + mycmd + ' = ' + cpObjects.total)
		return AllObjects
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
