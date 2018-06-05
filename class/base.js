//Constructor
//

function myObject(x) {
	this.uid = x.uid
	this.name = x.name
	this.type = x.type
	this['ipv4-address'] = x['ipv4-address']
	this.tags = x.tags
	this.domain = x.domain.name
	this.subnet4 = x.subnet4
	this['mask-length4'] = x['mask-length4']
	this['subnet-mask'] = x['subnet-mask']
}

myObject.prototype.uid = function () {
}

module.exports = myObject

