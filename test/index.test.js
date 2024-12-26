import { ok, strictEqual as eq } from 'node:assert';
import zunit from 'zunit';
import { Octokit } from '@octokit/rest';
import GitHubDriver from '../index.js';

const { describe, it, beforeEach, after } = zunit;

describe('driver', () => {

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const driver = new GitHubDriver(octokit);

  beforeEach(async () => {
    await nuke();
  });

  after(async () => {
    await nuke();
  });

  it('should create issues', async (t) => {
    const repository = { owner: 'acuminous', name: 'knuff-github-driver' };
    const reminder = { id: getReminderId(t), title: 'test-issue-1', body: 'the body' };

    const { data: issue } = await driver.createReminder(repository, reminder);

    ok(issue.number);
  });

  it('should find matching issues', async (t) => {
    const repository = { owner: 'acuminous', name: 'knuff-github-driver' };
    const reminder = { id: getReminderId(t), title: 'test-issue-1', body: 'the body' };

    await driver.createReminder(repository, reminder);

    const found = await driver.findReminder(repository, reminder);

    eq(found, true);
  });

  it('should not find closed issues', async (t) => {
    const repository = { owner: 'acuminous', name: 'knuff-github-driver' };
    const reminder = { id: getReminderId(t), title: 'test-issue-1', body: 'the body' };

    const { data: issue } = await driver.createReminder(repository, reminder);
    await closeIssue(issue.number);

    const found = await driver.findReminder(repository, reminder);
    eq(found, false);
  });

  async function nuke() {
    const issues = await listOpenIssues();
    for (let i = 0; i < issues.length; i++) {
      await closeIssue(issues[i].number);
    }
  }

  function getReminderId(t) {
    return process.env.MATRIX_NODE_VERSION ? `${process.env.MATRIX_NODE_VERSION} ${t.name}` : t.name;
  }

  async function listOpenIssues() {
    const { data } = await octokit.issues.listForRepo({
      owner: 'acuminous',
      repo: 'knuff-github-driver',
      state: 'open',
    });
    return data;
  }

  async function closeIssue(number) {
    await octokit.issues.update({
      owner: 'acuminous',
      repo: 'knuff-github-driver',
      issue_number: number,
      state: 'closed',
    });
  }
}, { timeout: 60000 });
