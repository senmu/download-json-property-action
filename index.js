const core = require('@actions/core');
const https = require('https');
const objectPath = require('object-path');

function getRequest(url) {
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

async function run() {
    try {
        const jsonUrl = core.getInput('url');
        const propertyPath = core.getInput('property-path');

        let response = await getRequest(jsonUrl);
        let obj = JSON.parse(response)
        let result = objectPath.get(obj, propertyPath)

        core.setOutput('value', result);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run()

