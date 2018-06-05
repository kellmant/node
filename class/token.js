
function Token(x) {
	this.uid = x.uid
	this.sid = x.sid
	this.url = x.url
	this['session-timeout'] = x['session-timeout']
	this.last = x['last-login-was-at']['iso-8601']
	this.api = x['api-server-version']
}




module.exports = Token
