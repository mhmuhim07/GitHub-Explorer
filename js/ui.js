import { Storage } from "./storage.js";
export class UI {
    constructor(fetchUserCallback) {
        this.storage = new Storage();
        this.currentUser = null;
        this.stateInitial = document.getElementById('state-initial');
        this.stateLoading = document.getElementById('state-loading');
        this.stateError = document.getElementById('state-error');
        this.stateResults = document.getElementById('state-results');

        document.getElementById('save-fav-btn').addEventListener('click', () => {
            if (this.currentUser) {
                this.storage.toggleFav(this.currentUser.name);
                this.updateFavBtn();
                this.displayFavUsers((username) => {
                    fetchUserCallback(username);
                });
            }
        });
    }
    updateFavBtn() {
        const isFav     = this.isFav(this.currentUser.name);
        const saveFavBtn = document.getElementById('save-fav-btn');
        const favBtn    = `<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1">star</span> Remove from Favourites`;
        const notFavBtn = `<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0">star</span> Save to Favourites`;
        saveFavBtn.innerHTML = isFav ? favBtn : notFavBtn;
    }

    showState(stateElement) {
        [this.stateInitial, this.stateLoading, this.stateError, this.stateResults].forEach(el => {
            el.classList.add('hidden'); 
        });
        stateElement.classList.remove('hidden');
    }

    isFav(username) {
        return this.storage.getFavUsers().includes(username);
    }

    displayUser(user){
        this.currentUser = user;

        const saveFavBtn = document.getElementById('save-fav-btn');
        saveFavBtn.innerHTML = '';
        document.getElementById('profile-name').textContent = user.name;
        document.getElementById('profile-login').textContent = `@${user.name}`;
        document.getElementById('profile-avatar').src = user.avatarUrl;
        document.getElementById('profile-bio').textContent = user.bio;
        document.getElementById('profile-repos').textContent = `Repos: ${user.publicRepos}`;
        document.getElementById('profile-followers').textContent = `Followers: ${user.followers}`;
        document.getElementById('profile-following').textContent = `Following: ${user.following}`;
        document.getElementById('view-github-link').href = user.profileUrl;
        this.updateFavBtn();
        
        this.showState(this.stateResults);
    }
    
    displayError(error){
        this.showState(this.stateError);
        console.log(error);
        // document.getElementById('error-message').textContent = error.message;
    }

    displayLoading(){
        this.showState(this.stateLoading);
    }

    displayInitial(){
        this.showState(this.stateInitial);
    }
    displayRepos(repos){
        const reposContainer = document.getElementById('repos-container');
        reposContainer.innerHTML = ''; // Clear previous repos
        repos.forEach(repo => {
            const repoCard = document.createElement('div');
            repoCard.className = 'repo-card bg-surface-container-lowest border border-outline-variant rounded-xl p-md hover:border-primary hover:shadow-md transition-all group';
            repoCard.innerHTML = `
                        <div class="flex justify-between items-start">
                            <h4 id="repo-name" class="font-h3 text-h3 text-primary group-hover:underline cursor-pointer">${repo.name}
                            </h4>
                            <span
                                id="repo-visibility" class="border border-outline-variant rounded-full px-sm py-xs font-label-md text-label-md text-on-surface-variant bg-surface">${repo.visibility}</span>
                        </div>
                        <p id="repo-description" class="font-body-md text-body-md text-on-surface-variant mt-sm line-clamp-2">${repo.description}</p>
                        <div class="flex items-center gap-md mt-lg">
                            <div class="flex items-center gap-xs">
                                <span class="w-3 h-3 rounded-full bg-yellow-400"></span>
                                <span id="repo-language" class="font-label-md text-label-md text-on-surface-variant">${repo.language}</span>
                            </div>
                            <div class="flex items-center gap-xs text-on-surface-variant">
                                <span class="material-symbols-outlined text-[16px]" data-icon="star">star</span>
                                <span id="repo-stars" class="font-label-md text-label-md">${repo.stars.toLocaleString()}</span>
                            </div>
                            <a id="view-github-link" href="${repo.htmlUrl}" target="_blank"
                                class="flex items-center gap-xs bg-on-tertiary-fixed-variant text-on-primary px-lg py-sm rounded-lg
                                 font-label-md text-label-sm hover:bg-primary-container transition-all">
                                <span class="material-symbols-outlined text-[18px]"
                                    data-icon="open_in_new">open_in_new</span>
                                View on GitHub
                            </a>
                        </div>
            `
            reposContainer.appendChild(repoCard);
        });
    }
    displayFavUsers(onUserClick) {
        const favUsers = this.storage.getFavUsers();
        const favUsersContainer = document.getElementById('favourites-bar');
        if(favUsers.length === 0) {
            favUsersContainer.classList.add('hidden');
            return;
        }

        favUsersContainer.classList.remove('hidden');
        const favUsersList = document.getElementById('fav-list');
        favUsersList.innerHTML = '';
        for(let user of favUsers) {
            const userItem = document.createElement('button');
            userItem.textContent = user;
            userItem.addEventListener('click', () => {
                onUserClick(user);
            });
            favUsersList.appendChild(userItem);
        }
        
    }

}