const keySet = require('./setkey')

module.exports = (d,cpid) => {
	var tstamp = Date.now() / 1000 | 0
	const mbus = `msg/${cpid.uid}/${tstamp}${cpid.mycmd}`
	if (typeof d === 'object') {
		let newd = JSON.stringify(d)
		keySet(mbus, newd)	
	} else {
		keySet(mbus, d)	
	}
}
