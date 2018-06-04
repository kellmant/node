const doLogin = require('../utils/login')
const doLogout = require('../utils/logout')
const doError = require('../utils/error')
const doGrab = require('../cp/showobjects')
const doAlert = require('../msgbus/alertme')
const doSave = require('../msgbus/writefile')
const msgBus = require('../msgbus/stream')
const doParse = require('../proc/data')
const doAsync = require('../proc/runasync')

module.exports = async (args) => {
	try {
		if (!args._[1]) {
			require('../help/help')(args)
			return
		}
		const cpSession = await doLogin()
		if (args._[1] == 'all') {
			const cpHosts = args._[0] + '-hosts'
			const cpNets = args._[0] + '-networks'
			const cpGroups = args._[0] + '-groups'
			const cpSeczones = args._[0] + '-security-zones'
			const cpLayers = args._[0] + '-access-layers'
			const cpTcp = args._[0] + '-services-tcp'
			const cpUdp = args._[0] + '-services-udp'
			const cpIcmp = args._[0] + '-services-icmp'
			const cpSvc = args._[0] + '-services-other'
			const cpSvcgroup = args._[0] + '-service-groups'
			const cpAppcat = args._[0] + '-application-site-categories'
			const cpAppgroup = args._[0] + '-application-site-groups'
			const cpGws = args._[0] + '-simple-gateways'
			const cpTags = args._[0] + '-tags'
			if (args._[2] == 'async') {
				let [ resHosts, resNets, resLayers, resSeczones, resGroups, resTcp, resUdp, resIcmp, resSvc, resSvcgroup, resAppcat, resAppgroup, resTags, resGws ] = await Promise.all([
				doAsync(cpSession, cpHosts),
				doAsync(cpSession, cpNets),
				doAsync(cpSession, cpLayers),
				doAsync(cpSession, cpSeczones),
				doAsync(cpSession, cpGroups),
				doAsync(cpSession, cpTcp),
				doAsync(cpSession, cpUdp),
				doAsync(cpSession, cpIcmp),
				doAsync(cpSession, cpSvc),
				doAsync(cpSession, cpSvcgroup),
				doAsync(cpSession, cpAppcat),
				doAsync(cpSession, cpAppgroup),
				doAsync(cpSession, cpGws),
				doAsync(cpSession, cpTags)
					])
				} else {
			await doAsync(cpSession, cpHosts)
			await doAsync(cpSession, cpNets)
			await doAsync(cpSession, cpLayers)
			await doAsync(cpSession, cpSeczones)
			await doAsync(cpSession, cpGroups)
			await doAsync(cpSession, cpTcp)
			await doAsync(cpSession, cpUdp)
			await doAsync(cpSession, cpIcmp)
			await doAsync(cpSession, cpSvc)
			await doAsync(cpSession, cpSvcgroup)
			await doAsync(cpSession, cpAppcat)
			await doAsync(cpSession, cpAppgroup)
			await doAsync(cpSession, cpTags)
			await doAsync(cpSession, cpGws)
				}
		} else {
			cpSession.mycmd = await '/' + args._[0] + '-' + args._[1]
			const myObjects = await doGrab(cpSession)
			const parsedObj = await doParse(myObjects)
			await doSave(cpSession.mycmd, parsedObj)
		}
		const myExit = await doLogout(cpSession)
		await console.log('\n')
	} catch (err) {
		doError(err)
	}
}

