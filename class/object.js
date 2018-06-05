//Constructor
//

function Cpobj(x) {
	this.uid = x.uid
	this.name = x.name
	this.type = x.type
	this['ipv4-address'] = x['ipv4-address']
	this.tags = x.tags
	this.domain = x.domain.name
	this.subnet4 = x.subnet4
	this['mask-length4'] = x['mask-length4']
	this['subnet-mask'] = x['subnet-mask']
	this['set-if-exists'] = 'true'
	this.members = x.members
}

Cpobj.prototype.oftype = function() {
	return this.type
}

Cpobj.prototype.key = function() {
	let key = `backup/${this.type}/${this.uid}`
	return key
}

Cpobj.prototype.host = function() {
	let mydata = { 'name': this.name, 
	'ipv4-address': this['ipv4-address'], 'set-if-exists': this['set-if-exists'] }
	return mydata
}

Cpobj.prototype.network = function() {
	let mydata = { 'name': this.name, 
			'subnet4': this.subnet4, 
			'subnet-mask': this['subnet-mask'], 
			'set-if-exists': this['set-if-exists'] }
	return mydata
}

Cpobj.prototype.group = function() {
	let mymembers = []
	for (var i in this.members) {
			const myObjs = Object.keys(this.members[i]).reduce((p, c) => ({...p, [c]: this.members[i][c]}), {})
			mymembers.push(myObjs.name)
	}
	let mydata = { 'name': this.name, 
			'members': mymembers,
			'set-if-exists': this['set-if-exists'] }
	return mydata
}

Cpobj.prototype['security-zones'] = function() {
	let mydata = { 'name': this.name, }
	return mydata
}

module.exports = Cpobj
