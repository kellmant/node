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

//set the number of returned json objects
// to maxi (500)
// the level of detail impacts the 
// velocity of change. uid to only track
// on the id, standard for most info
// and full if you want to see object
// state as well as full details audit
//
const pagelimit = 500
const objdetail = 'full'

// acts as timestamp with now
const now = new Date()
const offset = 0

// depreciated for imported vars
//
// location of session key for log of events
let cpops = grab.cp.ops
// location of object keys pulled from api
let cpobjs = 'obj/'
// active session location in keystore
let cpstat = grab.cp.stat


module.exports = async (args) => {
	try {
		const apicall = args._[1]
		const mySid = await callToken(cpstat, {recursive: true})
		const mytoken = await etcdObject(mySid)
		const myCPobject = await processEvent(mytoken.url, mytoken.sid, mytoken.uid, apicall, offset)
		for (i=0 ; i < myCPobject.objects.length ; i++) {
			let cpout = JSON.stringify(myCPobject.objects[i])
			etcdCache.set(cpobjs + myCPobject.objects[i].type + '/' + myCPobject.objects[i].name, cpout)
		}
		const pagecount = await countmyObject(myCPobject)
		console.log('%j ', pagecount)
		console.log(pagecount.to)
		do {
			//const spinner = ora({ stream: process.stdout, color: yellow }).start()
			const offset = pagecount.to
			console.log(offset + ' of ' + pagecount.total + ' ' + apicall + ' objects indexed')
			const myCPobject = await processEvent(mytoken.url, mytoken.sid, mytoken.uid, apicall, offset)
			//spinner.start('Object scrape')
			for (i=0 ; i < myCPobject.objects.length ; i++) {
				let cpout = JSON.stringify(myCPobject.objects[i])
				await etcdCache.set(cpobjs + myCPobject.objects[i].type + '/' + myCPobject.objects[i].name, cpout)
			}
			pagecount.to = pagecount.to + pagelimit
			//const pagecount = await countmyObject(myCPobject)
			//let offset = pagecnt.to + 1
			//offset++
		}
		while (pagecount.total > pagecount.to) 
		//spinner.stop('ENd')
	} catch (err) {
		etcdCache.set(cpops + mytoken.uid + '/' + now.getTime() + '/error', err)
		//spinner.stop(err)
		console.log(err)
	}
}

// process the return data from the api call
//
function processEvent(url, sid, uid, cmd, offset) {
	return new Promise(function(resolve, reject) {
		showEvent(url, sid, uid, cmd, offset)
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
	//await console.log('%j', myobject)
	let countit = await countmyObject(myobject)
	console.log('From: ' + countit.from)
	console.log('To: ' + countit.to)
	console.log('Total: ' + countit.total)
	return countit
	//console.log(typeof myobject)
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
function showEvent(url, sid, uid, cmd, offset) {
	let apihost = url + '/' + cmd
	return new Promise(function(resolve, reject) {
		// expire auth token for cpapi
		axios({
			method: 'post',
			url: apihost, 
			headers: {'X-chkp-sid': sid},
			data: { 'offset': offset, 'limit': pagelimit, 'details-level': objdetail }
		})
			.then(function (value, err) {
			if (err) {
				reject(err)
			} else {
				//console.log('Event ' + cmd + 'in session for ' + url)
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

