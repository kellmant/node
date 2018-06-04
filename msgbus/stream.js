const keySet = require('./setkey')

module.exports = (d,cpid) => {
	let mycpid = cpid
	let tstamp = Date.now() / 1000 | 0
	let mbus = `msg/${mycpid.uid}/${tstamp}${mycpid.mycmd}`
	if (typeof d === 'object') {
		let newd = JSON.stringify(d)
		keySet(mbus, newd)	
	} else {
		keySet(mbus, d)	
	}
	return
}
