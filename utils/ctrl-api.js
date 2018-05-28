process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const util = require('util');
const Client = require('node-rest-client').Client;
const client = new Client();
const Etcd = require( 'node-etcd' )
const Store = require( 'etcd-result-objectify' )
const etcd = new Etcd('http://keystore.east1:2379')
const objbus = new Etcd('http://keystore.toonces:2379')
const authdir = 'ctrl/cfg/mg/opb/config_system/'
const pagelimit = 500 
const objdetail = 'full'
const offset = 0
const cpArrayawait = []
const cpForm = {}

const cpAuth = { 
	'name': authdir + 'mgmt_admin_name', 
	'password': authdir + 'mgmt_admin_passwd',
	'host': authdir + 'hostname'
}

function delay(ms) {
	return {
		then: cb => setTimeout( cb, ms )
	}
}

function getcfg(k) {
	return new Promise(function(resolve, reject) {
		etcd.get(k, function (err, res) {
			if (err) {
				reject(err)
			} else {
				resolve(res.node.value)
			}
		})
	})
}

function setcfg(k, v) {
	return new Promise(function(resolve, reject) {
		objbus.set(k, v, function (err, res) {
			if (err) {
				reject(err)
			} else {
				resolve(res)
			}
		})
	})
}

const msgbus = (d) => {
	var tstamp = Date.now() / 1000 | 0
	let mbus = `msgbus/${tstamp}`
	if (typeof d === 'object') {
		console.dir(d, { depth: null, colors:true});
		newd = JSON.stringify(d)
		setcfg(mbus, newd)
		
	} else {
		console.log(d);
		setcfg(mbus, d)
	}
}

function sendPost(myUrl, args) {
	 return new Promise(function(resolve, reject) {
	client.post(myUrl, args, function (data, response) {
		if (response.statusCode != "200") {
			const myerr = response.statusCode + ' ' + response.statusMessage
			reject(myerr)
		} else {
			resolve(data)
		}
	})
})
}

function objstore(kroot, x) {
	for (const [key, value] of Object.entries(x)) {
		if (typeof value === 'object') {
			for (const [dkey, dvalue] of Object.entries(value)) {
				k = `${kroot}/${key}/${dkey}`	
				v = dvalue	
				setcfg(k,v)
				//msgbus(`${kroot}/${key}/${dkey}, ${dvalue}`)
			}
		} else {
				k = `${kroot}/${key}`	
				v = value	
				setcfg(k,v)
				//msgbus(`${kroot}/${key} ${value}`)
		}
	}
}

function parseKeys(x) {
	 //console.log(util.inspect(x, { showHidden: true, depth: 1 }));
	//msgbus(Object.entries(x))
	for (const [key, value] of Object.entries(x)) {
		if (typeof value === 'object') {
			for (const [dkey, dval] of Object.entries(value)) {
			//msgbus(`${dkey} : ${dval}`)
			//msgbus(dkey)
				continue
			}
		}
		//} else {
			//msgbus(`NOT AN OBJECT: ${key} : ${dval}`)
			//msgbus(typeof value)
		//	console.log(util.inspect(key, { showHidden: true, depth: null }))
		//}
	}
} 

async function cpParse(x) {
	for (i=0 ; i < x.objects.length ; i++) {
		try {
		let cpout = JSON.stringify(x.objects[i])
		let cpType = x.objects[i].type
		let cpName = x.objects[i].name
		let cpForm = `obj/${cpType}/${cpName}`
		await setcfg(cpForm, cpout)
		process.stdout.write('index ' + i + '\r');
		} catch (err) {
			msgbus(err)
		}

	}
}

async function cpDump(x, seeker) {
		try {
			for (i=0 ; i < x.objects.length ; i++) {
				if (x.objects[i].uid) {
				let cpout = await JSON.stringify(x.objects[i])
				let cpType = x.objects[i].type
					if (x.objects[i].name == '#hastags') {
					cpName = 'hastags'
					} else {
					cpName = x.objects[i].name
					}
				let cpUid = x.objects[i].uid
				var cpForm = 'obj/name/' + cpName
				var cpids = `obj/id/${cpUid}`
				var cpSearch = `obj/${seeker}/${cpName}`
				process.stdout.write(`indexed ${i} ${cpType} objects ${cpName} \r`);
				await setcfg(cpids, cpout)
				await setcfg(cpForm, cpUid)
				await setcfg(cpSearch, cpUid)
				}
			}
				//process.stdout.write('\n')
		} catch (err) {
				process.stdout.write('\n')
			msgbus(`WARNING ${x.objects[i].uid} failed to index ${x.objects[i].type} ${x.objects[i].name} ${err}`)
				await setcfg('obj/err/' + x.objects[i].uid, JSON.stringify(x.objects[i]))
		}
}


async function countPage(pages) {
	const pgcount = {
		from: pages.from,
		to: pages.to,
		total: pages.total
	}
	return pgcount
}

async function apiLogin() {
	try {
		myadmin = await getcfg(cpAuth.name)
		mypass = await getcfg(cpAuth.password)
		myhost = await getcfg(cpAuth.host)
		myUrl = 'https://' + myhost + '/web_api/login'
		myData = { 
			'user': myadmin, 
			'password': mypass
		}
		myHeader = {
			'Content-Type': 'application/json'
		}
		args = {
			data: myData,
			headers: myHeader
		}
		cpApi = await sendPost(myUrl, args)
		await objstore(myadmin, cpApi)
		return cpApi
	} catch (err) {
		msgbus(err)
		process.exit(1);
	}
}

async function fuckinDone(chkp) {
	try {
		//chkp = await apiLogin()
		myUrl = `${chkp.url}/logout`
		myData = {}
		myHeader = {
			'Content-Type': 'application/json',
			'X-chkp-sid': chkp.sid
		}
		args = {
			data: myData,
			headers: myHeader
		}
		cpClose = await sendPost(myUrl, args)
		cpRes = Object.values(cpClose)
		msgbus(`${chkp.uid} session ended : ${cpRes} \n`)
	} catch (err) {
		msgbus(err)
	}
}

async function apiShow(cmd) {
	try {
		let offset = 0
		msgbus(`Logging in to get ${cmd}`)
		const chkp = await apiLogin()
		myUrl = `${chkp.url}/show-${cmd}`
		myData = { 'offset': offset, 'limit': pagelimit, 'details-level': objdetail }
		myHeader = {
			'Content-Type': 'application/json',
			'X-chkp-sid': chkp.sid
		}
		args = {
			data: myData,
			headers: myHeader
		}
		msgbus(`${chkp.uid} session ${cmd} started with ${chkp.url}`)
		let cpAct = await sendPost(myUrl, args)
		await msgbus(`${chkp.uid} session ${cmd} indexed From ${cpAct.from} to ${cpAct.to} out of ${cpAct.total}`)
		//await cpParse(cpAct)
		await cpDump(cpAct, cmd)
		//await console.log(`${cpAct} : ${cpObj}`)
		while (cpAct.total > offset) {
			offset = offset + pagelimit
			myData = { 'offset': offset, 'limit': pagelimit, 'details-level': objdetail }
			args = {
				data: myData,
				headers: myHeader
			}
			//await delay(1000)
			cpAct = await sendPost(myUrl, args)
			await cpDump(cpAct, cmd)
			//await cpParse(cpAct)
		//msgbus(cpArrayawait)
		}
		msgbus(`${chkp.uid} session closing`)
		await fuckinDone(chkp)
	} catch (err) {
		msgbus(err)
	}
}

async function runtime() {
	try {
		//await apiShow('unused-objects')
		await apiShow('unused-objects')
		//await delay(1000)
		//await apiShow('networks')
		//await delay(1000)
		//await apiShow('groups')
	} catch (err) {
		msgbus(err)
	}
}

runtime()
