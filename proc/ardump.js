const util = require('util')

module.exports = async (x, cpid) => {
	try {
		//var array = new Map(x.objects)
		for (var [key, value] of Object.entries(x.objects)) {
			if (typeof value === 'object') {
				for (const [dkey, dval] of Object.entries(value)) {
					console.dir(dval + ' : ' + dkey + ' => ' + dval)
				}
			}
		}
		//array.set(x.map(item => item.uid) 
			//console.log(array)
		
//await console.log(util.inspect(objReturn, { showHidden: true, colors: true, depth: null }))
			return array
	} catch (err) {
		console.error(err)
	}
}


