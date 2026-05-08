export class UserModel {
  constructor(data) {
    this.name = data.login;
    this.avatarUrl = data.avatar_url;
    this.bio = data.bio || "No bio provided";
    this.location = data.location || "No location provided";
    this.publicRepos = data.public_repos;
    this.followers = data.followers;
    this.following = data.following;
    this.profileUrl = data.html_url;
  }
}
