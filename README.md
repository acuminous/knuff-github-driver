# knuff-github-driver

A GitHub driver for [Knuff](https://www.npmjs.com/package/@acuminous/knuff)

## Installation
```
npm i @acuminous/knuff-github-driver
```

## Usage
```js
import { Octokit } from '@octokit/rest';
import GitHubDriver from 'knuff-github-driver';

const config = {
  repositories: {
    'acuminous/knuff': {
      owner: 'acuminous',
      repo: 'knuff',
      driver: 'github',
    },
  },
};

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const driver = new GitHubDriver(octokit);
const drivers = { github: new GitHubDriver(octokit) };
const knuff = new Knuff(config, drivers)
```

The driver adds two labels, `knuff:${reminder.id}` and `knuff:${reminder.date}` to enable duplicate checking. If an open or closed issue exists with both these labels, it will not be recreated. GitHub enforces a maximum label length of 51 characters, so if the reminder has any labels (including the knuff generated ones) longer than this the driver will throw an error.

## Repository Configuration
| Name  | Type   | Notes |
|-------|--------|-------|
| owner | string | the owner of the GitHub repository |
| repo  | string | the name of the GitHub repository  |

### Authentication

#### GitHub Action Token
GitHub provides multiple authentication methods. The most simple is GitHub Action Token authentication. When run from a GitHub Action, the GITHUB_TOKEN environment variable is automatically set, but only permits Knuff to post issues to the repository that houses the action.

#### Personal Access Token
If you need to post to a different repository, and your usage is still moderate, then a fine grained personal access token with read+write issue permissions is the way to go.

#### GitHub App Installation Token
If you are using Knuff with lots of teams and repositories, then you may find you are rate limited. In this case your best option is to register a GitHub App and use an installation token, however the token acquisition and refresh process is cumbersome.
