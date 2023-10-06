
document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
    const userList = document.getElementById("user-list");
    const userRepos = document.getElementById("user-repos");

    searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = searchInput.value.trim();

        if (username === "") {
            alert("Please enter a GitHub username.");
            return;
        }

        fetch(`https://api.github.com/search/users?q=octocat${username}`, {
            headers: {
                Accept: "application/vnd.github.v3+json",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            
            userList.innerHTML = "";

            if (data.items && data.items.length > 0) {
                
                data.items.forEach((user) => {
                    const userItem = document.createElement("div");
                    userItem.innerHTML = `
                        <img src="${user.avatar_url}" alt="${user.login}" />
                        <p>${user.login}</p>
                        <a href="${user.html_url}" target="_blank">Profile</a>
                    `;
                    userItem.addEventListener("click", () => {
                
                        fetchUserRepos(user.login);
                    });
                    userList.appendChild(userItem);
                });
            } else {
                userList.innerHTML = "No users found.";
            }
        })
        .catch((error) => {
            console.error("Error fetching data: ", error);
            userList.innerHTML = "An error occurred.";
        });
    });


    function fetchUserRepos(username) {
        fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                Accept: "application/vnd.github.v3+json",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            
            userRepos.innerHTML = "";

            if (data.length > 0) {
    
                data.forEach((repo) => {
                    const repoItem = document.createElement("div");
                    repoItem.innerHTML = `
                        <p><strong>${repo.name}</strong></p>
                        <p>${repo.description}</p>
                        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
                    `;
                    userRepos.appendChild(repoItem);
                });
            } else {
                userRepos.innerHTML = "No repositories found for this user.";
            }
        })
        .catch((error) => {
            console.error("Error fetching user repositories: ", error);
            userRepos.innerHTML = "An error occurred.";
        });
    }
});