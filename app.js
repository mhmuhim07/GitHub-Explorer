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

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Elements ---
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // State Sections
    const stateInitial = document.getElementById('state-initial');
    const stateLoading = document.getElementById('state-loading');
    const stateError = document.getElementById('state-error');
    const stateResults = document.getElementById('state-results');

    // Utility function to toggle states
    function showState(stateElement) {
        [stateInitial, stateLoading, stateError, stateResults].forEach(el => {
            el.classList.add('hidden');
        });
        stateElement.classList.remove('hidden');
    }

    // Example of handling search click
    searchBtn.addEventListener('click', () => {
        const username = searchInput.value.trim();
        if (!username) return;

        // 1. Show loading state
        showState(stateLoading);

        // 2. Fetch data from GitHub API
        // ... YOUR JS CODE HERE ...
        // fetch(`https://api.github.com/users/${username}`)
        
        // setTimeout is used here just to simulate a network request for UI testing
        setTimeout(() => {
            // Remove this and replace with actual logic
            if (username === 'error') {
                showState(stateError);
            } else {
                showState(stateResults);
                // Update profile elements here (e.g. document.getElementById('profile-name').textContent = ...)
            }
        }, 1500);
    });

    // Handle Enter key in search input
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });

    // Theme Toggle Logic
    themeToggleBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        document.documentElement.classList.toggle('light');
    });

});
