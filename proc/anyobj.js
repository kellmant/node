const setKey = require('../msgbus/setkey')
const msgBus = require('../msgbus/stream')

module.exports = async (x) => {
	try {
		for (var i in x) {
			for (var j in x[i]) {
				const myObjs = Object.keys(x[i][j]).reduce((p, c) => ({...p, [c]: x[i][j][c]}), {})
				let cpType = myObjs.type
				if (myObjs.state) {
					var cpUid = myObjs.uid
					var cpName = myObjs["meta-info"]["last-modify-time"]["iso-8601"]
					var cpForm = `obj/${cpType}/${cpName}`
				} else {
					var cpName = myObjs.name
					var cpForm = `obj/${cpType}/${cpName}`
					var cpUid = myObjs.uid
				}
				let cpout = JSON.stringify(myObjs)
				let cpId = `obj/id/${myObjs.uid}`
				myObjs.mycmd = '/' + cpName
				await setKey(cpId, cpout)
				await setKey(cpForm, cpUid)
			}
		}
	} catch (err) {
		console.error(err)
	}
}


