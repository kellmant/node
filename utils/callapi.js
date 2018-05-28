process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const axios = require('axios')
//const cpRest = axios.create()
//axios.defaults.headers.common['content-Type'] = 'application/json'
//axios.defaults.headers.post['Content-Type'] = 'application/json'
//cpRest.defaults.timeout = 10500;

// called by main() runtime to process change event
// using sid for authentication object in api header X-chkp-sid
// using axios module for http API calls
module.exports = (myPost) =>  {
	return new Promise(function(resolve, reject) {
		axios.defaults.headers.common['Accept'] = 'application/json'
		axios(myPost)
			.then(function (value, err) {
			if (err) {
				reject(err)
			} else {
				resolve(value.data)
			}
		})
	})
}

// baseURL: myPost.apihost,
// url: myPost.cmd,
// headers: {'X-chkp-sid': myPost.sid},
// data: { 'offset': myPost.offset, 'limit': myPost.pagelimit, 'details-level': myPost.objdetail }
//
