/**
 * GitHub Explorer - JS Practice File
 * 
 * Instructions:
 * 1. Use the GitHub REST API (https://api.github.com/users/{username}) to fetch user data.
 * 2. Update the UI based on the fetched data.
 * 3. Toggle between the following states by adding/removing the 'hidden' class on the sections:
 *    - 'state-initial': The starting screen.
 *    - 'state-loading': Show this while fetching data.
 *    - 'state-error': Show this if the user is not found (404).
 *    - 'state-results': Show this when data is successfully fetched.
 */


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
        this.searchBtn = document.getElementById('search-btn');
        this.searchInput = document.getElementById('search-input');
        this.themeToggleBtn = document.getElementById('theme-toggle');
        this.ui.showState(this.ui.stateInitial);
        
        this.themeToggleBtn.addEventListener('click', () => this.themeToggle());
        this.searchBtn.addEventListener('click', () =>{
            const username = this.searchInput.value.trim();
            if (username) {
                this.fetchUser(username);
            }
        })
    }
    async fetchUser(username) {
        try {
            this.ui.displayLoading();
            const user = await this.api.getUser(username) ;
            console.log(user);
            this.fetchUserRepos(username);
            this.ui.displayUser(user);
        } catch (error) {
            this.ui.displayError(error);
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
        document.documentElement.classList.toggle('dark');

        console.log(document.documentElement.classList);
        document.documentElement.classList.toggle('light');
    }

}


// document.addEventListener('DOMContentLoaded', () => {

//     // --- Elements ---
//     const searchInput = document.getElementById('search-input');
//     const searchBtn = document.getElementById('search-btn');
//     const themeToggleBtn = document.getElementById('theme-toggle');

//     // State Sections
//     const stateInitial = document.getElementById('state-initial');
//     const stateLoading = document.getElementById('state-loading');
//     const stateError = document.getElementById('state-error');
//     const stateResults = document.getElementById('state-results');

//     // Utility function to toggle states
//     function showState(stateElement) {
//         [stateInitial, stateLoading, stateError, stateResults].forEach(el => {
//             el.classList.add('hidden');
//         });
//         stateElement.classList.remove('hidden');
//     }

//     // Example of handling search click
//     searchBtn.addEventListener('click', () => {
//         const username = searchInput.value.trim();
//         if (!username) return;

//         // 1. Show loading state
//         showState(stateLoading);

//         // 2. Fetch data from GitHub API
//         // ... YOUR JS CODE HERE ...
//         // fetch(`https://api.github.com/users/${username}`)

//         // setTimeout is used here just to simulate a network request for UI testing
//         setTimeout(() => {
//             // Remove this and replace with actual logic
//             if (username === 'error') {
//                 showState(stateError);
//             } else {
//                 showState(stateResults);
//                 // Update profile elements here (e.g. document.getElementById('profile-name').textContent = ...)
//             }
//         }, 1500);
//     });

//     // Handle Enter key in search input
//     searchInput.addEventListener('keypress', (e) => {
//         if (e.key === 'Enter') {
//             searchBtn.click();
//         }
//     });

//     // Theme Toggle Logic
//     themeToggleBtn.addEventListener('click', () => {
//         document.documentElement.classList.toggle('dark');
//         document.documentElement.classList.toggle('light');
//     });

// });
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
})  