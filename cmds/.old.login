// grab local vars for authkey, situation and cpstate
// these are all pointers to locations in the keystore
// accessed through grab.myvar.[key] = value
// authkey: holds auth for api admin in these keys
// 	the entire smc config is pulled in and
// 	user (mgmt_admin_name), password (mgmt_admin_passwd)
// 	and hostname (hostname) are extracted
// 	This data is sourced from the config_system
// 	used to build the manager and is stored as keys
// situation: stores the event activity per session
// 	Can be any location, using session id from
// 	manager to track, but can be any identifier
// 	following a format of saving the event operation
// 	as the key, and the return data as the value.
// 	.uid/<operation> = return value
// cpstate: holds the active session id and token
// 	.uid is generated as an identifier
// 	.sid is required to authorize the session
// 	.url is the http call you will send post requests
// 	additional information is stored for debug if needed
//
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const error = require('../utils/error')
const grab = require('../utils/vars')
const getKeys = require('../utils/etcdget')
const setKeys = require('../utils/etcdset')
const parseKeys = require('../utils/keyparser')
const etcdObject = require('etcd-result-objectify')
const ora = require('ora')
const axios = require('axios')
const now = new Date()

//console.log(grab)

module.exports = async () => {
	const spinner = ora().start()

	try {
		await getKeys(grab.myvar.authkey).then((response) => {

		spinner.stop()
		const keyobj = response
		const host = keyobj.url
		const userdata = {
			"user": keyobj.mgmt_admin_name,
			"password": keyobj.mgmt_admin_passwd
		}
			setToken(host, userdata)
		})

	} catch (err) {
		spinner.stop()
		console.error(err)
	}
}
// collects the session information from login
// you can access the session with .sid
// the uid is .uid and the API host call
// is accessed from .url
const setToken = async (host, userdata) => {
	const mytoken = await sessionInit(host, userdata).then((result) => {
		let cpsession = result
		let parsedObjs = parseKeys(result)
		console.log(parsedObjs)
		return parsedObjs
	})
}

const sessionInit = async (host, userdata) => {
	const apihost = host + '/login'
	return new Promise(function(resolve, reject) {
		axios({
			method: 'post',
			url: apihost,
			data: userdata
		})
		.then(function (value, err) {
			if (err) {
				reject(err)
			} else {
			console.log(apihost)
				resolve(value.data)
			}
		})
	})
}



