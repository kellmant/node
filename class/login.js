// CP REST api login constructor
//
//
const getKey = require('../etcd/key')

function Login(x) {
	this.store = 'http://keystore.east1:2379'
	this.authdir = `ctrl/cfg/mg/${x}/config_system/`
	this.admin = this.authdir + 'mgmt_admin_name'
	this.passwd = this.authdir + 'mgmt_admin_passwd'
	this.host = this.authdir + 'hostname'
}

// class methods for CP REST api login
//

Login.prototype.authme = async function() {
	const mydata = []
	let myauth = { 
		'user': await getKey(this.admin), 
		'password': await getKey(this.passwd)
	}
	let myhost = await getKey(this.host) 
	let myurl = await `https://${myhost}/web_api`
	let mycmd = 'login'
	mydata.data = myauth
	mydata.host = myhost
	mydata.url = myurl
	mydata.cmd = mycmd
	return mydata
}

Login.prototype.logout = async function(x) {
	const mydata = []
	mydata.url = x.url
	let mycmd = 'logout'
	mydata.data = {}
	mydata.url = x.url
	mydata.cmd = mycmd
	mydata.headers['X-chkp-sid'] = x.sid 
	return mydata
}

module.exports = Login
