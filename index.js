import { DateTime } from 'luxon';

export default class GitHubDriver {

  #octokit;

  constructor(octokit) {
    this.#octokit = octokit;
  }

  async hasReminder(repository, reminder) {
    const { owner, name, repo } = repository;
    const labels = this.#getKnuffLabels(reminder);
    const issues = await this.#octokit.issues.listForRepo({
      owner,
      repo: repo || name,
      state: 'all',
      labels,
    });

    return issues.data.length > 0;
  }

  async createReminder(repository, reminder) {
    const { owner, name, repo } = repository;
    const { title, body, labels: customLabels = [] } = reminder;
    const labels = this.#getLabels(customLabels, reminder);

    return this.#octokit.issues.create({
      owner,
      repo: repo || name,
      title,
      body,
      labels,
    });
  }

  #getLabels(original, reminder) {
    const labels = [...original, ...this.#getKnuffLabels(reminder)];
    this.#validateLabels(labels);
    return labels;
  }

  #getKnuffLabels(reminder) {
    return [this.#getKnuffIdLabel(reminder), this.#getKnuffDateLabel(reminder)];
  }

  #getKnuffIdLabel(reminder) {
    return `knuff:${reminder.id}`;
  }

  #getKnuffDateLabel(reminder) {
    return `knuff:${DateTime.fromJSDate(reminder.date).setZone(reminder.timezone).toFormat('yyyy-MM-dd')}`;
  }

  #validateLabels(labels) {
    const maxLength = 50;
    labels.forEach((label) => {
      if (label.length > maxLength) throw new Error(`Label '${label}' is longer than the GitHub max length of ${maxLength} characters`);
    });
  }
}
