// exporting a JSON object parser to handle moving
// objects into the keystore 
// this is an imported function
// requires the JSON data to be in object form
// using Object() parser built into nodejs

const grab = require('./vars')
const key = require('./keystore')

module.exports = async (myobject) => {
	const mykeys = Object.keys(myobject)
	mykeys.forEach(function(keyvals) {
		//console.log(addKey.myvar.cpstate + keyvals + ': ' + myobject[keyvals])
		let keystore = addKey.myvar.cpstate + keyvals
		console.log('Updating key : ' + keystore)
		let keyparse = JSON.parse(keystore)
		let keydata = JSON.parse(myobject[keyvals])
		key.set(keyparse, keydata)
		console.log(mykeys[keyvals])
		console.log(myobject[mykeys])
		return 
	})
}

//	mykeys.forEach(function(keyval) {
//		let items = Object.keys(myobject[mykeys][keyval])
//		items.forEach(function(item) {
//		console.log(item + ' : ' + keyval)
//		})
//	})
//}
//			console.log(keyval + '/ ' + item + ' = ' + keyout)
//		})
//	})
//}
