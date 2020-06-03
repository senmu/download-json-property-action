const core = require('@actions/core');
const https = require('https');
const objectPath = require('object-path');

async function getRequest(url) {
    return new Promise((resolve, reject) => {
        https.get(url, response => {
            let data = '';
            response.on('data', chunk => {
                data += chunk;
            });

            response.on('end', () => {
                resolve(data);
            });
        }).on('error', err => {
            reject(err);
        });
    });
}

let extractValue = function (jsonString, path) {
    let jsonObject = JSON.parse(jsonString)
    return objectPath.get(jsonObject, path)
}

async function run() {
    try {
        const jsonUrl = core.getInput('url');
        const propertyPath = core.getInput('property-path');

        core.debug(`Fetching ${jsonUrl}`);
        core.debug(`Property: ${propertyPath}`);

        let response = await getRequest(jsonUrl);
        let result = extractValue(response, propertyPath);

        core.setOutput('value', result);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run()

module.exports = extractValue;
