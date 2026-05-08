export class Storage {
  constructor() {
    this.storageKey = "githubUserData";
  }

  toggleFav(username) {
    console.log("Input:", username);
    console.log("Type:", typeof username);
    console.log("Current favs:", this.getFavUsers());
    let favs = this.getFavUsers();
    if (this.isFavourite(username)) {
      favs = favs.filter((user) => user !== username);
    } else {
      favs.push(username);
    }
    localStorage.setItem(this.storageKey, JSON.stringify(favs));
  }
  isFavourite(login) {
    return this.getFavUsers().some((user) => user === login);
  }
  getFavUsers() {
    return JSON.parse(localStorage.getItem(this.storageKey)) || [];
  }
}
