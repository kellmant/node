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
Login.prototype.noauthme = async function() {
	let mydata = { 
		'user': await getKey(this.admin), 
		'password': await getKey(this.passwd)
	}
	let myhost = await getKey(this.host) 
	let mycmd = 'login'
	const resdat = [ mydata, myhost, mycmd ]

	return resdat
}

Login.prototype.login = async function(x) {
	const myhost = await getKey(this.host) 
	const mydata = await [ baseURL = myhost,
			url = 'login',
			this.data = x ]
	return mydata
}

Login.prototype.authme = async function() {
	let mydata = []
	let myauth = { 
		'user': await getKey(this.admin), 
		'password': await getKey(this.passwd)
	}
	let myhost = await getKey(this.host) 
	let mycmd = 'login'
	mydata.auth = myauth
	mydata.host = myhost
	mydata.cmd = mycmd
	return mydata
}

module.exports = Login
