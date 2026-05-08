export class RepoModel {
  constructor(data) {
    this.name = data.name;
    this.description = data.description || "No description provided";
    this.language = data.language || "Unknown";
    this.stars = data.stargazers_count;
    this.visibility = data.visibility || "public";
    this.htmlUrl = data.html_url;
  }
}
