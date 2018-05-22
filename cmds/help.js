const myState = require('../utils/etcdcache')
const grab = require('../utils/vars')
const error = require('../utils/error')
const etcdObject = require('etcd-result-objectify')
//const { info, warn, loading, error, link } = require('prettycli')

/*
const mysession = async () => {
	try {
		await myState(grab.cp.stat).then((result) => {
		const parsedObj = etcdObject(result)
		console.log('API Host  ')
		console.log('URL : ' + parsedObj.url)
			console.log('Session   ')
		console.log('UID : ' + parsedObj.uid)
	})
	} catch (err) {
		console.log('No Session - use ctrl login to start a new one')
		console.log('Error Code: ' + err.errorCode)
	}

}

mysession()
*/

	const menus = {
		
	main:` 
		ctrl [command] <options>

		today .............. show todays weather
		login .............. start session
		logout ............. end session
		api ................ CP R80 API commands
		version ............ show controller version
		help ............... show controller help
	

	=================================================
							`,
	
	today:`
		ctrl today <options>

		--location, -l ..... location to use`,

	login:`
		ctrl login

		.... login to API for session token`,
	logout:`
		ctrl logout

		.... logout of api and expire session token`,
	api:`
		ctrl api <options>

		show-objects             .... Collect all objects
		show-hosts               .... Collect all host objects
		show-networks            .... Get network objects
		show-groups              .... Get group object references
		show-simple-gateways     .... Pull gateway objects
		show-unused-objects      .... Get objects not used in policy
		show-data-center-objects .... Get dynamic objects from data centers

		Ex. ctrl api show-objects

		
							`
	}

module.exports = (args) => {
	const subCmd = args._[0] === 'help'
	 ? args._[1]
	 : args._[0]


	console.log(menus[subCmd] || menus.main)

	}


		
