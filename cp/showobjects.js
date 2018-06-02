const util = require('util')
const getObject = require('../utils/callapi')
const checkObject = require('../proc/cpdump')
//

module.exports = async (mycmd, cpToken) => {
	try {
		const url = mycmd
		let offset = 0
		const pagelimit = 500
		const objdetail = 'standard'
		let cpBlob = []
		let cpCall = {
			method: 'post',
			baseURL: cpToken.url,
			url: url,
			headers: { 'X-chkp-sid': cpToken.sid, 'content-Type': 'application/json' },
			responseType: 'json',
			data: { 'offset': offset, 'limit': pagelimit, 'details-level': objdetail }
		}
		let cpFound = await getObject(cpCall)
		await cpBlob.push(cpFound)
		//let cpBlob = await checkObject(cpFound, cpToken)
		//console.log('the blob is : ' + (typeof cpBlob))
//await console.log(util.inspect(cpBlob, { showHidden: true, colors: true, depth: null }))
		//AllObjects.push(cpObjects)
		while (cpFound.total > offset) {
			process.stdout.write(' ' + mycmd + '=> ' + offset + '\r')
			offset = offset + pagelimit
			cpCall = {
				method: 'post',
				baseURL: cpToken.url,
				url: url,
				headers: { 'X-chkp-sid': cpToken.sid, 'content-Type': 'application/json' },
				responseType: 'json',
				data: { 'offset': offset, 'limit': pagelimit, 'details-level': objdetail }
			}
			cpFound = await getObject(cpCall)
			//AllObjects.push(cpObjects)
			//await checkObject(cpFound, cpToken)
			//cpBlob += await checkObject(cpFound, cpToken)
			await cpBlob.push(cpFound)
		//console.log('the blob is : ' + (typeof cpBlob))
		}
		//await console.log(' ' + mycmd + ' = ' + cpFound.total)
		return cpBlob
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
