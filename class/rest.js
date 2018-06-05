// CP REST api constructor
//
function Rest(x) {
	this.method = 'post'
	this.responseType = 'json'
	this.baseURL = x.url
	this.url = '/' + x.cmd
	this.headers['X-chkp-sid'] = x.sid
	this.headers['content-Type'] = 'application/json'
	this.data.offset = x.offset
	this.data.limit = x.limit
	this.data['details-level'] = x.details
}

// class methods for CP REST api
Rest.prototype.cpData = function() {
	return this.data
}


module.exports = Rest
