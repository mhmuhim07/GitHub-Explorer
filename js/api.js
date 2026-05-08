import { UserModel } from "./models/user_model.js";
import { RepoModel } from "./models/repo_model.js";
export class GithubApi {
  #baseUrl = "https://api.github.com";

  async getUser(username) {
    try {
      const response = await fetch(`${this.#baseUrl}/users/${username}`);
      if (!response.ok) {
        throw new Error(`User ${username} not found`);
      }
      const res = await response.json();
      const user = new UserModel(res);
      return user;
    } catch (error) {
      throw error;
    }
  }
  

  
  

  async getUserRepos(username) {
    try {
      const response = await fetch(`${this.#baseUrl}/users/${username}/repos`);
      if (!response.ok) {
        throw new Error(`Repos for user ${username} not found`);
      }
      const repos = await response.json();
      const repoModels = repos.map((repo) => new RepoModel(repo));
      return repoModels;
    } catch (error) {
      throw error;
    }
  }
}
