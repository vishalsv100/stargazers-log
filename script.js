const repoList = document.getElementById('repo-list');

function renderRepos(repositories) {
  if (!repositories.length) {
    repoList.innerHTML = '<li class="empty">No starred repositories were found.</li>';
    return;
  }

  repoList.innerHTML = repositories
    .map((repo) => {
      const stars = repo.stars?.toLocaleString() ?? '0';
      return `
        <li class="repo-item">
          <div class="repo-title">
            <a href="${repo.url}" target="_blank" rel="noreferrer">${repo.name}</a>
            <span>${stars}★</span>
          </div>
          <p class="repo-meta">${repo.description || 'No description available.'}</p>
          <p class="repo-meta">Language: ${repo.language || 'Unknown'}</p>
        </li>
      `;
    })
    .join('');
}

async function loadRepos() {
  try {
    const response = await fetch('./events.json');
    if (!response.ok) {
      throw new Error('Unable to load data.');
    }

    const repositories = await response.json();
    renderRepos(repositories);
  } catch (error) {
    repoList.innerHTML = '<li class="error">Unable to load the repositories right now.</li>';
  }
}

loadRepos();
