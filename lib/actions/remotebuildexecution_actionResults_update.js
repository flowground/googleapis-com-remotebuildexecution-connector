/**
 * Auto-generated action file for "Remote Build Execution" API.
 *
 * Generated at: 2019-05-07T14:41:53.685Z
 * Mass generator version: 1.1.0
 *
 * flowground :- Telekom iPaaS / googleapis-com-remotebuildexecution-connector
 * Copyright © 2019, Deutsche Telekom AG
 * contact: flowground@telekom.de
 *
 * All files of this connector are licensed under the Apache 2.0 License. For details
 * see the file LICENSE on the toplevel directory.
 *
 *
 * Operation: 'remotebuildexecution.actionResults.update'
 * Endpoint Path: '/v2/{instanceName}/actionResults/{hash}/{sizeBytes}'
 * Method: 'put'
 *
 */

const Swagger = require('swagger-client');
const processWrapper = require('../services/process-wrapper');
const spec = require('../spec.json');

// this wrapers offers a simplified emitData(data) function
module.exports.process = processWrapper(processAction);

// parameter names for this call
const PARAMETERS = [
    "hash",
    "instanceName",
    "resultsCachePolicy.priority",
    "sizeBytes",
    "fields",
    "key",
    "oauth_token",
    "prettyPrint",
    "quotaUser",
    "uploadType",
    "upload_protocol"
];

// mappings from connector field names to API field names
const FIELD_MAP = {
    "hash": "hash",
    "instanceName": "instanceName",
    "resultsCachePolicy_priority": "resultsCachePolicy.priority",
    "sizeBytes": "sizeBytes",
    "fields": "fields",
    "key": "key",
    "oauth_token": "oauth_token",
    "prettyPrint": "prettyPrint",
    "quotaUser": "quotaUser",
    "uploadType": "uploadType",
    "upload_protocol": "upload_protocol",
    "executionCompletedTimestamp": "executionCompletedTimestamp",
    "executionStartTimestamp": "executionStartTimestamp",
    "inputFetchCompletedTimestamp": "inputFetchCompletedTimestamp",
    "inputFetchStartTimestamp": "inputFetchStartTimestamp",
    "outputUploadCompletedTimestamp": "outputUploadCompletedTimestamp",
    "outputUploadStartTimestamp": "outputUploadStartTimestamp",
    "queuedTimestamp": "queuedTimestamp",
    "worker": "worker",
    "workerCompletedTimestamp": "workerCompletedTimestamp",
    "workerStartTimestamp": "workerStartTimestamp",
    "executionMetadata": "executionMetadata",
    "exitCode": "exitCode",
    "outputDirectories": "outputDirectories",
    "outputDirectorySymlinks": "outputDirectorySymlinks",
    "outputFileSymlinks": "outputFileSymlinks",
    "outputFiles": "outputFiles",
    "stderrDigest": "stderrDigest",
    "stderrRaw": "stderrRaw",
    "stdoutDigest": "stdoutDigest",
    "stdoutRaw": "stdoutRaw",
    "requestBody": "requestBody"
};

function processAction(msg, cfg) {
    var isVerbose = process.env.debug || cfg.verbose;

    if (isVerbose) {
        console.log(`---MSG: ${JSON.stringify(msg)}`);
        console.log(`---CFG: ${JSON.stringify(cfg)}`);
        console.log(`---ENV: ${JSON.stringify(process.env)}`);
    }

    const contentType = 'application/json';

    const body = msg.body;
    mapFieldNames(body);

    let parameters = {};
    for(let param of PARAMETERS) {
        parameters[param] = body[param];
    }

    // credentials for this operation
    let securities = {};
    securities['Oauth2'] = {token: cfg['Oauth2']};

    let callParams = {
        spec: spec,
        operationId: 'remotebuildexecution.actionResults.update',
        pathName: '/v2/{instanceName}/actionResults/{hash}/{sizeBytes}',
        method: 'put',
        parameters: parameters,
        requestContentType: contentType,
        requestBody: body.requestBody,
        securities: {authorized: securities},
        server: spec.servers[cfg.server] || cfg.otherServer,
    };

    if (isVerbose) {
        let out = Object.assign({}, callParams);
        out.spec = '[omitted]';
        console.log(`--SWAGGER CALL: ${JSON.stringify(out)}`);
    }

    // Call operation via Swagger client
    return Swagger.execute(callParams).then(data => {
        // emit a single message with data
        this.emitData(data);

        // if the response contains an array of entities, you can emit them one by one:

        // data.obj.someItems.forEach((item) => {
        //     this.emitData(item);
        // }
    });
}

function mapFieldNames(obj) {
    if(Array.isArray(obj)) {
        obj.forEach(mapFieldNames);
    }
    else if(typeof obj === 'object' && obj) {
        Object.keys(obj).forEach(key => {
            mapFieldNames(obj[key]);

            let goodKey = FIELD_MAP[key];
            if(goodKey && goodKey !== key) {
                obj[goodKey] = obj[key];
                delete obj[key];
            }
        });
    }
}