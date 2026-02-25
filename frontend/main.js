window.addEventListener('DOMContentLoaded', (event) => {
    getVisitCount();
    getGithubProjects();
});

const prodFunctionApi = 'https://azureresumefunctionapp1.azurewebsites.net/api/GetResumeCounter?code=fn_rtzpoY_c7n2WRJgyDXLLSR1sISFNfZM0cYNj6uZMMAzFupLXQww==';
const localFunctionApi = 'http://localhost:7071/api/GetResumeCounter';
//Grab the JSON from that API above
//Grab the correct part of the JSON and show it in our HTML

//Call our API @ prodFunctionApi
//It will return a JSON response.
//Set our HTML's innerText with the count we got from the JSON response from the API
const getGithubProjects = () => {
    const container = document.getElementById('github-projects');
    if (!container) return;

    fetch('https://api.github.com/users/rkwong792/repos?sort=updated&per_page=10')
        .then(response => response.json())
        .then(repos => {
            container.innerHTML = '';
            const filtered = repos.filter(r => !r.fork).slice(0, 6);
            if (filtered.length === 0) {
                container.innerHTML = '<p>No projects found.</p>';
                return;
            }
            filtered.forEach(repo => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.innerHTML =
                    `<h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>` +
                    `<p>${repo.description || 'No description provided.'}</p>` +
                    `<div class="project-meta">` +
                        (repo.language ? `<span>${repo.language}</span>` : '') +
                        `<span>&#9733; ${repo.stargazers_count}</span>` +
                    `</div>` +
                    `<a href="${repo.html_url}" target="_blank" class="button">View on GitHub</a>`;
                container.appendChild(card);
            });
        })
        .catch(() => {
            container.innerHTML = '<p>Could not load projects at this time.</p>';
        });
};

const getVisitCount = () => {
    let count = 30;
    fetch(prodFunctionApi)
    .then(response => {
        return response.json()
    })
    .then(response => {
        console.log("Website called function API.");
        count = response.count;
        document.getElementById('counter').innerText = count;
    }).catch(function(error) {
        console.log(error);
      });
    return count;
}