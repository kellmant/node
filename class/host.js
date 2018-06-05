//Constructor
//

function Host(x) {
	this.name = x.name
	this['ipv4-address'] = x['ipv4-address']
	this['set-if-exists'] = 'true'
	//this.tags = x.tags
	//this.domain = x.domain.name
}

Host.prototype.x = function () {
	return
}

module.exports = Host

