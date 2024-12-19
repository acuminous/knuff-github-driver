export default class GitHubDriver {

  #octokit;

  constructor(octokit) {
    this.#octokit = octokit;
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
    const { title, body, labels = [] } = issue;
    return this.#octokit.issues.create({
      owner: organisation,
      repo: name,
      title,
      body,
      labels: [...labels, reminderId],
    });
  }
}
