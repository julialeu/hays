document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const input = document.getElementById('termsearch');

    const resultsDiv = document.getElementById('results');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const term = input.value.trim();

        if (term !== '') {
            const url = `https://es.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(term)}&utf8=&format=json&origin=*`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                showResults(data.query.search);
            } catch (error) {
                resultsDiv.innerHTML = '<p>Error while fetching results</p>';
            }
    
            saveResults(term);
        }
    });

    function showResults(searchResults) {
        if (!searchResults || searchResults.length === 0) {
            resultsDiv.innerHTML = '<p>No results found</p>';
            return;
        }

        let html = '<ul>';
        searchResults.forEach(result => {
            html += `<li>
                <h3>${result.title}</h3>
                <p>${result.snippet}</p>
                <a href="https://es.wikipedia.org/wiki/${encodeURIComponent(result.title)}" target="_blank">See more</a>
            </li>`;
        });
        html += '</ul>';
        resultsDiv.innerHTML = html;
    }

    function saveResults(term) {
        fetch('php/save_results.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `term=${encodeURIComponent(term)}`
        })
        .then(response => response.text())
        .then(response => {
            console.log('Search saved', response);
        })
        .catch(error => {
            console.error('Error saving search', error);
        });
    }   
}); 