
module.exports = (d,cpid) => {
	var tstamp = Date.now() / 1000 | 0
	const mbus = `${cpid.uid}/${tstamp} : `
	if (typeof d === 'object') {
		//console.dir(d, { depth: null, colors:true});
		var newd = d.keys
		console.dir(newd)
		
	} else {
		console.log(mbus + d);
		//setcfg(mbus, d)
	}
}
