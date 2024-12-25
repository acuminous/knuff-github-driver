export default class GitHubDriver {

  #octokit;

  constructor(octokit) {
    this.#octokit = octokit;
  }

  async findReminder(repository, reminder) {

    const { owner, name } = repository;
    const issues = await this.#octokit.issues.listForRepo({
      owner,
      repo: name,
      state: 'open',
      labels: reminder.id,
    });

    return issues.data.length > 0;
  }

  async createReminder(repository, reminder) {
    const { owner, name } = repository;
    const { title, body, labels = [] } = reminder;
    return this.#octokit.issues.create({
      owner,
      repo: name,
      title,
      body,
      labels: [...labels, reminder.id],
    });
  }
}
