# lazylauncher

This is a simple launcher for lazy developers.
If you are starting a new project using handlebars and a mongoDB with express, you can use this launcher to create it.

## Installation

```bash
npm install -g lazylauncher
```

## Usage

```bash
lazylauncher name-of-your-project
```

lazylauncher is going to create a folder with the name of your project and inside it, it will create a package.json file with the dependencies and scripts to start your project.
It's also going to install all dependencies and create a structure of folders and files.

After the installation, you can start your project with:

```bash
cd name-of-your-project
npm run dev
```

Open the browser and go to http://localhost:3000 or the port you have set in the .env file.