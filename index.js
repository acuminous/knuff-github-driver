const { Octokit } = require('@octokit/rest');

class GitHubDriver {

  #authStrategy;
  #octokit;

  constructor(authStrategy) {
    this.#authStrategy = authStrategy;
    this.#octokit = new Octokit({ authStrategy });
  }

  async findIssue(repository, reminderId) {
    const { organisation, name } = repository;
    const issues = await this.#octokit.issues.listForRepo({
      owner: organisation,
      repo: name,
      state: 'open',
      labels: reminderId,
    });

    return issues.data;
  }

  async createIssue(repository, reminderId, issue) {
    const { organisation, name } = repository;
    const { title, body, labels } = issue;
    await this.#octokit.issues.create({
      owner: organisation,
      repo: name,
      title,
      body,
      labels: [...labels, reminderId],
    });
  }
}

module.exports = GitHubDriver;
