const setKey = require('../msgbus/setkey')

module.exports = async (x) => {
	try {
		var Allobjects = []
		for (i=0 ; i < x.objects.length ; i++) {
			if (x.objects[i].uid) {
				let cpin = x.objects[i]
				let cpout = await JSON.stringify(x.objects[i])
				let cpType = cpin.type
				let cpName = cpin.name
				let cpUid = cpin.uid
				let cpForm = `obj/${cpType}/${cpName}`
				let cpId = `obj/id/${cpUid}`
				await setKey(cpId, cpout)
				await setKey(cpForm, cpUid)
			}
		}
		return 
	} catch (err) {
		console.error(err)
	}
}


