import { ok, strictEqual as eq, rejects } from 'node:assert';
import crypto from 'node:crypto';
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

  it('should create issues with labels', async (t) => {
    const repository = { owner: 'acuminous', repo: 'knuff-github-driver' };
    const reminder = {
      id: `test1`,
      title: t.name,
      body: 'the body',
      labels: ['l1', 'l2'],
      date: new Date('2024-12-25T13:00:00Z'),
      timezone: 'Europe/London',
    };
    const { data: issue } = await driver.createReminder(repository, reminder);

    ok(issue.number);
    eq(issue.title, 'should create issues with labels');
    eq(issue.labels.length, 4);

    const labels = issue.labels.map((l) => l.name).sort();
    eq(labels[0], 'knuff:2024-12-25');
    eq(labels[1], `knuff:${reminder.id}`);
    eq(labels[2], 'l1');
    eq(labels[3], 'l2');
  });

  // it('should create issues without labels', async (t) => {
  //   const repository = { owner: 'acuminous', repo: 'knuff-github-driver' };
  //   const reminder = {
  //     id: `test-${crypto.randomBytes(10).toString('hex')}`,
  //     title: t.name,
  //     body: 'the body',
  //     date: new Date('2024-12-25'),
  //     timezone: 'Europe/London',
  //   };
  //   const { data: issue } = await driver.createReminder(repository, reminder);

  //   ok(issue.number);
  //   eq(issue.title, 'should create issues without labels');
  //   eq(issue.labels.length, 2);

  //   const labels = issue.labels.map((l) => l.name).sort();
  //   eq(labels[0], 'knuff:2024-12-25');
  //   eq(labels[1], `knuff:${reminder.id}`);
  // });

  // it('should honour timezones', async (t) => {
  //   const repository = { owner: 'acuminous', repo: 'knuff-github-driver' };
  //   const reminder = {
  //     id: `test-${crypto.randomBytes(10).toString('hex')}`,
  //     title: t.name,
  //     body: 'the body',
  //     labels: ['l1', 'l2'],
  //     date: new Date('2024-12-25T13:00:00Z'),
  //     timezone: 'Australia/Sydney',
  //   };
  //   const { data: issue } = await driver.createReminder(repository, reminder);

  //   ok(issue.number);
  //   eq(issue.title, 'should honour timezones');
  //   eq(issue.labels.length, 4);

  //   const labels = issue.labels.map((l) => l.name).sort();
  //   eq(labels[0], 'knuff:2024-12-26');
  //   eq(labels[1], `knuff:${reminder.id}`);
  //   eq(labels[2], 'l1');
  //   eq(labels[3], 'l2');
  // });

  // it('should reject reminders with labels greater than 50 characters', async (t) => {
  //   const repository = { owner: 'acuminous', repo: 'knuff-github-driver' };
  //   const reminder = {
  //     id: `test-${crypto.randomBytes(10).toString('hex')}`,
  //     title: t.name,
  //     body: 'the body',
  //     labels: ['123456789 123456789 123456789 123456789 123456789 1'],
  //     date: new Date('2024-12-25'),
  //   };

  //   await rejects(() => driver.createReminder(repository, reminder), (error) => {
  //     eq(error.message, "Label '123456789 123456789 123456789 123456789 123456789 1' is longer than the GitHub max length of 50 characters");
  //     return true;
  //   });
  // });

  // it('should reject reminders with an id greater than 46 characters', async (t) => {
  //   const repository = { owner: 'acuminous', repo: 'knuff-github-driver' };
  //   const reminder = {
  //     id: '123456789 123456789 123456789 123456789 12345',
  //     title: t.name,
  //     body: 'the body',
  //     date: new Date('2024-12-25'),
  //   };

  //   await rejects(() => driver.createReminder(repository, reminder), (error) => {
  //     eq(error.message, "Label 'knuff:123456789 123456789 123456789 123456789 12345' is longer than the GitHub max length of 50 characters");
  //     return true;
  //   });
  // });

  // it('should find open issues with the same id and date', async (t) => {
  //   const repository = { owner: 'acuminous', repo: 'knuff-github-driver' };
  //   const reminder = {
  //     id: `test-${crypto.randomBytes(10).toString('hex')}`,
  //     title: t.name,
  //     body: 'the body',
  //     labels: ['l1', 'l2'],
  //     date: new Date('2024-12-25'),
  //   };

  //   await driver.createReminder(repository, reminder);

  //   const found = await driver.hasReminder(repository, reminder);
  //   eq(found, true);
  // });

  // it('should find closed issues with the same id and date', async (t) => {
  //   const repository = { owner: 'acuminous', repo: 'knuff-github-driver' };
  //   const reminder = {
  //     id: `test-${crypto.randomBytes(10).toString('hex')}`,
  //     title: t.name,
  //     body: 'the body',
  //     labels: ['l1', 'l2'],
  //     date: new Date('2024-12-25'),
  //   };

  //   const { data: issue } = await driver.createReminder(repository, reminder);
  //   await closeIssue(issue.number);

  //   const found = await driver.hasReminder(repository, reminder);
  //   eq(found, true);
  // });

  // it('should ignore issues with the same id but different day', async (t) => {
  //   const repository = { owner: 'acuminous', repo: 'knuff-github-driver' };
  //   const reminder = {
  //     id: `test-${crypto.randomBytes(10).toString('hex')}`,
  //     title: t.name,
  //     body: 'the body',
  //     labels: ['l1', 'l2'],
  //     date: new Date('2024-12-25'),
  //     timezone: 'Europe/London',
  //   };

  //   await driver.createReminder(repository, reminder);

  //   const found = await driver.hasReminder(repository, { ...reminder, date: new Date('2024-12-26') });
  //   eq(found, false);
  // });

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
