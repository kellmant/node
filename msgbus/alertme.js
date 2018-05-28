
module.exports = (d,cpid) => {
	var tstamp = Date.now() / 1000 | 0
	let mbus = `${cpid.uid}/${tstamp} : `
	if (typeof d === 'object') {
		console.dir(d, { depth: null, colors:true});
		newd = JSON.stringify(d)
		console.log(mbus +  newd)
		
	} else {
		console.log(mbus + d);
		//setcfg(mbus, d)
	}
}
