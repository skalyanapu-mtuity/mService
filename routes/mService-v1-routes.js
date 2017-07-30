/**
 * @name mService-v1-api
 * @description This module packages the MService API.
 */
'use strict';

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
const jwtAuth = require('fwsp-jwt-auth');const ServerResponse = require('fwsp-server-response');

let serverResponse = new ServerResponse();
serverResponse.enableCORS(true);express.response.sendError = function(err) {
  serverResponse.sendServerError(this, {result: {error: err}});
};
express.response.sendOk = function(result) {
  serverResponse.sendOk(this, {result});
};

express.response.sendError = function(result) {
  serverResponse.sendServerError(this, {result});
};

let api = express.Router();
//hydraExpress.validateJwtToken()
api.get('/',
(req, res) => {
  res.sendOk({greeting: 'Welcome to Hydra Express!'});
});



api.get('/fetch-json',
  (req, res) => {
  let message = hydra.createUMFMessage({
    to: 'mserviceinvoker-service:[get]/v1/mServiceInvoker/return-json',
    from: 'mservice-service:/',
    body: {
      id:req.query.id
    }
  });
return hydra.makeAPIRequest(message)
    .then((response) => {
    res.sendOk({msg:response});
})
 .catch(err => {
  res.sendError(err);
  });
});


module.exports = api;
