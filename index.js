const core = require('@actions/core');
const https = require('https');
const objectPath = require('object-path');

async function run() {
    try {
        const jsonUrl = core.getInput('url');
        const property = core.getInput('property');

        core.debug(`Fetching ${jsonUrl}`);
        core.debug(`Property: ${property}`);
        let data = '';
        await https.get(jsonUrl, response => {
            response.on('data', chunk => {
                data += chunk;
            });

            response.on('end', () => {
                core.debug(`Finished request`);

                let object = JSON.parse(data);
                let result = objectPath.get(object, property);
                core.setOutput('value', result);
            });
        }).on('error', err => {
            throw new Error(err);
        });
    } catch (error) {
        core.setFailed(error.message);
    }
}

run()
