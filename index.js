#!/usr/bin/env node

// fs is a Node standard library package for reading and writing files
const fs = require('fs');

// path is a Node standard library package for working with file and directory paths
const path = require('path');
const ncp = require('ncp').ncp;
const templatePackageJson = require('./templates/packagejson.js');
const { exec } = require('child_process');
const { red, yellow, green } = require('colorette');

const replaceAppNameInFile = (filePath, appName) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const updatedContent = content.replace(/{{APP_NAME}}/g, appName);
    fs.writeFileSync(filePath, updatedContent);
}

const copyTemplateFolder = (src, dest, appName) => {
    ncp(src, dest, (err) => {

        if (err) {
            console.error(err);
            // process exti will exit the process with an exit code
            // code 1 means that the process failed
            process.exit(1);
        }

        // Replace the placeholder with the actual app name in the db.js file
        // dest is the destination folder
        const dbPath = path.join(dest, 'db/index.js');
        replaceAppNameInFile(dbPath, appName);

        fs.renameSync(path.join(dest, '_gitignore'), path.join(dest, '.gitignore'));
        fs.renameSync(path.join(dest, '_env'), path.join(dest, '.env'));
        
        console.log('Template folder copied, please be patient...');
    });
};

const installDependencies = (projectPath, callback) => {
    console.log(yellow('Installing dependencies...'));

    exec('npm install', { cwd: projectPath }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error installing dependencies: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Error output: ${stderr}`);
        }
        console.log('Dependencies installed');
        if (callback) callback();
    });
};


// create a project folder
const createProject = (projectName) => {

    // process.cwd() returns the current working directory of the Node.js process
    const projectPath = path.join(process.cwd(), projectName);

    if (!fs.existsSync(projectPath)) {
        fs.mkdirSync(projectPath);
        console.log(`Project folder ${projectName} created!`);
    }
    else {
        console.log(`Project folder ${projectName} already exists!`);
        return;
    }

    const folders = [
        'config',
        'db',
        'models',
        'public',
        'routes',
        'views'
    ];

    folders.forEach((folder) => {
        const folderPath = path.join(projectPath, folder);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
    });

    // Create package.json file
    const packageJsonContent = templatePackageJson(projectName);
    const packageJsonPath = path.join(projectPath, 'package.json');

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJsonContent, null, 2));


    // Copy the template folder to the project folder
    const templateFolderPath = path.join(__dirname, 'templates/folders-template');
    const destinationFolderPath = path.join(projectPath);

    copyTemplateFolder(templateFolderPath, destinationFolderPath, projectName);

    // Copy files to the project folder
    const filesToCopy = [
        '_gitignore',
        '_env',
        'server.js',
        'app.js',
    ];

    filesToCopy.forEach((file) => {
        const srcPath = path.join(__dirname, `templates/${file}`);
        const destPath = path.join(projectPath, file);
        fs.copyFileSync(srcPath, destPath);
    });

    installDependencies(projectPath, () => {
        console.log(yellow('Project created successfully!'));
        console.log('Type ' + green(`"cd ${projectName}"`) + ' to enter the project folder and ' + green('"npm run dev"') + ' to start the server.');
    });
}

// Get command-line arguments
const args = process.argv.slice(2);

// If there is at least one argument, pass it to createProjectFolder as the project name
if (args.length > 0) {
    createProject(args[0]);
} else {
    console.error("Error: Please provide a project name.");
}

