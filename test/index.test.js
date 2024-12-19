import { ok, strictEqual as eq } from 'node:assert';
import zunit from 'zunit';
import { Octokit } from '@octokit/rest';
import GitHubDriver from '../index.js';

const { describe, it, beforeEach, after } = zunit;

describe('knuff-github-driver', () => {

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const driver = new GitHubDriver(octokit);

  beforeEach(async () => {
    await nuke();
  });

  after(async () => {
    await nuke();
  });

  it('should create issues', async (t) => {
    const repository = { organisation: 'acuminous', name: 'knuff-github-driver' };
    const { data: issue } = await driver.createIssue(repository, t.name, { title: 'test-issue-1', body: 'the body' });
    ok(issue.number);
  });

  it('should find all matching issues', async (t) => {
    const repository = { organisation: 'acuminous', name: 'knuff-github-driver' };

    await driver.createIssue(repository, t.name, { title: 'test-issue-1', body: 'the body' });
    await driver.createIssue(repository, t.name, { title: 'test-issue-2', body: 'the body' });
    await driver.createIssue(repository, 'other', { title: 'test-issue-3', body: 'the body' });

    const issues = await driver.findIssue(repository, t.name);
    eq(issues.length, 2);
  });

  it('should not find closed issues', async (t) => {
    const repository = { organisation: 'acuminous', name: 'knuff-github-driver' };

    const { data: issue1 } = await driver.createIssue(repository, t.name, { title: 'test-issue-1', body: 'the body' });
    await driver.createIssue(repository, t.name, { title: 'test-issue-2', body: 'the body' });
    await driver.createIssue(repository, t.name, { title: 'test-issue-3', body: 'the body' });

    await closeIssue(issue1.number);

    const issues = await driver.findIssue(repository, t.name);
    eq(issues.length, 2);
  });

  async function nuke() {
    const issues = await listOpenIssues();
    for (let i = 0; i < issues.length; i++) {
      await closeIssue(issues[i].number);
    }
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