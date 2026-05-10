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
    this.compareBtn = document.querySelector("#nav-compare-btn");
    this.compareBtn1 = document.querySelector("#compare-search-input-1");
    this.compareBtn2 = document.querySelector("#compare-search-input-2");
    this.compareBtnSearch = document.querySelector("#compare-search-btn");

    this.compareBtn.addEventListener("click", () => {
      console.log("compare btn clicked");
      this.ui.toggleCompareMode();
    });

    this.compareBtnSearch.addEventListener("click", () => {
      console.log("compare btn search clicked");
      this.fetchCompareUsers();
    });

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
  async fetchCompareUsers() {
    const username1 = this.compareBtn1.value.trim();
    const username2 = this.compareBtn2.value.trim();

    if (!username1 || !username2) {
      console.error("Both usernames required for comparison");
      return;
    }
    try {
      const [user1, user2] = await Promise.all([
        this.api.getUser(username1),
        this.api.getUser(username2),
      ]);

      const [user1Repos, user2Repos] = await Promise.all([
        this.api.getUserRepos(username1),
        this.api.getUserRepos(username2),
      ]);

      console.log("User 1:", user1);
      console.log("User 2:", user2);

      console.log("User 1 Repos:", user1Repos);
      console.log("User 2 Repos:", user2Repos);

      this.ui.displayCompareUsers(user1, user2, user1Repos, user2Repos);

    } catch (error) {
      console.error("Error fetching users for comparison:", error);
      this.ui.displayError(error);
    }
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
