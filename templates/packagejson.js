const templatePackageJson = (appName) => {
    return {
        name: appName,
        version: "1.0.0",
        private: true,
        scripts: {
            start: "node server.js",
            dev: "nodemon server.js -e js,css,hbs"
        },
        dependencies: {
            "bcryptjs": "^2.4.3",
            "connect-mongo": "^5.0.0",
            "cookie-parser": "^1.4.5",
            "dotenv": "^8.2.0",
            "express": "^4.17.1",
            "express-session": "^1.17.3",
            "hbs": "^4.1.1",
            "mongoose": "^6.1.2",
            "morgan": "^1.10.0",
            "serve-favicon": "^2.5.0"
        },
        devDependencies: {
            "nodemon": "^2.0.7"
        }
    };
};

module.exports = templatePackageJson;  