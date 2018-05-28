
	const menus = {
		
	main:` 
		ctrl [command] <options>

		commands .............. show api commands
		show ............. show objects
		version ............ show controller version
		help ............... show controller help
	

	=================================================
							`,
	
	commands:`
		ctrl commands

		 ..... dump api commands
		                          `,

	show:`
		ctrl show <object type>

		hosts .... host objects
		networks .... network objects
		groups .... group objects
		unused-objects .... unused objects
		objects .... all objects
		                           `,

	api:`
		NA ctrl api <options>

		show-objects             .... Collect all objects
		show-hosts               .... Collect all host objects
		show-networks            .... Get network objects
		show-groups              .... Get group object references
		show-simple-gateways     .... Pull gateway objects
		show-unused-objects      .... Get objects not used in policy
		show-data-center-objects .... Get dynamic objects from data centers

		Ex. ctrl api show-objects

		
							`
	}

module.exports = (args) => {
	const subCmd = args._[0] === 'help'
	 ? args._[1]
	 : args._[0]


	console.log(menus[subCmd] || menus.main)

	}


		