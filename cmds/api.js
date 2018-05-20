// cpapi - Check Point API interaction and test
//
// testing for interaction with security architecture
// this is only a test for breaking out smaller functions
// 
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const Etcd = require('node-etcd')
const etcdCache = new Etcd('http://keystore.toonces:2379')
const etcdObject = require('etcd-result-objectify')
const axios = require('axios')
const grab = require('../utils/vars')
const colorJson = require('color-json')
const ora = require('ora')
//const apicall = args._[1]
//console.log(apicall)

// acts as timestamp with now
const now = new Date()

// depreciated for imported vars
//
// location of session key for log of events
let cpops = grab.cp.ops
// active session location in keystore
let cpstat = grab.cp.stat

module.exports = async (args) => {
	try {
		const apicall = args._[1]
		const mySid = await callToken(cpstat, {recursive: true})
		const mytoken = await etcdObject(mySid)
		const myCPobject = await processEvent(mytoken.url, mytoken.sid, mytoken.uid, apicall)
		//console.log(myCPobject)
		return await showmyObject(myCPobject)
	} catch (err) {
		console.log(err)
	}
}

// main() function for program runtime
// initial promise set for token retrival
// from keystore etcdCache with callToken()
function main() {
	let initPromise = callToken(cpstat, { recursive: true })
	initPromise.then(function(result) {
		let mytoken = etcdObject(result)
		//console.log(typeof result)
		//console.log('%j', mytoken)
		//console.log('Retrieve session key for ' + mytoken.url)
		//console.log(mytoken.sid)
		processEvent(mytoken.url, mytoken.sid, mytoken.uid, apicall)
	}, function(err) {
		console.log(err)
		console.log('Failed in main function to get session token')
	})
}

// process the return data from the api call
//
function processEvent(url, sid, uid, cmd) {
	return new Promise(function(resolve, reject) {
		showEvent(url, sid, uid, cmd)
		.then(function(value, err) {
			if (err) {
				reject(err)
			} else {
				resolve(value)
			}
		})
	})
}

async function showmyObject(myobject) {
	//await console.log(colorJson(myobject))
	//await console.log('%j ', myobject)
	//await console.log('%j', myobject)
	const showit = await countmyObject(myobject)
	console.log(showit)
}

// object counter to page in objects
// from R80.10 smartcenter
//
async function countmyObject(myobject) {
	const cpcount = {
		from : myobject.from,
		to : myobject.to,
		total : myobject.total
	}
	return cpcount
}

// called by main() runtime to process change event
// using sid for authentication object in api header X-chkp-sid
// using axios module for http API calls
function showEvent(url, sid, uid, cmd) {
	let apihost = url + '/' + cmd
	return new Promise(function(resolve, reject) {
		// expire auth token for cpapi
		axios({
			method: 'post',
			url: apihost, 
			headers: {'X-chkp-sid': sid},
			data: {}
		})
			.then(function (value, err) {
			if (err) {
				reject(err)
			} else {
				//console.log('Event ' + cmd + 'in session for ' + url)
				// set event time in the keystore session log
				// located at cpops var 
			etcdCache.set(cpops + uid + '/' + now.getTime() + '/' + cmd, value.data)
				resolve(value.data)
			}
		})
	})
}

// called by main function to retrieve session
// token for the cp api from etcdCache keystore
// as defined by var grab.cp.stat for key/value location
function callToken(cpstat, options) {
	return new Promise(function(resolve, reject) {
		// Do async get of key value
		etcdCache.get(grab.cp.stat, options, function (err, value) {
			if (err) {
				reject(err)
			} else {
				resolve(value.node)
			}
		})
	})
}

