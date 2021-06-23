const express = require("express");
const https = require("https");
const http = require("http");
const auth = require("basic-auth");
const { validateSSLCert, validateSSLKey, validateCertKeyPair} = require("ssl-validator");
require("dotenv").config();

const { connect, authorize, ObjectID } = require("./database");
const { serviceName, httpPort, httpsPort } = require("./config");

(async function() {
    await connect();

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    app.get("/", function(req, res) {
        res.status(200).send();
    });

    // Authorize each request against our services collection
    app.use(async function(req, res, next) {
        const credentials = auth.parse(req.headers.authorization);
        if (credentials && ObjectID.isValid(credentials.pass) && await authorize(credentials.name, new ObjectID(credentials.pass))) {
            next();
        } else {
            res.status(401).json({error: "not authorized"});
        }
    });

    app.use(require("./routes"));

    app.use("*", function(req, res) {
        res.status(404).json({error: "no route found"});
    });
        
    if (process.env.SSL_KEY && process.env.SSL_CERTIFICATE) {
        try {
            validateSSLCert(process.env.SSL_CERTIFICATE);
            validateSSLKey(process.env.SSL_KEY);
            validateCertKeyPair(process.env.SSL_CERTIFICATE, process.env.SSL_KEY);
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
        
        const httpsOptions = {
            key: process.env.SSL_KEY,
            cert: process.env.SSL_CERTIFICATE
        };

        https.createServer(httpsOptions, app).listen(httpsPort);
        http.createServer(express().use(function(req, res) {
            res.redirect(`https://${req.headers.host}${req.url}`);
        })).listen(httpPort);
        console.log(`${serviceName} running https on port: ${httpsPort}, and redirecting http on port: ${httpPort}...`);
    }

    http.createServer(app).listen(httpPort);
        console.log(`${serviceName} running http on port: ${httpPort}...`);
})();