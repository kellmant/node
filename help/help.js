
	const menus = {
		
	main:` 
		ctrl [command] <options>

		commands .............. cache api commands in keystore (api/)
		show ............. show objects
		backup ............. backup objects from manager
		version ............ show controller version
		help ............... show controller help
	

	=================================================
							`,
	
	commands:`
		ctrl commands

		 ..... dump api commands to keystore 
		                          `,

	show:`
		ctrl show <object type>

		hosts .... host objects
		networks .... network objects
		groups .... group objects
		unused-objects .... unused objects
		all <async> .... get all the main object types (add 'async' for concurrent gets)
		objects .... all objects in the domain
		                           `,

	backup:`
		ctrl backup <options>

		all                 .... backup all objects
		hosts               .... backup host objects
		networks            .... backup network objects
		groups              .... backup group object references

		Ex. ctrl backup show-objects

		
							`
	}

module.exports = (args) => {
	const subCmd = args._[0] === 'help'
	 ? args._[1]
	 : args._[0]


	console.log(menus[subCmd] || menus.main)

	}


		
