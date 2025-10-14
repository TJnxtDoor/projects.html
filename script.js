 document.addEventListener('DOMContentLoaded', function() {
            const username = 'TJnxtDoor'; 
            const projectsContainer = document.getElementById('projects-container');
            
            const favoriteRepos = [
                { name: 'Spyro', displayName: 'Spyro Mod' },
                { name: 'cars', displayName: 'Cars UI/UX Project' },
                { name: 'TDU-Solar-Crown-Orange-Finder', displayName: 'Solar Crown Orange Finder' },
                
            ];
            
            // Fetch repositories from GitHub API
            Promise.all(favoriteRepos.map(repo => 
                fetch(`https://api.github.com/repos/${username}/${repo.name}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Failed to fetch ${repo.name}`);
                        }
                        return response.json();
                    })
            ))
            .then(repositories => {
                // Clear loading message
                projectsContainer.innerHTML = '';
                
                // Display repositories
                repositories.forEach((repo, index) => {
                    const projectCard = document.createElement('section');
                    projectCard.className = 'project-card';
                    
                    // Format date
                    const updatedDate = new Date(repo.updated_at).toLocaleDateString();
                    
                    // Create language color indicator
                    const languageColor = getLanguageColor(repo.language);
                    // Populate project card
                    projectCard.innerHTML = `
                        <h2>${favoriteRepos[index].displayName}</h2>
                        <p>${repo.description || 'No description available'}</p>
                        <a class="github-link" href="${repo.html_url}" target="_blank">
                            <i class="fab fa-github"></i>View on GitHub
                        </a>
                        <div class="project-meta">
                            <div class="project-language">
                                ${repo.language ? 
                                    `<span class="language-color" style="background-color: ${languageColor};"></span>${repo.language}` : 
                                    'Language not specified'}
                            </div>
                            <div class="project-updated">Updated: ${updatedDate}</div>
                        </div>
                    `;
                    
                    projectsContainer.appendChild(projectCard);
                });
            })
            .catch(error => {
                console.error('Error fetching repositories:', error);
                projectsContainer.innerHTML = `
                    <div class="error">
                        <i class="fas fa-exclamation-triangle"></i> 
                        Failed to load projects. Please check your internet connection or try again later.
                        <p>Error details: ${error.message}</p>
                    </div>
                `;
            });
            
            // Function to get color for programming languages
            function getLanguageColor(language) {
                const languageColors = {
                    'JavaScript': '#f1e05a',
                    'Python': '#3572A5',
                    'Java': '#b07219',
                    'TypeScript': '#2b7489',
                    'C++': '#f34b7d',
                    'C#': '#178600',
                    'Ruby': '#701516',
                    'CSS': '#563d7c',
                    'HTML': '#e34c26',
                    'Swift': '#ffac45',

                };
                
                return languageColors[language] || '#6c757d';
            }
        });