const vorpal = require('vorpal')()
const shell = require('shelljs')
const chalk = require('chalk')
const clear = require('cli-clear')
 
clear();
shell.mkdir('-p',`cloud`)

vorpal
	.delimiter(chalk.bold.cyan('a2k$'))
	.show()

vorpal
    .command('mkdir <folder>', 'Create directory')
    .action(function(args, callback) {
    	const folder = args.folder
      	shell.mkdir('-p',`cloud/${folder}`)
		this.log(chalk.blue(`Folder ${chalk.cyan(folder)} created inside ${chalk.yellow('cloud')} folder`))
      	callback()
    })

vorpal
    .command('rm -rf <folder>', 'Remove directory')
    .action(function(args, callback) {
    	const folder = args.folder
    	const doesFolderExist = shell.ls(`cloud/${folder}`)
    	if(doesFolderExist.code == 2) {
    		this.log(chalk.blue(`Folder '${chalk.cyan(folder)}' does not exists inside ${chalk.yellow('cloud')} folder`))
		}
		else {
      		shell.rm('-rf',`cloud/${folder}`)
			this.log(chalk.blue(`Folder ${chalk.cyan(folder)} deleted inside ${chalk.yellow('cloud')} folder`))	
		}
      	callback()
    })

vorpal
    .command('touch <file>', 'Create a file')
    .action(function(args, callback) {
    	const file = args.file
		shell.touch(`cloud/${file}`)
		this.log(chalk.blue(`File ${chalk.cyan(file)} created inside ${chalk.yellow('cloud')} folder`))
      	callback()
    })

vorpal
    .command('rm <file>', 'Remove a file')
    .action(function(args, callback) {
    	const file = args.file
    	const doesFileExist = shell.cat(`cloud/${file}`)
    	if(doesFileExist.code == 1) {
			this.log(chalk.blue(`No file named '${chalk.cyan(file)}' exists inside ${chalk.yellow('cloud')} folder`))
		}
		else {
      		shell.rm(`cloud/${file}`)
			this.log(chalk.blue(`File ${chalk.cyan(file)} removed from ${chalk.yellow('cloud')} folder`))
		}
      	callback()
    })

vorpal
    .command('write <file> <content> ', 'Write to a file')
    .action(function(args, callback) {
    	const file = args.file
    	const content = args.content
		const doesFileExist = shell.cat(`cloud/${file}`)
		if(doesFileExist.code == 1) {
			this.log(chalk.blue(`No file named '${chalk.cyan(file)}' exists inside ${chalk.yellow('cloud')} folder`))
		}
		else {
			shell.echo(content).to(`cloud/${file}`)
			this.log(chalk.blue(`Copied Content into File ${chalk.cyan(file)} inside ${chalk.yellow('cloud')} folder`))
		}
      	callback()
    })

vorpal
    .command('cat <file>', 'Show file contents')
    .action(function(args, callback) {
    	const file = args.file
		const contents = shell.cat(`cloud/${file}`)
		if(contents.code == 1) {
			this.log(chalk.blue(`No file named '${chalk.cyan(file)}' exists inside ${chalk.yellow('cloud')} folder`))
	 		res.json({msg: `No file named '${file}' exists inside 'cloud' folder`})
		}
		else {
			this.log(chalk.blue(`Contents of the file '${chalk.cyan(file)}' inside ${chalk.yellow('cloud')} folder are ${chalk.green(contents == '' ? 'Empty': contents)}`))
	 	}
      	callback()
    })