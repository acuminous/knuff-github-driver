export default class GitHubDriver {

  #octokit;

  constructor(octokit) {
    this.#octokit = octokit;
  }

  async hasReminder(repository, reminder) {
    const { owner, name } = repository;
    const issues = await this.#octokit.issues.listForRepo({
      owner,
      repo: name,
      state: 'all',
      labels: this.#getKnuffLabels(reminder),
    });

    return issues.data.length > 0;
  }

  async createReminder(repository, reminder) {
    const { owner, name: repo } = repository;
    const { title, body, labels = [] } = reminder;
    return this.#octokit.issues.create({
      owner,
      repo,
      title,
      body,
      labels: this.#getLabels(labels, reminder),
    });
  }

  #getLabels(original, reminder) {
    const labels = [...original, ...this.#getKnuffLabels(reminder)];
    this.#validateLabels(labels);
    return labels;
  }

  #getKnuffLabels(reminder) {
    return [this.#getKnuffIdLabel(reminder.id), this.#getKnuffDateLabel(reminder.date)];
  }

  #getKnuffIdLabel(id) {
    return `knuff:${id}`;
  }

  #getKnuffDateLabel(date) {
    return `knuff:${date.toISOString().split('T')[0]}`;
  }

  #validateLabels(labels) {
    labels.forEach((label) => {
      if (label.length > 51) throw new Error(`Label '${label}' is longer than the GitHub max length of 51 characters`);
    });
  }
}
