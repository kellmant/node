// Logout 
//
// cancel token and close active session
// as defined by grab.cp.stat
// keep in mind that the default
// idle expiry is 10 minutes, your session
// may already be gone
// 
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const grab = require('../utils/vars')

const Etcd = require('node-etcd')
const etcd = new Etcd('http://keystore.east1:2379')
const etcdCache = new Etcd('http://keystore.toonces:2379')
const recurse = { recursive: true }
const etcdObjectify = require('etcd-result-objectify')
const axios = require('axios')
const now = new Date()
const cmd = 'logout'

//console.log(grab.auth)
//console.log(grab.cp)


module.exports = async () => {
	await main()
}

// main() function for program runtime
// async calls are made from the top level
// and promises are handed out from the functions
// promise set for each request to
// the keystore with etcdGet()
async function main() {
	try {
		const authkeys = await etcdShow(grab.cp.stat, recurse)
		const keyobj = etcdObjectify(authkeys)
		const apiurl = keyobj.url + '/' + cmd
		const sid = keyobj.sid
		const session = keyobj.uid
		const killToken = await sessionClose(sid, apiurl, session)
		await etcdSet(grab.cp.ops + session + '/Stop', now )
		await etcdKill(grab.cp.stat, recurse)
	} catch (err) {
		console.log('Failed in logout main function : ' + err)
	}
}

// set callback for sessionInit() 
// get X-chkp-sid token for session auth
// and cache for all api event functions
// stored in local keystore var etcdSession
function getToken(apihost, userdata) {
	const apihostCall = 'https://' + apihost + '/web_api/login'
	let tokenPromise = sessionInit(apihostCall, userdata)
	tokenPromise.then(function(result) {
		const cptoken = result
		etcdSet('cp/sid', cptoken.sid)
		etcdSet('cp/uid', cptoken.uid)
		etcdSet('cp/url', cptoken.url)
	}, function(err) {
		console.log(err)
		console.log('Failed to get session token')
	})
}

// authentication object for api header X-chkp-sid
// using axios module for API calls
function sessionClose(sid, apiurl, session) {
	const userdata = { }
	return new Promise(function(resolve, reject) {
		// expire auth token for session
		axios({
			method: 'post',
			url: apiurl, 
			headers: {'X-chkp-sid': sid },
			data: userdata
		})
			.then(function (value, err) {
			if (err) {
				reject(err)
			} else {
				resolve(value.data)
			}
		})
	})
}

// called by main function to retrieve
// credentials for the cp api from keystore
// used as object grab.cp.stat and holds
// the active session token needed to 
// authorize access to the cpapi
//
function etcdGet(key, options) {
	return new Promise(function(resolve, reject) {
		// Do async get of key value with promise
		etcd.get(key, options, function (err, value) {
			if (err) {
				reject(err)
			} else {
				resolve(value.node)
			}
		})
	})
}

// etcdShow => show objects from local keystore cache
//
// its a good idea to have fall backs and layers of data
// There is always a risk of race conditions when left
// unattended. etcdGet function calls an outside store 
// where credential and sensitive information are.
// this function works from the local cache of keys.
// Any refresh of data from outside must be done with get
// as this will only show you cached keys.
//
function etcdShow(key, options) {
	return new Promise(function(resolve, reject) {
		// Do async get of key value with promise
		etcdCache.get(key, options, function (err, value) {
			if (err) {
				reject(err)
			} else {
				resolve(value.node)
			}
		})
	})
}

// etcdSet => set a key/value pair in the keystore
//
// In addition to setting configuration or state changes,
// the keystore can be used to collect tracking
// of the events across a session to ensure
// operations are completed as intended. Any response will be
// saved in the keystore for live config or analysis. 
// A collection of error responses gives us a place
// to work from, for continuous improvement.
// access session details through grab.cp.ops
//
function etcdSet(key, value) {
	return new Promise(function(resolve, reject) {
		// Do async set of key value
		etcdCache.set(key, value, function (err, result) {
			if (err) {
				reject(err)
			} else {
				resolve(result)
			}
		})
	})
}

// etcdKill => delete keys and directories of values
//
// As configurations change, the keystore needs to be pruned
// of any out of date information. Building the removal into 
// the automation process reduces complexity, ensuring you 
// are only paying for and managing live systems
//
function etcdKill(key) {
	return new Promise(function(resolve, reject) {
		// Set a promise to remove any keys
		etcdCache.del(key, recurse, function (err, result) {
			if (err) {
				reject(err)
			} else {
				resolve(result)
			}
		})
	})
}
