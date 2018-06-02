const util = require('util')

module.exports = async (x, cpid) => {
	try {
		var Allobjects = []
		for (i=0 ; i < x.objects.length ; i++) {
			if (x.objects[i].uid) {
			//process.stdout.write('index ' + i + ' \r');
			let cpin = x.objects[i]
			let cpout = await JSON.stringify(x.objects[i])
			let cpType = cpin.type
			let cpName = cpin.name
			let cpUid = cpin.uid
			let cpForm = `obj/${cpType}/${cpName}`
		//await setcfg(cpForm, cpout)
			//await console.log(typeof cpout)
			//let cpobjout = JSON.parse(cpout)
			//await console.log(typeof cpobjout)
			//console.log('index ' + cpName + '\n     ' + cpout.uid + '\n');
				Allobjects += (cpName.cpin)
				}
//await console.log(util.inspect(Allobjects, { showHidden: true, colors: true, depth: null }))
			console.log(typeof Allobjects)
		}
			const objReturn =  JSON.parse(Allobjects)
			await console.log(typeof objReturn)
//await console.log(util.inspect(objReturn, { showHidden: true, colors: true, depth: null }))
			return objReturn
	} catch (err) {
		console.error(err)
	}
}


