// CP REST api constructor
//
//

const callApi = require('../utils/callapi')

function Rest(x) {
	this.method = 'post'
	this.responseType = 'json'
	this.baseURL = x.url
	this.url = '/' + x.cmd
	this.data = x.data
}

// class methods for CP REST api
Rest.prototype.callout = async function(x) {
	const apires = await callApi(x)
	console.log(typeof x)
	return apires
}

Rest.prototype.token = async function(x) {
	const headers = []
	headers['X-chkp-sid'] = x
	return headers
}

Rest.prototype.pages = function(x) {
	this.data.offset = x.offset
	this.data.limit = x.limit
	this.data['details-level'] = x.details
}


module.exports = Rest
