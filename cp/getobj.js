//const util = require('util')
const getObject = require('../utils/callapi')
const msgBus = require('../msgbus/stream')
//
const doParse = require('../proc/classobj')
const doDump = require('../proc/anyobj')

module.exports = async (cpToken) => {
	try {
		let offset = 0
		const pagelimit = 500
		const objdetail = 'full'
		let cpBlob = []
		let cpCall = {
			method: 'post',
			baseURL: cpToken.url,
			url: cpToken.mycmd,
			headers: { 'X-chkp-sid': cpToken.sid, 'content-Type': 'application/json' },
			responseType: 'json',
			data: { 'offset': offset, 'limit': pagelimit, 'details-level': objdetail }
		}
		let cpFound = await getObject(cpCall)
		cpToken.mycmd = cpCall.url
		await msgBus(cpFound.data.total + ' objects', cpToken)
		await doParse(cpFound.data)
		await cpBlob.push(cpFound.data)
		while (cpFound.data.total > offset) {
			process.stdout.write(' ' + cpToken.mycmd + '=> ' + cpFound.data.total + ' \r')
			offset = offset + pagelimit
			cpCall = {
				method: 'post',
				baseURL: cpToken.url,
				url: cpToken.mycmd,
				headers: { 'X-chkp-sid': cpToken.sid, 'content-Type': 'application/json' },
				responseType: 'json',
				data: { 'offset': offset, 'limit': pagelimit, 'details-level': objdetail }
			}
			cpFound = await getObject(cpCall)
			await cpBlob.push(cpFound.data)
			if (cpFound.data.to)
			await msgBus('Indexing ' + cpFound.data.to + ' objects', cpToken)
			await doParse(cpFound.data)
		}
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
