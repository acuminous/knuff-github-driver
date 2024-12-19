const { describe, it } = require('zunit');
const { createTokenAuth } = require('@octokit/auth-token');
const GitHubDriver = require('..');

describe('knuff-github-driver', async () => {

  it('should create issues', async (t) => {
    const authStrategy = createTokenAuth('your-personal-access-token');
    const driver = new GitHubDriver({ authStrategy });
    const repository = { organisation: 'acuminous', name: 'knuff-github-driver' };
    const issue = {
      title: t.name,
      body: '- [ ] Some task\n- [ ] Another task',
      labels: ['reminder', 'chore'],
    };
    await driver.createIssue(repository, t.name.replace(/ /g, '-'), issue);
  });

});
