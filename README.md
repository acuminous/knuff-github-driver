# knuff-github-driver
A GitHub Driver for [Knuff](https://www.npmjs.com/package/knuff)

## Usage
```js
import { Octokit } from '@octokit/rest';
import GitHubDriver from 'knuff-github-driver';
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const driver = new GitHubDriver(octokit);
```
