# knuff-github-driver

[![NPM version](https://img.shields.io/npm/v/@acuminous/knuff-github-driver.svg?style=flat-square)](https://www.npmjs.com/package/@acuminous/knuff-github-driver)
[![Node.js CI](https://github.com/acuminous/knuff-github-driver/workflows/Node.js%20CI/badge.svg)](https://github.com/acuminous/knuff-github-driver/actions?query=workflow%3A%22Node.js+CI%22)
[![Code Climate](https://codeclimate.com/github/acuminous/knuff-github-driver/badges/gpa.svg)](https://codeclimate.com/github/acuminous/knuff-github-driver)
[![Test Coverage](https://codeclimate.com/github/acuminous/knuff-github-driver/badges/coverage.svg)](https://codeclimate.com/github/acuminous/knuff-github-driver/coverage)
[![Discover zUnit](https://img.shields.io/badge/Discover-zUnit-brightgreen)](https://www.npmjs.com/package/zunit)

A GitHub driver for [Knuff](https://www.npmjs.com/package/knuff-github-driver)

## Usage
```js
import { Octokit } from '@octokit/rest';
import GitHubDriver from 'knuff-github-driver';
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const driver = new GitHubDriver(octokit);
```

### Authentication
GitHub provides multiple authentication methods. The most simple is GitHub Action Token authentication. When run from a GitHub Action, the GITHUB_TOKEN environment variable is automatically set, but only permits Knuff to post issues to the repository that houses the action.

If you need to post to a different repository, and your usage is still moderate, then a fine grained personal access token with read+write issue permissions is the way to go.

If you are using Knuff with lots of teams and repositories, then you may find you are rate limited. In this case your best option is to register a GitHub App and use an installation token, however the token acquisition and refresh process is cumbersome.
