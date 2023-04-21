#!/usr/bin/env node

// fs is a Node standard library package for reading and writing files
const fs = require('fs');

// path is a Node standard library package for working with file and directory paths
const path = require('path');

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

}

// Get command-line arguments
const args = process.argv.slice(2);

// If there is at least one argument, pass it to createProjectFolder as the project name
if (args.length > 0) {
  createProject(args[0]);
} else {
  console.error("Error: Please provide a project name.");
}

