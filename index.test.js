const process = require('process');
const cp = require('child_process');
const path = require('path');

test('integration test using httpbin.org', () => {
    process.env['INPUT_URL'] = "https://httpbin.org/json";
    process.env["INPUT_PROPERTY-PATH"] = 'slideshow.author';

    const ip = path.join(__dirname, 'index.js');

    let result = cp.execSync(`node ${ip}`, { env: process.env }).toString();

    expect(result).toContain('::set-output name=value::Yours Truly');
})

