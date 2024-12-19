# knuff-github-driver

[![NPM version](https://img.shields.io/npm/v/knuff-github-driver.svg?style=flat-square)](https://www.npmjs.com/package/knuff-github-driver)
[![Node.js CI](https://github.com/acuminous/knuff-github-driver/workflows/Node.js%20CI/badge.svg)](https://github.com/acuminous/knuff-github-driver/actions?query=workflow%3A%22Node.js+CI%22)
[![Code Climate](https://codeclimate.com/github/acuminous/knuff-github-driver/badges/gpa.svg)](https://codeclimate.com/github/acuminous/knuff-github-driver)
[![Test Coverage](https://codeclimate.com/github/acuminous/knuff-github-driver/badges/coverage.svg)](https://codeclimate.com/github/acuminous/knuff-github-driver/coverage)
[![Discover zUnit](https://img.shields.io/badge/Discover-zUnit-brightgreen)](https://www.npmjs.com/package/zunit)

A GitHub Driver for [Knuff](https://www.npmjs.com/package/knuff-github-driver)

## Usage
```js
import { Octokit } from '@octokit/rest';
import GitHubDriver from 'knuff-github-driver';
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const driver = new GitHubDriver(octokit);
```
