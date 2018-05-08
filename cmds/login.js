//  Login
//
//  Start new API session and retrieve auth token
//  based on credentials pulled from the keystore
//
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

//console.log(grab.auth)
//console.log(grab.cp)

module.exports = async () => {
	try {
		await main()
		console.log('Login successful')
	} catch (err) {
		console.log('Login FAILED')
	}
}


// main() function for program runtime
// async calls are made from the top level
// and promises are handed out from the functions
// promise set for each request to
// the keystore with etcdGet()
async function main() {
	try {
		const authkeys = await etcdGet(grab.auth, recurse)
		const keyobj = etcdObjectify(authkeys)
		const apihost = keyobj.hostname
		const userdata = { user: keyobj.mgmt_admin_name, password: keyobj.mgmt_admin_passwd }
		const gotToken = await getToken(apihost, userdata)
	} catch (err) {
		console.log('Failed in main function : ' + err)
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
		etcdSet(grab.cp.ops + cptoken.uid + '/Start', now )
	}, function(err) {
		console.log(err)
		console.log('Failed to get session token')
	})
}

// called by getToken to process login and return
// authentication object for api header X-chkp-sid
// using axios module for API calls
function sessionInit(apiurl, userdata) {
	return new Promise(function(resolve, reject) {
		// get auth token for session
		axios({
			method: 'post',
			url: apiurl, 
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

// tracking event status of the API to ensure
// sessions are completed. Any response will be
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
