# Download JSON, Extract Property Action
Download a JSON payload, extract the property you want, and expose it as a result to be used for the next step

## Usage
Inside your `.github/workflows/workflow.yml` file:
```yaml
steps:
- uses: senmu/download-json-property-action@v1.2.0
  with:
    url: 'https://httpbin.org/json'
    property_path: slideshow.author
```

## Input Arguments
This action currently supports two inputs from the user: `url`, and `property-path`.

| Input  | Description | Usage |
| :---:     |     :---:   |    :---:   |
| `url`  | The URL of the JSON to fetch  | Required |
| `property_path`  | The path of the property you want to extract. Deeper properties nested in an object can be retrieved using dot notation thanks to [object-path](https://github.com/mariocasciaro/object-path). | Required |

## Output
* `value`: The retrieved value that lives at the specified `property_path`

Below is an example of how to reference this value in a subsequent step.

### Example `workflow.yml` 

```yaml
name: Fetch JSON and use in a comment
on: [push, pull_request]
jobs:
  fetch-and-comment:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    env:
      OS: ${{ matrix.os }}
    steps:
    - uses: actions/checkout@master
    - name: Install gems
        run: bundle install
    - name: Build and run tests
        run: npm test
    - name: Get code coverage from service
      id: fetch-coverage
      uses: senmu/download-json-property-action@v1.1.0
      with:
        url: 'https://codecoverageservice.com/build/123.json'
        property_path: build.coverage
    - name: Add comment to PR with code coverage
      uses: unsplash/comment-on-pr@master
      env:
      	GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      with:
        msg: ${{ steps.fetch-coverage.outputs.value }}
```

## License
The code in this project is released under the [MIT License](LICENSE)
