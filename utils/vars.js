// variable store
//
// local variable object to manage key locations
// authkey stores the API authentication
// situation keeps a log of events within a session
// cpstate is the active session id and token
//
const auth = 'ctrl/cfg/mg/smc/config_system/'

const cp = {
	ops : 'api/session/',
	stat : 'cp/'
}

// access vars with .auth, .cp as exported
// use this for maintaining consistent constants
// (alliteration not intended, but my new favorite saying)
//
module.exports.auth = auth
module.exports.cp = cp

// var information commented in cmds/login.js as well
//
// Used to grab local vars for authkey, situation and cpstate
// these are all pointers to locations in the keystore
// accessed through <require assigned var>.myvar.[key] = value
//
// authkey: holds auth for api admin in these keys
// 	the entire smc config is pulled in and
// 	user (key=mgmt_admin_name), password (key=mgmt_admin_passwd)
// 	and hostname (key=hostname) are extracted.
// 	This data is sourced from the config_system
// 	used to build the R80 manager.
//
// situation: stores the event activity per session
// 	Can be any location, using session id from
// 	manager to track, but can be any identifier
// 	following a format of saving the event operation
// 	as the key, and the return data as the value.
// 	.uid/<operation> = return value
//
// cpstate: holds the active session id and token
// 	.uid is generated as an identifier
// 	.sid is required to authorize the session
// 	.url is the http call you will send post requests
// 	additional information is stored for debug if needed
//
