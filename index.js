export default class GitHubDriver {

  #octokit;

  constructor(octokit) {
    this.#octokit = octokit;
  }

  async findReminder(repository, reminderId) {

    const { owner, name } = repository;
    const issues = await this.#octokit.issues.listForRepo({
      owner,
      repo: name,
      state: 'open',
      labels: reminderId,
    });

    return issues.data;
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
