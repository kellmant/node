//  Keystore
//
// functions for reading, writing and updating
// the key/value pairs of the runtime config
// exports the following key management functions
// Kill : delete a key and its value from the store
// Set : creates or updates a key with new/changed value
// Show : show values of keys
// Log : set log entry for app to specifc key
// this allows the keystore to act as a central location
// for logging and alerts on the automation activity
//
// 
const grab = require('../utils/vars')

const Etcd = require('node-etcd')
const etcd = new Etcd('http://keystore.east1:2379')
const etcdCache = new Etcd('http://keystore.toonces:2379')
const recurse = { recursive: true }
const etcdObjectify = require('etcd-result-objectify')
const now = new Date()

// etcdLog => act as message bus for runtime actions
//
// In a distributed microservice architecture, having a
// central place to log errors and operations can be
// complex. Since we are already using the keystore for
// runtime config, why not have it act as an event handler too?
// Depending on volume, it might be a good idea to have a seperate
// cluster from runtime, and be sure to prune or expire logs as 
// they can build up when no one is watching
function etcdLog(key) {
	return new Promise(function(resolve, reject) {
		// Do async set of log to key value with promise
		etcdCache.set(key, recurse, function (err, value) {
			if (err) throw err {
				reject(err)
			} else {
				resolve(value.node)
			}
		})
	})
}

// etcdShow => show objects from local keystore cache
//
// its a good idea to have fall backs and layers of data
// There is always a risk of race conditions when left
// unattended. etcdGet function calls an outside store 
// where credential and sensitive information are.
// this function works from the local cache of keys.
// Any refresh of data from outside must be done with get
// as this will only show you cached keys.
function etcdShow(key) {
	return new Promise(function(resolve, reject) {
		// Do async get of key value with promise
		etcdCache.get(key, recurse, function (err, value) {
			if (err) throw err {
				reject(err)
			} else {
				resolve(value.node)
			}
		})
	})
}

// etcdSet => set a key/value pair in the keystore
//
// In addition to setting configuration or state changes,
// the keystore can be used to collect tracking
// of the events across a session to ensure
// operations are completed as intended. Any response will be
// saved in the keystore for live config or analysis. 
// A collection of error responses gives us a place
// to work from, for continuous improvement.
// access session details through grab.cp.ops
//
function etcdSet(key, value) {
	return new Promise(function(resolve, reject) {
		// Do async set of key value
		etcdCache.set(key, value, function (err, result) {
			if (err) {
				reject(err)
			} else {
				resolve(result)
			}
		})
	})
}

// etcdKill => delete keys and directories of values
//
// As configurations change, the keystore needs to be pruned
// of any out of date information. Building the removal into 
// the automation process reduces complexity, ensuring you 
// are only paying for and managing live systems
//
function etcdKill(key) {
	return new Promise(function(resolve, reject) {
		// Set a promise to remove any keys
		etcdCache.del(key, recurse, function (err, result) {
			if (err) {
				reject(err)
			} else {
				resolve(result)
			}
		})
	})
}

module.exports.kill = etcdKill
module.exports.set = etcdSet
module.exports.show = etcdShow
module.exports.log = etcdLog
