const util = require('util')

module.exports = async (x, cpid) => {
	try {
		//for (i=0 ; i < x.length ; i++) {
		//let cpout = JSON.stringify(x.objects[i])
		//let cpType = x.objects[i].type
		//let cpName = x.objects[i].name
		//let cpForm = `obj/${cpType}/${cpName}`
		//await setcfg(cpForm, cpout)
		//process.stdout.write('index ' + i + '\r');
			//console.log(cpid)
			console.log(typeof x)
			console.log('%j', x)
			//console.log(util.inspect(x, { showHidden: true, colors: true, depth: null }))
	} catch (err) {
		console.error(err)
	}
}


