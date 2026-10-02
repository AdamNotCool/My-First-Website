document.getElementById('searchInput').addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase().trim();
    const resultsContainer = document.getElementById('searchResults');
    
    if (query === '') {
        resultsContainer.innerHTML = '';
        return;
    }

    const matches = searchIndex.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.snippet.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
        resultsContainer.innerHTML = '<div style="padding: 10px; font-size: 14px;">No results found</div>';
        return;
    }

    let html = '<ul style="list-style: none; margin: 0; padding: 5px;">';
    matches.forEach(match => {
        html += `
            <li style="padding: 8px; border-bottom: 1px solid #eee;">
                <a href="${match.url}" style="text-decoration: none; color: #0066cc; font-weight: bold; display: block;">
                    ${match.title}
                </a>
                <span style="font-size: 12px; color: #555; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    ${match.snippet}
                </span>
            </li>
        `;
    });
    html += '</ul>';

    resultsContainer.innerHTML = html;
});

document.addEventListener('click', function(e) {
    if (!e.target.closest('#searchInput') && !e.target.closest('#searchResults')) {
        document.getElementById('searchResults').innerHTML = '';
    }
});

// 
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    // Check for saved user preference on page load
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.textContent = '[ Dark Mode ]';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '[ Dark Mode ]';
        } else {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '[ Light Mode ]';
        }
    });
});