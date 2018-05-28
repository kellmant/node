
module.exports = async (x) => {
	for (i=0 ; i < x.objects.length ; i++) {
		try {
		let cpout = JSON.stringify(x.objects[i])
		let cpType = x.objects[i].type
		let cpName = x.objects[i].name
		let cpForm = `obj/${cpType}/${cpName}`
		//await setcfg(cpForm, cpout)
		process.stdout.write('index ' + i + '\r');
		} catch (err) {
			msgbus(err)
		}

	}
}

