
const getKey = require('./key')

module.exports = async () => {
	try {
		const authdir = 'ctrl/cfg/mg/opb/config_system/'
		const admin = await getKey(authdir + 'mgmt_admin_name')
		const passwd = await getKey(authdir + 'mgmt_admin_passwd')
		const host = await getKey(authdir + 'hostname')
		const cpCred = {
			'admin': admin,
			'pass': passwd,
			'host': host
		}
		return cpCred
	} catch (err) {
		console.error(err)
	}
}


function delay(ms) {
	return {
		then: cb => setTimeout( cb, ms )
	}
}

