import { GithubApi } from "./api.js";
import { Storage } from "./storage.js";
import { UI } from "./ui.js";
class App {
  constructor() {
    this.api = new GithubApi();
    this.storage = new Storage();
    this.ui = new UI((username) => {
      this.fetchUser(username);
    });
    this.ui.displayFavUsers((username) => {
      this.fetchUser(username);
    });
  }
  init() {
    this.builer();
    this.restoreFromUrl();
  }
  builer() {
    this.searchBtn = document.getElementById("search-btn");
    this.searchInput = document.getElementById("search-input");
    this.themeToggleBtn = document.getElementById("theme-toggle");
    this.ui.showState(this.ui.stateInitial);

    this.themeToggleBtn.addEventListener("click", () => this.themeToggle());
    this.searchBtn.addEventListener("click", () => {
      const username = this.searchInput.value.trim();
      if (username) {
        this.fetchUser(username);
      }
    });
    window.addEventListener("popstate", () => {
      this.restoreFromUrl();
    });
  }
  async fetchUser(username) {
    try {
      this.ui.displayLoading();
      const user = await this.api.getUser(username);
      console.log(user);
      this.fetchUserRepos(username);
      this.ui.displayUser(user);
      window.history.pushState({}, "", `?user=${username}`);
    } catch (error) {
      this.ui.displayError(error);
    }
  }
  restoreFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const username = params.get("user");
    if (username) {
      this.fetchUser(username);
    } else {
      this.ui.showState(this.ui.stateInitial);
    }
  }
  async fetchUserRepos(username) {
    console.log(`Fetching repos for ${username}...`);
    try {
      const repos = await this.api.getUserRepos(username);
      console.log(repos);
      this.ui.displayRepos(repos);
    } catch (error) {
      console.error(error);
    }
  }

  themeToggle() {
    document.documentElement.classList.toggle("dark");

    console.log(document.documentElement.classList);
    document.documentElement.classList.toggle("light");
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app.init();
});
