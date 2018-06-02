var fs = require('fs');


module.exports = (d,x) => {
	return new Promise(function(resolve, reject) {
		const newfile = 'playground' + d + '.json'
		console.log('Writing ' + d + ' output to ' + newfile)
		fs.writeFile(newfile, JSON.stringify(x), function(err, response) {
			if (err) {
				reject(err)
			} else {
				console.log(d + ' saved to ' + newfile)
				resolve(response)
			}
		})
	})
}
		
